/**
 * users.login.ts
 * Provide functions for first time authentication
 */

// Node Modules

// NPM Modules
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

// Local Modules
import { Querynator, simpleQuery } from '../../lib/queries'
import { jwtSecret, getPool } from '../../lib/connection'
import { UserTypes } from '../../types/users'
import { LoginException } from '../../lib/utils'
import { Log } from '../../lib/log'
import { IStatusMessage } from '../../types/server'
import { jwtKeys } from '../../routes/middleware/authentication'

// Constants and global variables
const tokenExpiration = process.env.TOKEN_EXPIRATION || '10h'

export enum sysUser {
  active = 'is_active',
  lastLogin = 'last_login',
  userName = 'username',
  firstName = 'given_name',
  lastName = 'surname',
  password = 'pass_hash',
  locked = 'is_locked',
  confirmed = 'is_confirmed',
  invalidLogins = 'invalid_login_count',
  lastPasswordChange = 'last_pass_change',
  appScope = 'app_scope',
  userId = 'sys_id',
  email = 'email',
  claimLevel = 'claim',
  claim = 'auth_claim'
}

export function login(
  credentials: UserTypes.ICredentials
): Promise<IStatusMessage> {
  return new Promise((resolveLogin, rejectLogin) => {
    this.credentials = credentials

    const validatePassword = (hashed) => {
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

    const incrementInvalidLogins = (userId: string): void => {
      simpleQuery('UPDATE sys_user SET ?? = ?? + 1 WHERE sys_id = ?', [
        sysUser.invalidLogins,
        sysUser.invalidLogins,
        userId
      ])
    }

    const handleLogin = (userId: string): void => {
      const lastLogin: string = new Date().toISOString().replace('Z', '')

      simpleQuery('UPDATE sys_user SET ? WHERE sys_id = ?', [
        {
          [sysUser.invalidLogins]: 0,
          [sysUser.lastLogin]: lastLogin
        },
        userId
      ])
    }

    const lockUser = (userId: string): void => {
      simpleQuery('UPDATE sys_user SET ? WHERE sys_id = ?', [
        {
          [sysUser.locked]: 1
        },
        userId
      ])
    }

    const query: string = 'CALL login_username(?)'
    const params = [this.credentials.username]
    simpleQuery(query, params)
      .then((users: sysUser[]) => {
        /*
          We may have many rows returned here if the validatedUser has multiple organizational units.
        */
        if (users && users.length > 0) {
          const validatedUser: sysUser = users[0]
          // Check if validatedUser has confirmed their email
          if (!validatedUser[sysUser.confirmed]) {
            return rejectLogin({
              error: true,
              message: 'Please confirm email'
            })
            // Check if the validatedUser has been locked
          } else if (validatedUser[sysUser.locked]) {
            return rejectLogin({
              error: true,
              message: 'User account locked. Please click on forgot password'
            })
            // Check if the default nonsig has been inactivated
          } else if (!validatedUser[sysUser.active]) {
            return rejectLogin({
              error: true,
              message: 'Inactive username'
            })
            // Check everything else
          } else if (
            validatedUser[sysUser.confirmed] &&
            !validatedUser[sysUser.locked] &&
            validatedUser[sysUser.invalidLogins] < 5 &&
            validatedUser[sysUser.active]
          ) {
            validatePassword(validatedUser[sysUser.password])
              .then((same: boolean) => {
                if (same) {
                  const authenticatedUser = validatedUser
                  handleLogin(validatedUser[sysUser.userId])
                  new Log('Logged In', {
                    table: 'sys_user',
                    primaryKey: 'sys_id'
                  }).info(validatedUser[sysUser.userId])
                  return resolveLogin({
                    error: false,
                    message: 'Login Accepted',
                    details: authenticatedUser
                  })
                } else {
                  incrementInvalidLogins(validatedUser[sysUser.userId])
                  new Log('Invalid login attempt', {
                    table: 'sys_user',
                    primaryKey: 'sys_id'
                  }).error(4, validatedUser[sysUser.userId])
                  return rejectLogin({
                    error: true,
                    message: 'Invalid username or password'
                  })
                }
              })
              .catch((err: Error) => {
                return rejectLogin({ error: true, message: err.message })
              })
          } else {
            lockUser(validatedUser[sysUser.userId])
            new Log('User has been locked', {
              table: 'sys_user',
              primaryKey: 'sys_id'
            }).error(3, validatedUser[sysUser.userId])
            return rejectLogin({
              error: true,
              message: 'User account locked'
            })
          }
        } else {
          return rejectLogin({
            error: true,
            message: 'Invalid username or password'
          })
        }
      })
      .catch((err) => {
        new Log(err.message).error(1)
        return rejectLogin({
          error: true,
          message: 'SQL Error',
          details: err
        })
      })
  })
}

/**
 * Return token
 * @param payload Token to encrypt
 */
export function getToken(payload?: UserTypes.IAuthToken) {
  if (!payload) {
    payload = {
      [jwtKeys.isAuthenticated]: false,
      [jwtKeys.isAuthorized]: null,
      [jwtKeys.claim]: null,
      [jwtKeys.claimLevel]: null
    }
  }
  return sign(payload, jwtSecret, { expiresIn: tokenExpiration })
}
