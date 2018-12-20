/**
 * accounts.create.ts
 * Create new user accounts
*/

// Node Modules


// NPM Modules
import { createConnection } from 'mysql'
import { sign } from 'jsonwebtoken'

// Local Modules
import { connectionSettings, jwtSecret } from './../connection'
import { UserTypes } from '../../types/users';
import { StatusMessage } from '../../types/server';
import { sendConfirmation } from '../email/emails';


// Constants and global variables
const connection = createConnection(connectionSettings)

function newAccount(accountOpts: UserTypes.All): Promise<StatusMessage> {
    return new Promise((resolve, reject) => {
        connection.connect()
        connection.query(
            `SELECT * 
            FROM userRegistration
            WHERE userName = ${connection.escape(accountOpts.userName)}
                OR userId = ${connection.escape(accountOpts.userId)}`,
            function(err: Error, results: Array<UserTypes.LoginInfo>) {
                if (err) {throw err}
                if (results.length > 0) {
                    let reason: StatusMessage = {
                        error: true,
                        message: 'Username or ID already exist'
                    }
                    reject(reason)
                } else {
                    connection.query(
                        `INSERT INTO userRegistration
                        (
                            userId,
                            userName, 
                            userPass,
                            userEmail,
                            userNonsig,
                            userIsLocked,
                            userIsAdmin,
                            userIsSuperAdmin,
                            userAdministrator,
                            userIsConfirmed,
                        )
                        VALUES
                        (
                            ${connection.escape({
                                userId: this.userId,
                                userName: this.userName,
                                userPass: this.userPass,
                                userEmail: this.userEmail,
                                userNonsig: this.userNonsig,
                                userIsLocked: false,
                                userIsAdmin: this.userIsAdmin,
                                userIsSuperAdmin: this.userIsSuperAdmin,
                                userAdministrator: this.userAdministrator,
                                userIsConfirmed: false
                            })}
                        )`,
                        accountOpts,
                        function(err: Error, results) {
                            if (err) {throw err}
                            let reason: StatusMessage = {
                                error: false,
                                message: 'User account created successfully'
                            }
                            let confirmationToken = sign({
                                userId: accountOpts.userId
                            },
                            jwtSecret,
                            {
                                expiresIn: '30d'
                            })
                            sendConfirmation({userEmail: this.userEmail, confirmationToken})
                            resolve(reason)
                        }
                    )
                }
            }
        )
    })
}

export { newAccount }