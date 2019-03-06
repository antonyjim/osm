/**
 * users.navigation.ts
 * Handle user routing,
 * selecting all links that the user has access to
 */

// Node Modules
import { EventEmitter } from 'events'

// NPM Modules
import * as uuid from 'uuid'

// Local Modules
import { getPool } from '../connection'
import { UserTypes } from '../../types/users'
import { NavigationSettings, IRolePermissions } from '../../types/roles'
import { Validation } from '../validation'
import { IStatusMessage } from '../../types/server'

// Constants and global variables
const pool = getPool()

export class Navigation {
  private user?: UserTypes.IAuthToken
  private links?: NavigationSettings.ILinks[]

  /**
   * Create
   */
  constructor({
    userInfo,
    linkInfo
  }: {
    userInfo?: UserTypes.IAuthToken
    linkInfo?: NavigationSettings.ILinks[]
  }) {
    this.user = userInfo
    this.links = linkInfo
  }

  public getLink(): Promise<IStatusMessage> {
    return new Promise((resolve, reject) => {
      if (this.links) {
        const linkSearch = this.links[0]
        if (linkSearch.navHref) {
          const href = linkSearch.navHref.split('?')
          linkSearch.navPathName = href[0]
          linkSearch.navQueryString = href[1]
        }
        const sanitizedSearch = new Validation(linkSearch).updateFields([
          'sys_id',
          'navMethod',
          'navPathName',
          'navQueryString'
        ])
        const parameters: string[] = []
        for (const column of Object.keys(sanitizedSearch)) {
          parameters.push(`${column} = ${pool.escape(sanitizedSearch[column])}`)
        }
        const searchPhrase: string = parameters.join(' AND ')
        const sql = `
                    SELECT *
                    FROM sys_navigation
                    WHERE ${searchPhrase}
                `
        pool.query(sql, (err: Error, results) => {
          if (err) {
            throw err
          } else {
            resolve({
              error: false,
              message: 'Searched for link',
              details: results
            })
          }
        })
      } else {
        reject({
          error: false,
          message: 'No link provided'
        })
      }
    })
  }

  /**
   * Get all links for the requested user
   */
  public getAllLinks() {
    return new Promise((resolve, reject) => {
      const sql = `
                SELECT 
                 sys_id,
                 navInnerText,
                 navMethod,
                 CONCAT(navPathName, '?', IFNULL(navQueryString, '')) AS navHref,
                 navHeader,
                 navMenu,
                 navActive,
                 navPriv,
                 navIsNotApi
                FROM sys_navigation
                ORDER BY navMenu, navHeader, navInnerText
            `
      pool.query(sql, (err: Error, results) => {
        if (err) {
          console.error(err)
          throw {
            error: true,
            message: err
          }
        } else {
          resolve(results)
        }
      })
    })
  }

  /**
   * Find if a privilege is already entered in the privilege table,
   * if not, create it and assign it to the super admin priv
   * @param priv Role to be verified
   */
  protected verPriv(priv: string): Promise<IStatusMessage> {
    return new Promise((resolve, reject) => {
      if (priv) {
        const sql = `SELECT * FROM sys_role WHERE role_priv = ${pool.escape(
          priv
        )} `
        pool.query(sql, (err: Error, roles: IRolePermissions[]) => {
          if (err) {
            throw err
          } else {
            if (roles.length > 0) {
              resolve({
                error: false,
                message: 'Privilege exists',
                details: roles
              })
            } else {
              const injectionSql = `INSERT INTO rolePermissions VALUES ('SiteAdm', ${pool.escape(
                priv
              )})`
              pool.query(injectionSql, (insertErr: Error, results) => {
                if (insertErr) {
                  throw insertErr
                } else {
                  resolve({
                    error: false,
                    message: 'Added',
                    details: [priv]
                  })
                }
              })
            }
          }
        })
      } else {
        throw {
          error: true,
          message: 'Missing privilege',
          details: [priv]
        }
      }
    })
  }

  /**
   * Insert the link and validate that it hasn't already been added
   * @param link Link to be added
   */
  private createLink(link: NavigationSettings.ILinks) {
    return new Promise((resolve, reject) => {
      if (link.navHref) {
        link.navPathName = link.navHref.split('?')[0]
        link.navQueryString = link.navHref.split('?')[1]
      }
      const validator = new Validation(link)
      const missingFields = validator.required(
        ['navInnerText', 'navMethod', 'navPathName', 'navIsNotApi', 'navPriv'],
        'navIsNotApi',
        ['navHeader', 'navMenu']
      )
      if (missingFields.length > 0) {
        reject({
          error: true,
          message: 'Missing required fields',
          details: {
            link,
            missingFields
          }
        })
      }
      const navLinkToBeEntered: NavigationSettings.ILinks = validator.defaults({
        navQueryString: null,
        navActive: true
      })
      // Verify that the privilege exist
      const checkForExistingNav = `
                SELECT *
                FROM sys_navigation
                WHERE
                    navPathName = ${pool.escape(navLinkToBeEntered.navPathName)}
                    AND
                    navMethod = ${pool.escape(navLinkToBeEntered.navMethod)}
            `
      pool.query(checkForExistingNav, (err: Error, results) => {
        if (err) {
          throw {
            error: true,
            message: err
          }
        } else {
          if (results.length > 0) {
            reject({
              error: false,
              message: 'Endpoint already exists',
              details: results[0]
            })
          } else {
            navLinkToBeEntered.navActive =
              navLinkToBeEntered.navActive === true ? 1 : 0
            navLinkToBeEntered.navIsNotApi =
              navLinkToBeEntered.navIsNotApi === true ? 1 : 0
            const sql = `
              CALL addNav(${pool.escape([
                navLinkToBeEntered.navInnerText.slice(0, 40),
                navLinkToBeEntered.navPathName.slice(0, 120),
                navLinkToBeEntered.navQueryString,
                navLinkToBeEntered.navMethod,
                navLinkToBeEntered.navHeader,
                navLinkToBeEntered.navMenu,
                navLinkToBeEntered.navActive,
                navLinkToBeEntered.navPriv.slice(0, 36),
                navLinkToBeEntered.navIsNotApi
              ])})`
            pool.query(sql, (insertErr: Error) => {
              if (insertErr) {
                console.error(insertErr)
                throw {
                  error: true,
                  message: insertErr,
                  details: navLinkToBeEntered
                }
              }
              this.verPriv(navLinkToBeEntered.navPriv.slice(0, 36)).catch(
                (moreErr) => console.error(moreErr)
              )
              resolve({
                error: false,
                message: 'Added link',
                details: navLinkToBeEntered
              })
            })
          }
        }
      })
    })
  }

  /**
   * Add new navigation links
   */
  public addLinks(): Promise<IStatusMessage> {
    return new Promise((resolve) => {
      if (this.links && this.links.length > 0) {
        const navLinksEntered: IStatusMessage[] = []
        const navLinksIgnored: IStatusMessage[] = []
        const linkCountTotal = this.links.length
        const waitForAllNavs = new EventEmitter()
        let linkCountProcessed = 0
        waitForAllNavs.on('addedLink', () => {
          linkCountProcessed++
          if (linkCountProcessed === linkCountTotal) {
            resolve({
              error: false,
              message: 'Completed adding links',
              details: { navLinksEntered, navLinksIgnored }
            })
          }
        })
        this.links.forEach((link) => {
          this.createLink(link)
            .then(
              (onSuccessMessage: IStatusMessage) => {
                navLinksEntered.push(onSuccessMessage)
                waitForAllNavs.emit('addedLink')
              },
              (onFailureMessage: IStatusMessage) => {
                navLinksIgnored.push(onFailureMessage)
                waitForAllNavs.emit('addedLink')
              }
            )
            .catch((error: IStatusMessage) => {
              navLinksIgnored.push(error)
              waitForAllNavs.emit('addedLink')
            })
        })
      } else {
        resolve({
          error: true,
          message: 'No links provided'
        })
      }
    })
  }

  public updateLink(): Promise<IStatusMessage> {
    return new Promise((resolve, reject) => {
      if (this.links.length === 1) {
        const link = this.links[0]
        if (!link.sys_id) {
          reject({
            error: true,
            message: 'No link id provided'
          })
        } else {
          if (link.navHref) {
            const href = link.navHref.split('?')
            link.navPathName = href[0]
            link.navQueryString = href[1]
          }
          const sanitizedUpdate = new Validation(link).updateFields([
            'sys_id',
            'navInnerText',
            'navMethod',
            'navPathName',
            'navQueryString',
            'navHeader',
            'navMenu',
            'navActive',
            'navPriv',
            'navIsNotApi'
          ])

          const findNav = `SELECT * FROM sys_navigation WHERE sys_id = ${pool.escape(
            sanitizedUpdate.sys_id
          )}`
          if (
            sanitizedUpdate.navIsNotApi &&
            (!sanitizedUpdate.navHeader || !sanitizedUpdate.navMenu)
          ) {
            reject({
              error: true,
              message: 'Missing Heading or Menu'
            })
          } else if (
            !sanitizedUpdate.navIsNotApi &&
            (sanitizedUpdate.navHeader || sanitizedUpdate.navMenu)
          ) {
            sanitizedUpdate.navHeader = null
            sanitizedUpdate.navMenu = null
          }
          pool.query(
            findNav,
            (err: Error, results: NavigationSettings.ILinks[]) => {
              if (err) {
                throw {
                  error: true,
                  message: err
                }
              } else {
                if (results.length === 1) {
                  console.log(JSON.stringify(sanitizedUpdate))
                  if (sanitizedUpdate.navPriv) {
                    const updateStatement = `UPDATE sys_navigation SET ? WHERE sys_id = ?`
                    pool.query(
                      updateStatement,
                      [sanitizedUpdate, sanitizedUpdate.sys_id],
                      (updateErr: Error) => {
                        if (updateErr) {
                          throw {
                            error: true,
                            message: updateErr
                          }
                        } else {
                          this.verPriv(sanitizedUpdate.navPriv)
                          resolve({
                            error: false,
                            message: 'Updated',
                            details: sanitizedUpdate
                          })
                        }
                      }
                    )
                  } else {
                    const updateStatement = `UPDATE sys_navigation SET ? WHERE sys_id = ?`
                    pool.query(
                      updateStatement,
                      [sanitizedUpdate, sanitizedUpdate.sys_id],
                      (updateErr: Error) => {
                        if (updateErr) {
                          throw {
                            error: true,
                            message: updateErr
                          }
                        } else {
                          this.verPriv(sanitizedUpdate.navPriv)
                          resolve({
                            error: false,
                            message: 'Updated',
                            details: sanitizedUpdate
                          })
                        }
                      }
                    )
                  }
                } else {
                  reject({
                    error: true,
                    message: 'Could not locate link',
                    details: sanitizedUpdate
                  })
                }
              }
            }
          )
        }
      }
    })
  }
}
