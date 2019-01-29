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
import { Log } from '../log';

// Constants and global variables
const pool = getPool()

export function getRoleAuthorizedNavigation(userId: string, userNonsig: string): Promise<StatusMessage> {
    return new Promise((resolve, reject) => {
        let resultSet = {
            navs: null,
            privs: null
        }

        if (userId && userNonsig) {
            let navigation = `
                SELECT *
                FROM thq.uiNavigation
                WHERE rpId = (
                    SELECT nsaRole
                    FROM sys_user_nsacl
                    WHERE nsaUserId = ${pool.escape(userId)}
                    AND nsaNonsig = ${pool.escape(userNonsig)}
                )
            `
	    if (process.env.STATEMENT_LOGGING === 'true') {
		    new Log(navigation).info()
	    }
            pool.query(navigation, (err: Error, authorizedNavigationLinks) => {
                if (err) {
                    console.error(err)
                    throw err
                 } else {
                    let role = authorizedNavigationLinks[0] ? authorizedNavigationLinks[0].rpId : 'No-Conf'
                    resultSet.navs = authorizedNavigationLinks
                    let getPrivs = `
                        SELECT DISTINCT rpPriv
                        FROM sys_role
                        WHERE rpId = ${pool.escape(role)}
                    `
                    pool.query(getPrivs, (err: Error, authorizePrivs) => {
                        if (err) {
                            throw err
                         } else {
                            resultSet.privs = authorizePrivs.map(priv => priv.rpPriv)
                            resolve({
                                error: false,
                                message: 'Retrieved',
                                details: resultSet
                            })
                         }
                    })
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
            let sqlStatement = `SELECT endpointvalidation(${pool.escape([role, endpoint.split('?')[0], method])}) AS authed`
            pool.query(sqlStatement, function(err: Error, authorizedNavigationLinks: Array<RolePermissions>) {
                if (err) {
                    throw err
                }
                if (authorizedNavigationLinks[0]['authed'] === 1) {
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
