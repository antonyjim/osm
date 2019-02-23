/**
 * users.login.ts
 * Provide functions for first time authentication
*/

// Node Modules


// NPM Modules
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

// Local Modules
import { getPool, jwtSecret, Querynator } from '../connection'
import { UserTypes } from '../../types/users'
import { StatusMessage } from '../../types/server'
import { LoginException } from '../utils';
import { Log, UserLog } from '../log';

// Constants and global variables
const pool = getPool()
const tokenExpiration = process.env.TOKEN_EXPIRATION || '10h'

export async function Login(credentials: UserTypes.Credentials) {
    this.credentials = credentials

    this.validatePassword = async (hashed) => {
        return new Promise(resolve => {
            compare(this.credentials.password, hashed.toString(), function(err: Error, same: boolean) {
                if (err) throw new LoginException('Password error', err)
                return resolve(same)
            })
        })
    }

    this.incrementInvalidLogins = (sys_id) => {
        pool.query(`UPDATE sys_user
        SET userInvalidLoginAttempts = userInvalidLoginAttempts + 1
        WHERE sys_id = '${sys_id}'`)
    }

    this.handleLogin = (sys_id) => {
        const lastLogin: string = pool.escape(new Date().toISOString().replace('Z', ''))
        pool.query(`UPDATE sys_user
        SET userInvalidLoginAttempts = 0, userLastLogin = ${lastLogin}
        WHERE sys_id = ${pool.escape(sys_id)}`)
    }

    this.lockUser = (sys_id) => {
        pool.query(`UPDATE sys_user
        SET userIsLocked = 1
        WHERE sys_id = '${sys_id}'`)
    }

    return this.authenticate = (async () => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM user_login WHERE username = ?'
            let params = [this.credentials.username]
            new Querynator().createQ({query, params}, 'CALL')
            .then((users: UserTypes.LoginInfo[]) => {
                if (users.length === 1) {
                    let user = users[0]
                    // Check if user has confirmed their email
                    if (!user.userIsConfirmed) {
                        return reject({
                            error: true,
                            message: 'Please confirm email'
                        })
                    // Check if the user has been locked
                    } else if (user.userIsLocked) {
                        return reject({
                            error: true,
                            message: 'User account locked. Please click on forgot password'
                        })
                    // Check if the default nonsig has been inactivated
                    } else if (!user.nsIsActive) {
                        return reject({
                            error: true,
                            message: 'Nonsig inactive'
                        })
                    // Check everything else
                    } else if (
                        user.userIsConfirmed 
                        && !user.userIsLocked 
                        && user.userInvalidLoginAttempts < 5
                        && user.nsIsActive 
                    ) {
                        (async () => {
                            const same = await this.validatePassword(user.userPass)
                            .catch((err: Error) => {return reject({error: true, message: err.message})})
                            if (same) {
                                let authenticatedUser = {
                                    sys_id: user.sys_id,
                                    email: user.email,
                                    userIsAdmin: user.userIsAdmin,
                                    userNonsig: user.userNonsig,
                                    userRole: user.userRole
                                }
                                this.handleLogin(user.sys_id)
                                new UserLog('Logged In').info(user.sys_id)
                                return resolve({
                                    error: false,
                                    message: 'Login Accepted',
                                    details: authenticatedUser
                                })
                            } else {
                                this.incrementInvalidLogins(user.sys_id)
                                new UserLog('Invalid login attempt').error(4, user.sys_id)
                                return reject({
                                    error: true,
                                    message: 'Invalid username or password'
                                })
                            }
                        })()
                    } else {
                        this.lockUser(user.sys_id)
                        new UserLog('User has been locked').error(3, user.sys_id)
                        return reject({
                            error: true,
                            message: 'User account locked'
                        })
                    }
                } else {
                    return reject({
                        error: true,
                        message: 'Invalid username or password'
                    })
                }
            })
            .catch(err => {
                new Log(err.message).error(1)
                return reject({
                    error: true, 
                    message: 'SQL Error', 
                    details: err
                })
            })
        })
    })()
}

/**
 * Return token
 * @param payload Token to encrypt
 */
export function getToken(payload?: UserTypes.AuthToken) {
    if (!payload) {
        payload = {
            iA: false,
            u: null,
            c: null,
            r: 'No-Conf'
        }
    }
    return sign(payload, jwtSecret, {expiresIn: tokenExpiration})
}