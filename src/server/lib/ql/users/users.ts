/**
 * users.ts
 * Combine query information for graphql
*/

// Node Modules


// NPM Modules
import { hashSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import uuid = require('uuid');


// Local Modules
import { Querynator } from './../../connection'
import { Nonsig } from '../../users/maintenance';
import { Validation } from '../../validation';
import { sendConfirmation } from '../../email/emails';
import { UserTypes } from '../../../types/users';
import { Customer } from '../customers/customers';

// Constants and global variables
const saltRounds = 10

class User extends Querynator {
    constructor(context, info) {
        super(context, info)
        this.tableName = 'sys_user'
        this.primaryKey = 'userId'
    }

    private verifyAndHashPassword(password1, password2): string {
        if (password1 !== password2) {
            throw new TypeError('Passwords do not match')
        } else if (!/[A-Z]/.test(password1)) {
            message: 'Passwords should contain an uppercase letter'
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

    public async getById(userId) {
        if (userId && userId.length === 36) {
            return await this.byId(userId)
        } else if (!userId && this.context.auth && this.context.auth.userId) {
            return await this.byId(this.context.auth.userId)
        } else {
            throw new TypeError('Valid userId must be provided')
        }
    }

    public async where(fields) {
        if (fields === undefined || Object.keys(fields).length === 0) return await this.all()
        return await this.byFields({fields})
    }

    public async validateUsernameAndEmail(
        {userName, userEmail}: 
        {userName: string, userEmail: string}
    ) {
        let query = 'SELECT userName FROM ?? WHERE ?'
        let params = []
        params.push(this.tableName)
        if (userName && userEmail) {
            params.push({userName, userEmail})
        } else if (userName) {
            params.push({userName})
        } else if (userEmail) {
            params.push({userEmail})
        } else {
            throw new TypeError('Username and Email cannot both be empty')
        }
        return this.createQ({query, params})
    }

    /**
     * Validate fields, then create the user in the DB
     * @param fields Contains all the fields from the user registration form
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
                    message: 'Invalid data',
                    details: invalidFields
                }) 
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
                new Nonsig({nsNonsig: fields.userDefaultNonsig}).existsAndIsActive()
                .then(nonsigExists => {
                    if(nonsigExists.isActive && nonsigExists.isActiveTHQ) {
                        const query = 'CALL newUser (?)'
                        , params = [
                            fields.userId,
                            fields.userName.toLowerCase(),
                            null,
                            fields.userEmail.toLowerCase(),
                            fields.userDefaultNonsig,
                            (fields.userIsLocked === true ? 1 : 0),
                            0,
                            fields.userFirstName,
                            fields.userLastName,
                            fields.userPhone,
                            fields.userConfirmation
                        ]
                        this.createQ({query, params}, 'INSERT')
                        .then(userCreated => {
                            sendConfirmation(
                                {
                                    userEmail: fields.userEmail, 
                                    confirmationToken: fields.userConfirmation,
                                    action: 'r'
                                },
                                (err, status) => {
                                    if (err) reject(err)
                                    resolve(status)
                                }
                            )
                        })
                    }  else {
                        reject('Nonsig is not active')
                    }
                }, nonsigDoesNotExist => {
                    reject(nonsigDoesNotExist)
                }) 
                .catch(err => {
                    throw err
                })
            }
        })
    } // Create

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

    public async defaultCustomer(userId) {
      const customerQuery = 'SELECT userDefaultNonsig FROM ?? WHERE ?? = ?'
      const customerParams = [this.tableName, this.primaryKey, userId]
      const customer = await this.createQ({query: customerQuery, params: customerParams})
      return new Customer(this.context).getById(customer)
    }
}

export default User
