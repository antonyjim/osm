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
import { UserTypes } from '../../../types/users'
import { LoginException } from '../utils'
import { Log } from '../log'

// Constants and global variables
const pool = getPool()
const tokenExpiration = process.env.TOKEN_EXPIRATION || '10h'

export async function Login(credentials: UserTypes.ICredentials) {
  this.credentials = credentials

  this.validatePassword = async (hashed) => {
    return new Promise((resolve) => {
      compare(
        this.credentials.password,
        hashed.toString(),
        (err: Error, same: boolean) => {
          if (err) throw new LoginException('Password error', err)
          return resolve(same)
        }
      )
    })
  }

  this.incrementInvalidLogins = (userId) => {
    pool.query(`UPDATE sys_user
        SET userInvalidLoginAttempts = userInvalidLoginAttempts + 1
        WHERE sys_id = '${userId}'`)
  }

  this.handleLogin = (userId) => {
    const lastLogin: string = pool.escape(
      new Date().toISOString().replace('Z', '')
    )
    pool.query(`UPDATE sys_user
        SET userInvalidLoginAttempts = 0, userLastLogin = ${lastLogin}
        WHERE sys_id = ${pool.escape(userId)}`)
  }

  this.lockUser = (userId) => {
    pool.query(`UPDATE sys_user
        SET userIsLocked = 1
        WHERE sys_id = '${userId}'`)
  }

  return (this.authenticate = (async () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM user_login WHERE username = ?'
      const params = [this.credentials.username]
      new Querynator()
        .createQ({ query, params }, 'CALL')
        .then((users: UserTypes.ILoginInfo[]) => {
          if (users.length === 1) {
            const user = users[0]
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
            } else if (!user.active) {
              return reject({
                error: true,
                message: 'Nonsig inactive'
              })
              // Check everything else
            } else if (
              user.userIsConfirmed &&
              !user.userIsLocked &&
              user.userInvalidLoginAttempts < 5 &&
              user.active
            ) {
              ;(async () => {
                const same = await this.validatePassword(user.userPass).catch(
                  (err: Error) => {
                    return reject({ error: true, message: err.message })
                  }
                )
                if (same) {
                  const authenticatedUser = {
                    sys_id: user.sys_id,
                    email: user.email,
                    userIsAdmin: user.userIsAdmin,
                    userNonsig: user.userNonsig,
                    userRole: user.userRole
                  }
                  this.handleLogin(user.sys_id)
                  new Log('Logged In', {
                    table: 'sys_user',
                    primaryKey: 'sys_id'
                  }).info(user.sys_id)
                  return resolve({
                    error: false,
                    message: 'Login Accepted',
                    details: authenticatedUser
                  })
                } else {
                  this.incrementInvalidLogins(user.sys_id)
                  new Log('Invalid login attempt', {
                    table: 'sys_user',
                    primaryKey: 'sys_id'
                  }).error(4, user.sys_id)
                  return reject({
                    error: true,
                    message: 'Invalid username or password'
                  })
                }
              })()
            } else {
              this.lockUser(user.sys_id)
              new Log('User has been locked', {
                table: 'sys_user',
                primaryKey: 'sys_id'
              }).error(3, user.sys_id)
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
        .catch((err) => {
          new Log(err.message).error(1)
          return reject({
            error: true,
            message: 'SQL Error',
            details: err
          })
        })
    })
  })())
}

/**
 * Return token
 * @param payload Token to encrypt
 */
export function getToken(payload?: UserTypes.IAuthToken) {
  if (!payload) {
    payload = {
      iA: false,
      u: null,
      c: null,
      r: 'No-Conf'
    }
  }
  return sign(payload, jwtSecret, { expiresIn: tokenExpiration })
}
