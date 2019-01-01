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
        if (roleId) {
            let navigation = `
                SELECT *
                FROM thq.uiNavigation
                WHERE rpId = ${pool.escape(roleId)}
            `
            pool.query(navigation, (err: Error, results) => {
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
        if (method && endpoint && role) {
            let sqlStatement = `
                SELECT endpointValidation(${pool.escape([role, endpoint.split('?')[0], method])}) AS authed
            `
            pool.query(sqlStatement, function(err: Error, results: Array<RolePermissions>) {
                if (err) {
                    console.error(err)
                    throw {error: true, message: err}
                }
                if (results[0]['authed'] === 1) {
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