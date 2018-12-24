/**
 * lib.navigation.navigation.ts
 * 
 * Handle validation of navigation endpoints
*/

// Node Modules


// NPM Modules


// Local Modules
import { getPool } from './../connection'
import { StatusMessage } from '../../types/server';
import { RolePermissions } from '../../types/roles';

// Constants and global variables
const pool = getPool()

export function getRoleAuthorizedNavigation(roleId: string): Promise<StatusMessage> {
    return new Promise((resolve, reject) => {
        if (roleId && roleId.length === 36) {
            let navigation = `
                SELECT *
                FROM thq.uiNavigation
                WHERE rpId = ${pool.escape(roleId)}
            `
            pool.query(navigation, (err: Error, results) => {
                console.log(results)
                if (err) {
                    throw {
                        error: true,
                        message: err
                    }
                 } else {
                    if (results.length > 0) {
                        resolve({
                            error: false,
                            message: 'Retrieved',
                            details: results
                        })
                    }
                 }
            })
        } else {
            reject({
                error: true,
                message: 'Missing or invalid role'
            })
        }
    })
}

/**
 * 
 * @param method HTTP Request Method
 * @param endpoint PathName
 * @param role Role from user token
 */
export function validateEndpoint(method, endpoint, role): Promise<StatusMessage> {
    return new Promise(function(resolve, reject) {
        console.log('Searching for method %s, endpoint %s role %s', method, endpoint, role)
        if (method && endpoint && role) {
            let sqlStatement = `
                SELECT *
                FROM
                    endPointValidation
                WHERE 
                    rpId = ${pool.escape(role)}
                AND
                    navPathName = ${pool.escape(endpoint.split('?')[0])}
                AND
                    navMethod = ${pool.escape(method)}
            `
            console.log(sqlStatement)
            pool.query(sqlStatement, function(err: Error, results: Array<RolePermissions>) {
                if (err) {throw {error: true, message: err}}
                if (results.length === 1) {
                    resolve({
                        error: false,
                        message: 'User allowed',
                        details: {
                            authorized: true
                        }
                    })
                } else {
                    reject({
                        error: false,
                        message: 'User not allowed',
                        details: {
                            authorized: false
                        }
                    })
                }
            })
        } else {
            reject({
                error: true,
                message: 'Missing method, endpoint or role'
            })
        }
    })
}