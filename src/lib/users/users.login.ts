/**
 * users.login.ts
 * Provide functions for first time authentication
*/

// Node Modules


// NPM Modules
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

// Local Modules
import { getPool, jwtSecret } from './../connection'
import { UserTypes } from '../../types/users'
import { StatusMessage } from '../../types/server'

// Constants and global variables
const pool = getPool()

export class Login {
    credentials: UserTypes.Credentials

    /**
     * @param creds User's credentials
     */
    constructor(creds: UserTypes.Credentials) {
        this.credentials = creds
    }

    private validatePassword(hashed): Promise<boolean> {
        return new Promise(function(resolve) {
            compare(this.credentials.password, hashed, function(err: Error, same: boolean) {
                if (err) {throw {error: true, message: 'Password error', details: err}}
                resolve(same)
            })
        })
    }

    // insert into userregistration values ('37355b43-af04-476e-b034-e4e82214135c', 'admin', '$2y$12$b6vJhKf4heY4FYIqjdjN2.hVqE6/5nqRqXOeCshvZJTB/nfUWWpXm', 'antonyjund@gmail.com', '1930d1ad-ae23-44b1-bbcd-0600f88a6091', 0, 1, 1, null, 1, null, 0);

    private incrementInvalidLogins(userId) {
        pool.query(`UPDATE userRegistration
                    SET userInvalidLoginAttempts = userInvalidLoginAttempts + 1
                    WHERE userId = ${userId}`)
    }

    private clearInvalidLogins(userId) {
        pool.query(`UPDATE userRegistration
        SET userInvalidLoginAttempts = 0
        WHERE userId = ${userId}`)
    }

    private lockUser(userId) {
        pool.query(`UPDATE userRegistration
        SET userIsLocked = 1
        WHERE userId = ${userId}`)
    }

    public authenticate(): Promise<StatusMessage> {
        return new Promise(function(resolve, reject) {
            let sql = `
                SELECT userId,
                       userName, 
                       userPass,
                       userEmail,
                       userIsConfirmed,
                       userIsAdmin,
                       userIsLocked,
                       userInvalidLoginAttempts,
                       userNonsig
                FROM userRegistration
                WHERE userName = ${pool.escape(this.credentials.userName)}
            `
            pool.query(sql, function(err: Error, users: Array<UserTypes.LoginInfo>) {
                if (err) {throw {error: true, message: 'SQL Error', details: err}}
                if (users.length === 1) {
                    let user = users[0]
                    if (!user.userIsConfirmed) {
                        reject({
                            error: true,
                            message: 'Please confirm email'
                        })
                    } else if (user.userIsLocked) {
                        reject({
                            error: true,
                            message: 'User account locked. Please click on forgot password'
                        })
                    } else if (user.userIsConfirmed && !user.userIsLocked && user.userInvalidLoginAttempts < 5) {
                        this.validatePassword(user.userPass)
                        .then((same: boolean) => {
                            if (same) {
                                user = {
                                    userId: user.userId,
                                    userEmail: user.userEmail,
                                    userIsAdmin: user.userIsAdmin,
                                    userNonsig: user.userNonsig
                                }
                                resolve({
                                    error: false,
                                    message: 'Login Accepted',
                                    details: user
                                })
                            } else {
                                this.incrementInvalidLogins(user.userId)
                                reject({
                                    error: true,
                                    message: 'Invalid username or password'
                                })
                            }
                        })
                        .catch((err: StatusMessage) => {
                            console.error(err)
                            reject(err)
                        })
                    } else {
                        this.lockUser(user.userId)
                        reject({
                            error: true,
                            message: 'Unknown conditions met'
                        })
                    }
                } else {
                    reject({
                        error: true,
                        message: 'Invalid username or password'
                    })
                }
            })
        })
    }
}

/**
 * Return token
 * @param payload Token to encrypt
 */
export function getToken(payload?: UserTypes.AuthToken) {
    if (!payload) {
        payload = {
            userIsAuthenticated: false,
            userId: null
        }
    }
    return sign(payload, jwtSecret, {expiresIn: '1h'})
}