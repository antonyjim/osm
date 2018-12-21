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
                SELECT
                (
                    SELECT 
                        navigation.*,
                        rolePermissions.*
                    FROM
                        navigation
                    WHERE 
                        navigation.navPathName = ${pool.escape(endpoint)}
                        AND
                        navigation.navMethod = ${pool.escape(method)}
                    INNER JOIN
                        rolePermissions
                    ON
                        navigation.navPriv = rolePermissions.rpPriv
                )
                WHERE rpId = ${pool.escape(role)}
            `
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