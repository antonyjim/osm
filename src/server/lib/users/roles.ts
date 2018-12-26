/**
 * users.roles.ts
 * Provide lookup functions to add and validate roles
*/

// Node Modules


// NPM Modules


// Local Modules
import { getPool } from '../connection'
import { RolePermissions } from '../../types/roles';
import { StatusMessage } from '../../types/server';
import { Validation } from '../validation';
import uuid = require('uuid');

// Constants and global variables
const pool = getPool()

export class Roles {
    role?: RolePermissions

    /**
     * Requested role may be a role that is being added or modified
     * @param requestedRole
     */
    constructor(requestedRole?: RolePermissions) {
        this.role = requestedRole
    }

    public getPrivs(): Promise<StatusMessage> {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT DISTINCT rpPriv
                FROM rolePermissions
            `
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

    public get(): Promise<StatusMessage> {
        return new Promise((resolve, reject) => {
            let sql: string = ''
            if (this.role) {
                sql = `
                    SELECT *
                    FROM rolePermissions
                    WHERE rpId = ${pool.escape(this.role)}
                `
            } else {
                sql = `
                    SELECT 
                        rolepermissions.*, 
                        privdescriptions.* 
                    FROM 
                        rolepermissions 
                    INNER JOIN 
                        privdescriptions 
                    ON 
                        rolepermissions.rpPriv = privdescriptions.pdpriv
                `
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
                        rpId: uuid.v4(),
                        rpDesc: ''
                    })
                    let sql = `
                        CALL thq.addRole(
                            ${pool.escape(
                                [
                                    roleToBeAdded.rpId,
                                    roleToBeAdded.rpName,
                                    roleToBeAdded.rpDesc
                                ]
                            )}
                        )
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