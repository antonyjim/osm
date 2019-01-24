/**
 * users.login.ts
 * Provide functions for first time authentication
*/

// Node Modules


// NPM Modules
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

// Local Modules
import { getPool, jwtSecret } from '../connection'
import { UserTypes } from '../../types/users'
import { StatusMessage } from '../../types/server'
import { LoginException } from '../utils';

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
        return new Promise((resolve) => {
            console.log(hashed.toString(), ' ', this.credentials.password)
            compare(this.credentials.password, hashed.toString(), function(err: Error, same: boolean) {
                if (err) {
                    console.log(err)
                    throw new LoginException('Password error', err)
                } else {
                    resolve(same)
                }
            })
        })
    }

    // insert into sys_user values ('37355b43-af04-476e-b034-e4e82214135c', 'admin', '$2y$12$b6vJhKf4heY4FYIqjdjN2.hVqE6/5nqRqXOeCshvZJTB/nfUWWpXm', 'antonyjund@gmail.com', '1930d1ad-ae23-44b1-bbcd-0600f88a6091', 0, 1, 1, null, 1, null, 0);

    private incrementInvalidLogins(userId) {
        pool.query(`UPDATE sys_user
        SET userInvalidLoginAttempts = userInvalidLoginAttempts + 1
        WHERE userId = ${userId}`)
    }

    private handleLogin(userId) {
        const lastLogin: string = pool.escape(new Date().toISOString().replace('Z', ''))
        console.log('Clearing invalid logins and setting last login to %s for user %s with %s', lastLogin, userId, `UPDATE sys_user
        SET userInvalidLoginAttempts = 0, userLastLogin = ${lastLogin}
        WHERE userId = ${pool.escape(userId)}`)
        pool.query(`UPDATE sys_user
        SET userInvalidLoginAttempts = 0, userLastLogin = ${lastLogin}
        WHERE userId = ${pool.escape(userId)}`)
    }

    private lockUser(userId) {
        pool.query(`UPDATE sys_user
        SET userIsLocked = 1
        WHERE userId = ${userId}`)
    }

    public authenticate(): Promise<StatusMessage> {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT *
                FROM userLogin
                WHERE userName = ${pool.escape(this.credentials.username)}
            `
            pool.query(sql, (err: Error, users: Array<UserTypes.LoginInfo>) => {
                if (err) {
                    console.error(err)
                    throw {
                        error: true, 
                        message: 'SQL Error', 
                        details: err
                    }
                }
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
                    } else if (!user.nsIsActive) {
                        reject({
                            error: true,
                            message: 'Nonsig inactive'
                        })
                    } else if (
                        user.userIsConfirmed 
                        && !user.userIsLocked 
                        && user.userInvalidLoginAttempts < 5
                        && user.nsIsActive 
                    ) {
                        this.validatePassword(user.userPass)
                        .then((same: boolean) => {
                            if (same) {
                                let authenticatedUser = {
                                    userId: user.userId,
                                    userEmail: user.userEmail,
                                    userIsAdmin: user.userIsAdmin,
                                    userNonsig: user.userNonsig,
                                    userRole: user.userRole
                                }
                                this.handleLogin(user.userId)
                                resolve({
                                    error: false,
                                    message: 'Login Accepted',
                                    details: authenticatedUser
                                })
                            } else {
                                this.incrementInvalidLogins(user.userId)
                                reject({
                                    error: true,
                                    message: 'Invalid username or password'
                                })
                            }
                        })
                        .catch((err) => {
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
                    console.log('More than one user ', users.length)
                    console.log(JSON.stringify(users))
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
            userId: null,
            userNonsig: null,
            userRole: 'No-Conf'
        }
    }
    return sign(payload, jwtSecret, {expiresIn: '1h'})
}