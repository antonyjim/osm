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
import { Log, UserLog } from '../log';

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
            compare(this.credentials.password, hashed.toString(), function(err: Error, same: boolean) {
                if (err) {
                    throw new LoginException('Password error', err)
                } else {
                    resolve(same)
                }
            })
        })
    }

    private incrementInvalidLogins(userId) {
        pool.query(`UPDATE sys_user
        SET userInvalidLoginAttempts = userInvalidLoginAttempts + 1
        WHERE userId = ${userId}`)
    }

    private handleLogin(userId) {
        const lastLogin: string = pool.escape(new Date().toISOString().replace('Z', ''))
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
                                new UserLog('Logged In').info(user.userId)
                                resolve({
                                    error: false,
                                    message: 'Login Accepted',
                                    details: authenticatedUser
                                })
                            } else {
                                this.incrementInvalidLogins(user.userId)
                                new UserLog('Invalid login attempt').error(4, user.userId)
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
                        new UserLog('User has been locked').error(3, user.userId)
                        reject({
                            error: true,
                            message: 'User account locked'
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
            userId: null,
            userNonsig: null,
            userRole: 'No-Conf'
        }
    }
    return sign(payload, jwtSecret, {expiresIn: '1h'})
}