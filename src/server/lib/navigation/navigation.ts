/**
 * lib.navigation.navigation.ts
 * 
 * Handle validation of navigation endpoints
*/

// Node Modules

// NPM Modules


// Local Modules
import { getPool, Querynator } from './../connection'
import { StatusMessage } from '../../types/server';
import { RolePermissions } from '../../types/roles';
import { Log } from '../log';
import schema from '../tables.config';

// Constants and global variables
const pool = getPool()

export function getRoleAuthorizedNavigation(userId: string, userNonsig: string): Promise<StatusMessage> {
    return new Promise((resolve, reject) => {
        let resultSet = {
            navs: null,
            privs: null
        }

        if (userId && userNonsig) {
            let query = 'SELECT * FROM ?? WHERE ?? = (SELECT ?? FROM ?? WHERE ?? = ? AND ?? = ?)'
            let params = [
                schema.sys_navigation_list,
                'rpId',
                'nsaRole',
                schema.sys_user_nsacl,
                'nsaUserId',
                userId,
                'nsaNonsig',
                userNonsig
            ]
            new Querynator().createQ({query, params}, 'CALL')
            .then((navigation) => {
                let role = navigation[0] ? navigation[0].rpId : 'No-Conf'
                resultSet.navs = navigation
                let queryPrivs = 'SELECT DISTINCT ?? FROM ?? WHERE ?? = ?'
                let paramPrivs = [
                    'rpPriv',
                    schema.sys_role,
                    'rpId',
                    role
                ]
                return new Querynator().createQ({query: queryPrivs, params: paramPrivs}, 'CALL')
            })
            .then((authorizedPrivs) => {
                resultSet.privs = authorizedPrivs.map(priv => priv.rpPriv)
                resolve({
                    error: false,
                    message: 'Retrieved',
                    details: resultSet
                })
            })
            .catch(err => {
                reject({
                    error: true,
                    message: err.message
                })
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
