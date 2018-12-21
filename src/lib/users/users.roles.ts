/**
 * users.roles.ts
 * Provide lookup functions to add and validate roles
*/

// Node Modules


// NPM Modules


// Local Modules
import { getPool } from './../connection'
import { RolePermissions } from '../../types/roles';
import { StatusMessage } from '../../types/server';
import { Validation } from '../validation';
import uuid = require('uuid');

// Constants and global variables
const pool = getPool()

export class Roles {
    role: RolePermissions

    /**
     * Requested role may be a role that is being added or modified
     * @param requestedRole
     */
    constructor(requestedRole: RolePermissions) {
        this.role = requestedRole
    }

    /**
     * Add a new role, assign links to this role
     */
    public add(): Promise<StatusMessage> {
        return new Promise(function(resolve, reject) {
            if (!this.role) {
                reject({
                    error: true,
                    message: 'Missing role'
                })
            } else {
                let validator = new Validation(this.role)
                let missingFields = validator.required([
                    'rpName'
                ])
                if (missingFields) {
                    reject({
                        error: true,
                        message: 'Missing fields',
                        details: missingFields
                    })
                } else {
                    let roleToBeAdded = validator.defaults({
                        rpId: uuid.v4()
                    })
                    let sql = `
                        INSERT INTO rolePermissions
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
                    pool.query(sql, function(err: Error, results) {
                        if (err) {throw err}
                        resolve({
                            error: false,
                            message: 'Completed succesfully'
                        })
                    })
                }
            }
        })
    } // add()
}