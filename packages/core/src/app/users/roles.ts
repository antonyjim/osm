/**
 * users.roles.ts
 * Provide lookup functions to add and validate roles
 */

// Node Modules

// NPM Modules

// Local Modules
import { getPool } from '@lib/connection'
import { IRolePermissions } from '@osm/roles'
import { IStatusMessage } from '@osm/server'
import { Validation } from '@lib/validation'
import uuid = require('uuid')

// Constants and global variables
const pool = getPool()

export class Roles {
  private role?: IRolePermissions

  /**
   * Requested role may be a role that is being added or modified
   * @param requestedRole
   */
  constructor(requestedRole?: IRolePermissions) {
    this.role = requestedRole
  }

  public getPrivs(role?: string): Promise<IStatusMessage> {
    return new Promise((resolve, reject) => {
      let sql = ``
      if (role) {
        sql = `SELECT role_priv FROM sys_role WHERE rpId = ${pool.escape(role)}`
      } else {
        sql = `SELECT DISTINCT role_priv FROM sys_role`
      }
      pool.query(sql, (err: Error, results) => {
        if (err) {
          throw {
            error: true,
            message: err
          }
        } else {
          resolve({
            error: false,
            message: 'Retrieved roles',
            details: results
          })
        }
      })
    })
  }

  public get(): Promise<IStatusMessage> {
    return new Promise((resolve, reject) => {
      let sql: string = ''
      if (this.role) {
        sql = `SELECT * FROM sys_role WHERE rpId = ${pool.escape(this.role)}`
      } else {
        sql = 'SELECT DISTINCT rpId FROM sys_role'
      }
      pool.query(sql, (err: Error, results) => {
        if (err) {
          throw {
            error: true,
            message: err
          }
        } else {
          if (results.length > 0) {
            resolve({
              error: false,
              message: 'Found roles',
              details: results
            })
          } else {
            reject({
              error: true,
              message: 'Found no roles'
            })
          }
        }
      })
    })
  } // get()

  /**
   * Add a new role, assign links to this role
   */
  public add(): Promise<IStatusMessage> {
    return new Promise((resolve, reject) => {
      if (!this.role) {
        reject({
          error: true,
          message: 'Missing role'
        })
      } else {
        const validator = new Validation(this.role)
        const missingFields = validator.required(['rpName'])
        if (missingFields) {
          reject({
            error: true,
            message: 'Missing fields',
            details: missingFields
          })
        } else {
          const roleToBeAdded = validator.defaults({
            rpId: uuid.v4(),
            rpDesc: ''
          })
          const sql = `
                        CALL thq.addRole(
                            ${pool.escape([
                              roleToBeAdded.rpId,
                              roleToBeAdded.rpName,
                              roleToBeAdded.rpDesc
                            ])}
                        )
                        INSERT INTO sys_role
                            rpId,
                            rpName
                        VALUES 
                        (
                            ${pool.escape([
                              roleToBeAdded.rpId,
                              roleToBeAdded.rpName
                            ])}
                        )
                    `
          pool.query(sql, (err: Error, results) => {
            if (err) {
              throw err
            }
            resolve({
              error: false,
              message: 'Completed succesfully'
            })
          })
        }
      }
    })
  } // add()

  public update(action): Promise<IStatusMessage> {
    return new Promise((resolve, reject) => {
      if (!this.role.role_priv || !this.role.rpId) {
        reject({
          error: true,
          message: 'Missing rpId or role_priv'
        })
      }
      const verRole = `
                SELECT *
                FROM
                    sys_role
                WHERE
                    role_priv = ${pool.escape(this.role.role_priv)}
                AND
                    rpId = ${pool.escape(this.role.rpId)}
            `
      pool.query(verRole, (err: Error, existingRoles: IRolePermissions[]) => {
        if (err) {
          console.error(err)
          throw err
        } else {
          console.log(existingRoles.length, ' ', action)
          if (existingRoles.length === 1 && action === 'remove') {
            const removeRole = `
                            DELETE FROM
                                sys_role
                            WHERE
                                rpId = ${pool.escape(this.role.rpId)}
                            AND
                                role_priv = ${pool.escape(this.role.role_priv)}
                        `
            console.log(removeRole)
            pool.query(removeRole, (removeErr: Error, results) => {
              if (removeErr) {
                throw removeErr
              }
              resolve({
                error: false,
                message: `Removed ${this.role.role_priv} from ${this.role.rpId}`
              })
            })
          } else if (existingRoles.length !== 1 && action === 'delete') {
            reject({
              error: true,
              message: 'Could not locate role'
            })
          } else if (existingRoles.length !== 0 && action === 'add') {
            reject({
              error: true,
              message: 'Privilege already exists on role'
            })
          } else if (action === 'add' && existingRoles.length === 0) {
            const addRole = `
                            INSERT INTO
                                sys_role (
                                rpId,
                                role_priv
                            ) VALUES (
                                ${pool.escape([
                                  this.role.rpId.slice(0, 7),
                                  this.role.role_priv.slice(0, 36)
                                ])}
                            )
                        `
            pool.query(addRole, (addErr: Error, results) => {
              if (addErr) {
                throw addErr
              }
              resolve({
                error: false,
                message: `Added ${this.role.role_priv} to ${this.role.role_priv}`
              })
            })
          } else {
            reject({
              error: true,
              message:
                'An unknown error occurred. Could not validate all arguments.'
            })
          }
        }
      })
    })
  } // update()
}
