/**
 * users.ts
 * Combine query information for graphql
*/

// Node Modules


// NPM Modules
import { hashSync } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import uuid = require('uuid');


// Local Modules
import { Querynator, jwtSecret } from './../../connection'
import { Nonsig } from '../../users/maintenance';
import { Validation } from '../../validation';
import { sendConfirmation, sendFailedPasswordReset, sendPasswordReset } from '../../email/emails';
import { UserTypes } from '../../../types/users';
import { Customer } from '../customers/customers';
import { resolve } from 'path';
import { Log, UserLog } from '../../log';

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
        this.primaryKey = 'userId'
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
        return new Promise(resolve => {
            verify(token, jwtSecret, (err, decoded: {t: string, g: string}) => {
                if (err) {
                    if (err.name === 'TokenExpiredError' && decoded.g === 'r') {
                        throw new Error('Account was not confirmed within 30 days. Please reregister.')
                    } else if (err.name === 'TokenExpiredError' && decoded.g === 'h') {
                        throw new Error('Password was not reset within 1 hour. Please click on forgot password to restart password reset process.')
                    } else {
                        throw new Error('Token is not valid. Please click on forgot password')
                    }
                } else {
                    resolve(decoded)
                }
            })
        })
    }

    public async profile(sys_id?: string) {
        return new Promise((resolve, reject) => {
            let user = sys_id || this.context.req.auth.u
            let info: any
            , logs: any
            , customers: any
            , detailsRetrieved: number = 0
            this.on('info', () => {
                detailsRetrieved++
                if (detailsRetrieved === 3) {
                    resolve ({
                        user: info[0],
                        logs,
                        customers
                    })
                }
            })
            this.createQ({
                query: 'SELECT * FROM sys_user_list WHERE sys_id = ?',
                params: [user]
            }, 'CALL')
            .then(details => {
                info = details
                this.emit('info')
                return (async () => new UserLog(this.context).get([], user))()
            })
            .then(logDetails => {
                logs = logDetails
                this.emit('info')
                return (async () => new Customer(this.context, null).getMyCustomers())()
            })
            .then(customerDetails => {
                customers = customerDetails
                this.emit('info')
            })
            .catch(e => {
                new Log(e.message).error()
                this.emit('info')
            })
        })
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
        if (fields === undefined || Object.keys(fields).length === 0) return await this.all(pagination)
        return await this.byFields({fields}, pagination)
    }

    /**
     * Ensure that the username and email are both valid and not in use
     * @param {string, string} Object containing the username and email
     */
    public async validateUsernameAndEmail(
        {userName, userEmail}: 
        {userName: string, userEmail: string}
    ) {
        let query = 'SELECT userName FROM ?? WHERE ?'
        let params = []
        params.push(this.tableName)
        if (userName && userEmail) {
            params.push({userName})
            params.push({userEmail})
            query += ' AND ?'
        } else if (userName) {
            params.push({userName})
        } else if (userEmail) {
            params.push({userEmail})
        } else {
            throw new TypeError('Username and Email cannot both be empty')
        }
        return this.createQ({query, params}, 'CALL')
    }

    /**
     * Validate fields, then create the user in the DB
     * @param {object} fields Contains all the fields from the user registration form
     */
    public async create(fields) {
        return new Promise((resolve, reject) => {
            let requiredFields = [
                'userName',
                'userEmail',
                'userNonsig',
                'userPhone',
                'userFirstName',
                'userLastName'
            ]
            , validator = new Validation(fields)
            , invalidFields = validator.required(requiredFields)
            if (invalidFields.length > 0) {
                reject({
                    error: true,
                    message: 'Invalid data provided',
                    fields: invalidFields
                }) 
            } else {
                this.validateUsernameAndEmail({userName: fields.userName, userEmail: fields.userEmail})
                .then(results => {
                    if (results.length > 0) {
                        let userNameIsTheSame = false
                        let userEmailIsTheSame = false
                        for (let user in results) {
                            if (results[user].userName === fields.userName.toLowerCase()) {
                                userNameIsTheSame = true
                            } else if (results[user].userEmail === fields.userEmail.toLowerCase()) {
                                userEmailIsTheSame = true
                            } else {
                                continue
                            }
                        }
                        if (userEmailIsTheSame) {
                            reject({
                                error: true,
                                message: 'Email is already in use. Please click on forgot password.',
                                fields: ['userEmail']
                            })
                        } else {
                            reject({
                                error: true,
                                message: 'Username is already in use. Please select a new username.',
                                fields: ['userName']
                            })
                        }
                    } else {
                        let defaultedFields = validator.truncate(
                            [
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
                            ]
                        ).defaults(
                            {
                                userId: uuid.v4(),
                                userConfirmation: uuid.v4()
                            }
                        )
                        new Nonsig({nsNonsig: fields.userNonsig}).existsAndIsActive()
                        .then(nonsigExists => {
                            if(nonsigExists.isActive && nonsigExists.isActiveTHQ) {
                                const query = 'CALL newUser (?)'
                                , params = [[
                                    defaultedFields.userId,
                                    defaultedFields.userName.toLowerCase(),
                                    null,
                                    defaultedFields.userEmail.toLowerCase(),
                                    defaultedFields.userNonsig,
                                    (fields.userIsLocked === true ? 1 : 0),
                                    0,
                                    defaultedFields.userFirstName,
                                    defaultedFields.userLastName,
                                    defaultedFields.userPhone,
                                    defaultedFields.userConfirmation
                                ]]
                                this.createQ({query, params}, 'CALL')
                                .then(userCreated => {
                                    sendConfirmation(
                                        {
                                            userEmail: fields.userEmail, 
                                            confirmationToken: fields.userConfirmation,
                                            action: 'r'
                                        },
                                        (err, status) => {
                                            if (err) throw err
                                            resolve(status)
                                        }
                                    )
                                })
                                .catch(err => {
                                    reject({
                                        error: true,
                                        message: err.message
                                    })
                                })
                            }  else {
                                reject({
                                    error: true,
                                    message: 'Customer is not active. Please contact support.',
                                    fields: ['userNonsig']
                                })
                            }
                        }, invalidCustomer => {
                            reject({
                                error: true,
                                message: 'Customer is not valid. Please enter a valid customer number.',
                                fields: ['userNonsig']
                            })
                        }) 
                        .catch(err => {
                            new Log(err.message).error(3)
                            throw err
                        })
                    }
                })
                .catch(err => {
                    new Log(err.message).error()
                    reject({
                        error: true,
                        message: 'Please try again later'
                    })
                })
            }
        })
    } // Create

    /**
     * Update an existing user with new information from form
     * @param {object} fields Fields to update an existing user
     */
    public async update(fields) {
        if (!fields.userId) {
            throw new TypeError('Cannot update user without userId')
        } else {
            try {
                let fieldsToUpdate: UserTypes.All = {}
                // Validate Nonsig
                if (fields.userDefaultNonsig) {
                    let validNonsig = await new Nonsig(fields.userDefaultNonsig).existsAndIsActive()
                    if (validNonsig) {
                        fieldsToUpdate.userDefaultNonsig = fields.userDefaultNonsig
                    }
                }
                // Validate password
                if (fields.userPass && fields.userPassConfirmation) {
                    try {
                        fieldsToUpdate.userPass 
                        = this.verifyAndHashPassword(fields.userPass, fields.userPassConfirmation)
                    } catch(err) {
                        throw err
                    }
                }

                if (fields.userFirstName || fields.userLastName || fields.userPhone) {
                    const validatedStrings = new Validation(null).notEmpty(
                        {
                            userFirstName: fields.userFirstName, 
                            userLastName: fields.userLastName, 
                            userPhone: fields.userPhone,
                            userNewEmail: fields.userEmail
                        },
                        3
                    )
                    Object.keys(validatedStrings).map(val => {
                        fieldsToUpdate[val] = validatedStrings[val]
                    })
                }

                if (fields.userEmail) {
                    fieldsToUpdate.userConfirmation = uuid.v4()
                    sendConfirmation(
                        {
                            userEmail: fields.userEmail, 
                            confirmationToken: fieldsToUpdate.userConfirmation, 
                            action: 'e'
                        }
                    )
                }
                this.createUpdate(fieldsToUpdate, fields.userId)
                return this.byId(fields.userId)
            } catch(e) {
                throw e
            }
        }

    }

    /**
     * Retrieve the default customer from sys_user  
     * @param {string} userId User ID to retrieve default customer for
     */
    public async defaultCustomer(userId) {
      const customerQuery = 'SELECT userDefaultNonsig FROM ?? WHERE ?? = ?'
      const customerParams = [this.tableName, this.primaryKey, userId]
      const customer = await this.createQ({query: customerQuery, params: customerParams})
      return new Customer(this.context, ['userDefaultNonsig']).getById(customer)
    }

    public async confirmAccount(jwt, password1, password2) {
        const query = 'SELECT confirmUser(?) AS CONFIRMED'
        let params: [string[]] = [[]]
        let password:string = ''
        let token: string = ''
        let notVerified: boolean | number = false
        try {
            password = this.verifyAndHashPassword(password1, password2)
            token = (await this.validateToken(jwt)).t
        } catch(err) {
            throw err
        }
        params[0].push(token)
        params[0].push(password)
        notVerified = (await this.createQ({query, params}, 'CALL')).CONFIRMED
        if (notVerified[0] === 0 || notVerified[0] === false) {
            resolve('User confirmed')
        } else {
            throw new Error('Unexpected error occurred. Please try again later')
        }
    }
}

/**
 * Reset the password for the requested user, if that account exists.
 * If not, send a failed password request email to the supplied email
 * @param {string} suppliedEmail Email supplied from forgot password form
 */
async function forgotPassword(suppliedEmail: string) {
    let token = uuid.v4()
    let query = 'CALL setForgotPassword(?) AS SUCESS'
    let params = [
        suppliedEmail,
        token
    ]
    let email = (await new Querynator().createQ({query, params}, 'CALL')).SUCCESS.unshift()
    if (typeof email === 'string') {
        sendPasswordReset(email, token)
    } else {
        sendFailedPasswordReset(email)
    }
}

export default User 
export {forgotPassword}
