/**
 * users.navigation.ts
 * Handle user routing,
 * selecting all links that the user has access to
*/

// Node Modules
import { EventEmitter } from 'events';

// NPM Modules
import * as uuid from 'uuid'

// Local Modules
import { getPool } from '../connection'
import { UserTypes } from '../../types/users';
import { NavigationSettings, RolePermissions } from '../../types/roles';
import { Validation } from '../validation';
import { StatusMessage } from '../../types/server';

// Constants and global variables
const pool = getPool()

export class Navigation {
    user?: UserTypes.AuthToken
    links?: Array<NavigationSettings.Links>

    /**
     * Create 
     */
    constructor(
        {
            userInfo, 
            linkInfo
        }: {
            userInfo?: UserTypes.AuthToken, 
            linkInfo?: Array<NavigationSettings.Links>
        }
    ) {
        this.user = userInfo
        this.links = linkInfo
    }

    public getLink(): Promise<StatusMessage> {
        return new Promise((resolve, reject) => {
            if (this.links) {
                let linkSearch = this.links[0]
                if (linkSearch.navHref) {
                    let href = linkSearch.navHref.split('?')
                    linkSearch.navPathName = href[0]
                    linkSearch.navQueryString = href[1]
                }
                let sanitizedSearch = new Validation(linkSearch).updateFields([
                    'navId',
                    'navMethod',
                    'navPathName',
                    'navQueryString'
                ])
                let parameters: Array<string> = []
                for (let column of Object.keys(sanitizedSearch)) {
                    parameters.push(`${column} = ${pool.escape(sanitizedSearch[column])}`)
                }
                let searchPhrase: string = parameters.join(' AND ')
                let sql = `
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
        return new Promise(function(resolve, reject) {
            let sql = `
                SELECT 
                 navId,
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
    protected verPriv(priv: string): Promise<StatusMessage> {
        return new Promise((resolve, reject) => {
            if (priv) {
                let sql = `
                    SELECT *
                    FROM sys_role
                    WHERE rpPriv = ${pool.escape(priv)}
                `
                pool.query(sql, (err: Error, roles: Array<RolePermissions>) => {
                    if (err) {throw err} 
                    else {
                        if (roles.length > 0) {
                            resolve({
                                error: false,
                                message: 'Privilege exists',
                                details: roles
                            })
                        } else {
                            let injectionSql = `
                                INSERT INTO rolePermissions
                                VALUES (
                                    'SiteAdm',
                                    ${pool.escape(priv)}
                                )
                            `
                            pool.query(injectionSql, (err:Error, results) => {
                                if (err) {throw err} 
                                else {
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
    private createLink(link: NavigationSettings.Links) {
        return new Promise((resolve, reject) => {
            if (link.navHref) {
                link.navPathName = link.navHref.split('?')[0]
                link.navQueryString = link.navHref.split('?')[1]
            }
            let validator = new Validation(link)
            let missingFields = validator.required(
                [
                    'navInnerText',
                    'navMethod',
                    'navPathName',
                    'navIsNotApi',
                    'navPriv'
                ],
                'navIsNotApi',
                [
                    'navHeader',
                    'navMenu'
                ]
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
            let navLinkToBeEntered: NavigationSettings.Links 
                = validator.defaults({
                    navQueryString: null,
                    navActive: true
                })
            // Verify that the privilege exist
            let checkForExistingNav = `
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
                        navLinkToBeEntered.navActive = navLinkToBeEntered.navActive === true ? 1 : 0
                        navLinkToBeEntered.navIsNotApi = navLinkToBeEntered.navIsNotApi === true ? 1 : 0
                        let sql = `
                            CALL addNav(
                                ${pool.escape([
                                    navLinkToBeEntered.navInnerText.slice(0, 40),
                                    navLinkToBeEntered.navPathName.slice(0, 120),
                                    navLinkToBeEntered.navQueryString,
                                    navLinkToBeEntered.navMethod,
                                    navLinkToBeEntered.navHeader,
                                    navLinkToBeEntered.navMenu,
                                    navLinkToBeEntered.navActive,
                                    navLinkToBeEntered.navPriv.slice(0, 36),
                                    navLinkToBeEntered.navIsNotApi
                                ])}
                            )
                        `
                        pool.query(sql, (err: Error, results) => {
                            if (err) {console.error(err); throw {
                                error: true,
                                message: err,
                                details: navLinkToBeEntered
                            }}
                            this.verPriv(navLinkToBeEntered.navPriv.slice(0, 36))
                            .catch(err => console.error(err))
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
    public addLinks(): Promise<StatusMessage> {
        return new Promise((resolve) => {
            if (this.links && this.links.length > 0) {
                let navLinksEntered: Array<StatusMessage> = []
                let navLinksIgnored: Array<StatusMessage> = []
                let linkCountProcessed = 0
                let linkCountTotal = this.links.length
                const waitForAllNavs = new EventEmitter()
                waitForAllNavs.on('addedLink', () => {
                    linkCountProcessed++
                    if (linkCountProcessed === linkCountTotal) {
                        resolve({
                            error: false,
                            message: 'Completed adding links',
                            details: {navLinksEntered, navLinksIgnored}
                        })
                    }
                })
                this.links.forEach(link => {
                    this.createLink(link)
                    .then((onSuccessMessage: StatusMessage) => {
                        navLinksEntered.push(onSuccessMessage)
                        waitForAllNavs.emit('addedLink')
                    }, (onFailureMessage: StatusMessage) => {
                        navLinksIgnored.push(onFailureMessage)
                        waitForAllNavs.emit('addedLink')
                    })
                    .catch((error: StatusMessage) => {
                        navLinksIgnored.push(error)
                        waitForAllNavs.emit('addedLink')
                    })
                });
            } else {
                resolve({
                    error: true,
                    message: "No links provided"
                })
            }
        })
    }

    public updateLink(): Promise<StatusMessage> {
        return new Promise((resolve, reject) => {
            if (this.links.length === 1) {
                let link = this.links[0]
                if (!link.navId) {
                    reject({
                        error: true,
                        message: 'No link id provided'
                    })
                } else {
                    if (link.navHref) {
                        let href = link.navHref.split('?')
                        link.navPathName = href[0]
                        link.navQueryString = href[1]
                    }
                    let sanitizedUpdate = new Validation(link).updateFields([
                        'navId',
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

                    let findNav = `
                        SELECT *
                        FROM sys_navigation
                        WHERE navId = ${pool.escape(sanitizedUpdate.navId)}
                    `
                    if (sanitizedUpdate.navIsNotApi && (!sanitizedUpdate.navHeader || !sanitizedUpdate.navMenu)) {
                        reject({
                            error: true,
                            message: "Missing Heading or Menu"
                        })
                    } else if (!sanitizedUpdate.navIsNotApi && (sanitizedUpdate.navHeader || sanitizedUpdate.navMenu)) {
                        sanitizedUpdate['navHeader'] = null
                        sanitizedUpdate['navMenu'] = null
                    }
                    pool.query(findNav, (err: Error, results: Array<NavigationSettings.Links>) => {
                        if (err) {
                            throw {
                                error: true,
                                message: err
                            }
                         } else {
                            if (results.length === 1) {
                                console.log(JSON.stringify(sanitizedUpdate))
                                if (sanitizedUpdate.navPriv) {
                                    let updateStatement = `
                                        UPDATE sys_navigation
                                        SET ?
                                        WHERE navId = ?
                                    `
                                    pool.query(updateStatement, [sanitizedUpdate, sanitizedUpdate.navId], (err: Error, results) => {
                                        if (err) {
                                            throw {
                                                error: true,
                                                message: err
                                            }
                                        } else {
                                            this.verPriv(sanitizedUpdate.navPriv)
                                            resolve({
                                                error: false,
                                                message: 'Updated',
                                                details: sanitizedUpdate
                                            })
                                        }
                                    })
                                } else {
                                    let updateStatement = `
                                        UPDATE sys_navigation
                                        SET ?
                                        WHERE navId = ?
                                    `
                                    pool.query(updateStatement, [sanitizedUpdate, sanitizedUpdate.navId], (err: Error, results) => {
                                        if (err) {
                                            throw {
                                                error: true,
                                                message: err
                                            }
                                        } else {
                                            this.verPriv(sanitizedUpdate.navPriv)
                                            resolve({
                                                error: false,
                                                message: 'Updated',
                                                details: sanitizedUpdate
                                            })
                                        }
                                    })
                                }
                            } else {
                                reject({
                                    error: true,
                                    message: 'Could not locate link',
                                    details: sanitizedUpdate
                                })
                            }
                         }
                    })
                }
            }
        })
    }
}
