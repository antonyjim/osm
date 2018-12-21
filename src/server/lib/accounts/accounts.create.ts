/**
 * accounts.create.ts
 * Create new user accounts
*/

// Node Modules


// NPM Modules
import { createConnection, Connection } from 'mysql'
import { sign } from 'jsonwebtoken'
import { hash } from 'bcrypt'

// Local Modules
import { jwtSecret, getPool } from './../connection'
import { UserTypes } from '../../types/users';
import { StatusMessage } from '../../types/server';
import { sendConfirmation } from '../email/emails';


// Constants and global variables
const pool = getPool()
const saltRounds:number = 10

function newAccount(accountOpts: UserTypes.All): Promise<StatusMessage> {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * 
            FROM userRegistration
            WHERE userName = ${pool.escape(accountOpts.userName)}
                OR userId = ${pool.escape(accountOpts.userId)}`,
            function(err: Error, results: Array<UserTypes.LoginInfo>) {
                if (err) {throw err}
                if (results.length > 0) {
                    let reason: StatusMessage = {
                        error: true,
                        message: 'Username or ID already exist'
                    }
                    reject(reason)
                } else {
                    hash(this.userPass, saltRounds, function(hashed) {
                        pool.query(
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
                                ${pool.escape([
                                    this.userId,
                                    this.userName,
                                    hashed,
                                    this.userEmail,
                                    this.userNonsig,
                                    this.userIsLocked,
                                    this.userIsAdmin,
                                    this.userIsSuperAdmin,
                                    this.userAdministrator,
                                    false
                                ])}
                            );
                            INSERT INTO userInformation
                            (
                                userId,
                                userFIrstName,
                                userLastName,
                                userType,
                                userPhone
                            )
                            VALUES (
                                ${pool.escape([
                                    this.userId, 
                                    this.userFIrstName,
                                    this.userLastName,
                                    this.userType,
                                    this.userPhone
                                ])}
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
                    })
                }
            }
        )
    })
}

export { newAccount }