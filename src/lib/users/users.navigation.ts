/**
 * users.navigation.ts
 * Handle user routing,
 * selecting all links that the user has access to
*/

// Node Modules


// NPM Modules
import { createConnection } from 'mysql'

// Local Modules
import { connectionSettings } from './../connection'
import { UserTypes } from '../../types/users';
import { NavigationSettings } from '../../types/roles';

// Constants and global variables
const connection = createConnection(connectionSettings)

export class Navigation {
    user: UserTypes.AuthToken

    /**
     * Create 
     */
    constructor(userInfo) {
        this.user = userInfo
    }

    public getAllLinks() {
        return new Promise(function(resolve, reject) {
            if (this.user.userRoles) {
                let where: Array<string>
                for (let role in this.user.userRoles) {
                    where.push(`nrRoleId = ${connection.escape(role)}`)
                }
                let sql: string = `
                    SELECT navigationRoles.nrLink,
                           navigation.navId,
                           CONCAT(navigation.navPathName, navigation.navQueryString)
                            AS href
                    FROM navigationRoles
                    WHERE
                    (
                        ${where.join(' OR ')}
                        AND
                        navActive = 1
                    )
                    INNER JOIN navigation
                    ON navigationRoles.nrLink = 
                       navigation.navId
                    GROUP BY navMenu
                `
                connection.query(sql, function(err: Error, links: Array<NavigationSettings.Links>) {
                    if (err) {throw err}
                    if (links) {
                        resolve(links)
                    } else {
                        reject({
                            error: true,
                            message: 'No results found'
                        })
                    }
                })
    
            }
        })
    }
}