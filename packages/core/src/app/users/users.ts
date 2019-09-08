/**
 * users.ts
 * Combine query information for graphql
 */

// Node Modules

// NPM Modules
import { hashSync } from 'bcrypt'
import { verify } from 'jsonwebtoken'
import uuid = require('uuid')

// Local Modules
import { Querynator, simpleQuery } from '@lib/queries'
import { jwtSecret } from '@lib/connection'
import { Validation } from '@lib/validation'
import {
  sendConfirmation,
  sendFailedPasswordReset,
  sendPasswordReset
} from '@lib/email/emails'
import { UserTypes } from '@osm/users'
import { Customer } from '../api/customers/customers'
import { resolve } from 'path'
import { Log } from '@lib/log'

// Constants and global variables
const saltRounds = 10

class User extends Querynator {
  /**
   * Provide functions for modifying user accounts
   * @param context Context from original request, usually {req, res}
   * @param info The requested fields
   */
  constructor(context?, info?) {
    super(context, info)
    this.primaryKey = 'sys_id'
    this.tableName = 'sys_user'
    this.emit('init')
  }

  /**
   * Verify that the passwords match and meet the complexity requirements.
   * Then, return the hashed password
   * @param password1 Plaintext password
   * @param password2 Plaintext confirmation password
   */
  private verifyAndHashPassword(password1, password2): string {
    if (password1 !== password2) {
      throw new TypeError('Passwords do not match')
    } else if (!/[A-Z]/.test(password1)) {
      throw new TypeError('Passwords should contain an uppercase letter')
    } else if (!/[0-9]/.test(password1)) {
      throw new TypeError('Passwords should contain a number')
    } else if (password1.length < 8) {
      throw new TypeError('Password needs to be at least 8 characters long')
    } else if (password1.length > 50) {
      throw new TypeError('Passwords can not be over 50 characters long')
    } else {
      return hashSync(password1, saltRounds)
    }
  }

  private async validateToken(token): Promise<any> {
    verify(token, jwtSecret, (err, decoded: { t: string; g: string }) => {
      if (err) {
        if (err.name === 'TokenExpiredError' && decoded.g === 'r') {
          throw new Error(
            'Account was not confirmed within 30 days. Please reregister.'
          )
        } else if (err.name === 'TokenExpiredError' && decoded.g === 'h') {
          throw new Error(
            'Password was not reset within 1 hour. Please click on forgot password to restart password reset process.'
          )
        } else {
          throw new Error('Token is not valid. Please click on forgot password')
        }
      } else {
        return decoded
      }
    })
  }

  public async profile(userId?: string) {
    const user = userId || this.context.req.auth.u
    const profileQuery = `
  SELECT
    su.sys_id,
    su.given_name,
    su.surname,
    su.title_name,
    su.home_phone,
    su.work_phone,
    su.other_phone,
    su.email,
    su.preferred_contact
  FROM
    sys_user su
  WHERE
    sys_id = ?
    `
    return await Promise.all([
      simpleQuery(profileQuery, [user]),
      new Log(this.context, {
        table: this.tableName,
        primaryKey: this.primaryKey
      }).get([], user),
      new Customer(this.context, null).getMyCustomers(user)
    ])
    // return {
    //   logs: await new Log(this.context, {
    //     table: this.tableName,
    //     primaryKey: this.primaryKey
    //   }).get([], user),
    //   user: simpleQuery('SELECT * FROM sys_user_list WHERE sys_id = ?', [user]),
    //   customers: await new Customer(this.context, null).getMyCustomers(user)
    // }
    // return new Promise((resolve) => {
    //   const user = userId || this.context.req.auth.u
    //   // let detailsRetrieved: number = 0
    //   let info: any
    //   let logs: any
    //   // let customers: any
    //   // this.on('info', () => {
    //   //   detailsRetrieved++
    //   //   if (detailsRetrieved === 3) {
    //   //     return {
    //   //       user: info[0],
    //   //       logs,
    //   //       customers
    //   //     }
    //   //   }
    //   // })
    //   simpleQuery('SELECT * FROM sys_user_list WHERE sys_id = ?', [user])
    //     .then((details) => {
    //       info = details
    //       // this.emit('info')
    //       return new Log(this.context, {
    //         table: this.tableName,
    //         primaryKey: this.primaryKey
    //       }).get([], user)
    //     })
    //     .then((logDetails) => {
    //       logs = logDetails
    //       // this.emit('info')
    //       return new Customer(this.context, null).getMyCustomers(user)
    //     })
    //     .then((customers) => {
    //       return resolve({
    //         user: info[0],
    //         logs,
    //         customers
    //       })
    //     })
    //     .catch((e) => {
    //       new Log(e.message).error()
    //       return resolve(null)
    //       // this.emit('info')
    //     })
    // })
  }

  /**
   * Select a single user by user ID
   * @param userId User ID
   */
  public async getById(userId) {
    if (userId && userId.length === 36) {
      return await this.byId(userId)
    } else if (!userId && this.context.req.auth && this.context.req.auth.u) {
      return await this.byId(this.context.req.auth.u)
    } else {
      throw new TypeError('Valid userId must be provided')
    }
  }

  /**
   * Search for users based upon certain criteria
   * @param fields Fields to query upon
   */
  public async where(fields, pagination) {
    if (!fields) return await this.all(pagination)
    return await this.byFields({ fields }, pagination)
  }

  /**
   * Ensure that the username and email are both valid and not in use
   * @param {string, string} Object containing the username and email
   */
  public async validateUsernameAndEmail({
    userName,
    userEmail
  }: {
    userName: string
    userEmail: string
  }) {
    let query = 'SELECT userName FROM ?? WHERE ?'
    const params = []
    params.push(this.tableName)
    if (userName && userEmail) {
      params.push({ userName })
      params.push({ userEmail })
      query += ' AND ?'
    } else if (userName) {
      params.push({ userName })
    } else if (userEmail) {
      params.push({ userEmail })
    } else {
      throw new TypeError('Username and Email cannot both be empty')
    }
    return this.createQ({ query, params }, 'CALL')
  }

  /**
   * Validate fields, then create the user in the DB
   * @param {object} fields Contains all the fields from the user registration form
   */
  public async create(fields) {
    return new Promise((resolveCreate, rejectCreate) => {
      const requiredFields = [
        'userName',
        'userEmail',
        'userPhone',
        'userFirstName',
        'userLastName'
      ]
      const validator = new Validation(fields)
      const invalidFields = validator.required(requiredFields)
      if (invalidFields.length > 0) {
        rejectCreate({
          error: true,
          message: 'Invalid data provided',
          fields: invalidFields
        })
      } else {
        this.validateUsernameAndEmail({
          userName: fields.userName,
          userEmail: fields.userEmail
        })
          .then((results) => {
            if (results.length > 0) {
              let userNameIsTheSame = false
              let userEmailIsTheSame = false
              for (const user in results) {
                if (results[user].userName === fields.userName.toLowerCase()) {
                  userNameIsTheSame = true
                } else if (
                  results[user].userEmail === fields.userEmail.toLowerCase()
                ) {
                  userEmailIsTheSame = true
                } else {
                  continue
                }
              }
              if (userEmailIsTheSame) {
                rejectCreate({
                  error: true,
                  message:
                    'Email is already in use. Please click on forgot password.',
                  fields: ['userEmail']
                })
              } else {
                rejectCreate({
                  error: true,
                  message:
                    'Username is already in use. Please select a new username.',
                  fields: ['userName']
                })
              }
            } else {
              const defaultedFields = validator
                .truncate([
                  {
                    field: 'userName',
                    length: 36
                  },
                  {
                    field: 'userEmail',
                    length: 90
                  },
                  {
                    field: 'userDefaultNonsig',
                    length: 9
                  },
                  {
                    field: 'userFirstName',
                    length: 30
                  },
                  {
                    field: 'userLastName',
                    length: 30
                  }
                ])
                .defaults({
                  userId: uuid.v4(),
                  userConfirmation: uuid.v4()
                })
            }
          })
          .catch((err) => {
            new Log(err.message).error()
            rejectCreate({
              error: true,
              message: 'Please try again later'
            })
          })
      }
    })
  } // Create

  //   /**
  //    * Update an existing user with new information from form
  //    * @param {object} fields Fields to update an existing user
  //    */
  //   public async update(fields) {
  //     if (!this.context.req.params.id) {
  //       throw new TypeError('Cannot update user without userId')
  //     } else if (!fields) {
  //       throw new TypeError('Update body is empty! Nothing to update.')
  //     } else {
  //       try {
  //         const fieldsToUpdate: UserTypes.IAll = {}
  //         // Validate Nonsig
  //         if (fields.userDefaultNonsig) {
  //           const validNonsig = await new Nonsig(
  //             fields.userDefaultNonsig
  //           ).existsAndIsActive()
  //           if (validNonsig) {
  //             fieldsToUpdate.userDefaultNonsig = fields.userDefaultNonsig
  //           }
  //         }
  //         // Validate password
  //         if (fields.userPass && fields.userPassConfirmation) {
  //           try {
  //             fieldsToUpdate.userPass = this.verifyAndHashPassword(
  //               fields.userPass,
  //               fields.userPassConfirmation
  //             )
  //           } catch (err) {
  //             throw err
  //           }
  //         }

  //         if (fields.userFirstName || fields.userLastName || fields.userPhone) {
  //           const validatedStrings = new Validation(null).notEmpty(
  //             {
  //               userFirstName: fields.userFirstName,
  //               userLastName: fields.userLastName,
  //               phone: fields.phone,
  //               userNewEmail: fields.email
  //             },
  //             3
  //           )
  //           Object.keys(validatedStrings).map((val) => {
  //             fieldsToUpdate[val] = validatedStrings[val]
  //           })
  //         }

  //         if (fields.email) {
  //           fieldsToUpdate.userConfirmation = uuid.v4()
  //           sendConfirmation({
  //             userEmail: fields.userEmail,
  //             confirmationToken: fieldsToUpdate.userConfirmation,
  //             action: 'e'
  //           })
  //         }
  //         this.createUpdate(fieldsToUpdate)
  //         return this.byId(this.context.req.params.id)
  //       } catch (e) {
  //         throw e
  //       }
  //     }
  //   }

  //   /**
  //    * Retrieve the default customer from sys_user
  //    * @param {string} userId User ID to retrieve default customer for
  //    */
  //   public async defaultCustomer(userId) {
  //     const customerQuery = 'SELECT userDefaultNonsig FROM ?? WHERE ?? = ?'
  //     const customerParams = [this.tableName, this.primaryKey, userId]
  //     const customer = await this.createQ({
  //       query: customerQuery,
  //       params: customerParams
  //     })
  //     return new Customer(this.context, ['userDefaultNonsig']).getById(customer)
  //   }

  /**
   * Insert the user's new password in the database as well as
   * provide simple data validation.
   * @param jwt Token provided in the t query string parameter
   * @param password1 Password that will be set
   * @param password2 duh
   */
  public async confirmAccount(jwt, password1, password2) {
    const query = 'SELECT confirmUser(?) AS CONFIRMED'
    const params: [string[]] = [[]]
    let password: string = ''
    let token: string = ''
    let notVerified: boolean | number = false
    try {
      password = this.verifyAndHashPassword(password1, password2)
      token = (await this.validateToken(jwt)).t
    } catch (err) {
      throw err
    }
    params[0].push(token)
    params[0].push(password)
    notVerified = (await this.createQ({ query, params }, 'CALL')).CONFIRMED
    if (notVerified[0] === 0 || notVerified[0] === false) {
      resolve('User confirmed')
    } else {
      throw new Error('Unexpected error occurred. Please try again later')
    }
  } // confirmAccount()
}

// /**
//  * Reset the password for the requested user, if that account exists.
//  * If not, send a failed password request email to the supplied email
//  * @param {string} suppliedEmail Email supplied from forgot password form
//  */
async function forgotPassword(suppliedEmail: string) {
  const token = uuid.v4()
  const query = 'SELECT setForgotPassword(?, ?, ?) AS SUCCESS'
  const params = [null, suppliedEmail, token]
  const success = await new Querynator()
    .createQ({ query, params }, 'CALL')
    .catch((err) => {
      console.error(err)
    })
  if (success && typeof success[0].SUCCESS === 'string') {
    sendPasswordReset(success[0].SUCCESS, token)
  } else {
    sendFailedPasswordReset(success[0].SUCCESS)
  }
}

export default User
export { forgotPassword }
