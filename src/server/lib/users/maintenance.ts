/**
 * users.maintenance.ts
 * Provide utilities for creating and modifying user accounts and nonsigs
*/

// Node Modules


// NPM Modules
import * as uuid from 'uuid'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

// Local Modules
import { UserTypes } from '../../types/users'
import { Validation } from '../validation'
import { StatusMessage } from '../../types/server';
import { getPool, jwtSecret } from '../connection';
import { sendConfirmation } from '../email/emails';
import { NonsigTypes } from '../../types/nonsig';


// Constants and global variables
const pool = getPool()
const saltRounds = 10

export class Nonsig {
    nonsig: NonsigTypes.nsInfo

    /**
     * @param ns Nonsig information
     */
    constructor(ns) {
        this.nonsig = ns        
    }

    private checkForExistingNonsig(nsNonsig) {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT *
                FROM nsInfo
                WHERE nsNonsig = ${pool.escape(nsNonsig)}
            `
            pool.query(sql, (err: Error, results) => {
                if (err) {
                    throw {
                        error: true,
                        message: err
                    }
                } else {
                    if (results.length > 0) {
                        reject({
                            error: true,
                            message: 'Nonsig already exists',
                            details: results
                        })
                    } else {
                        resolve({
                            error: false,
                            message: 'Nonsig does not exist'
                        })
                    }
                }
            })
        })
    }

    public create() {
        return new Promise((resolve, reject) => {
            let validator = new Validation(this.nonsig)
            let invalidFields = validator.defaults(
                [
                    'nsTradeStyle',
                    'nsNonsig',
                    'nsAddr1',
                    'nsCity',
                    'nsPostalCode',
                    'nsCountry',
                    'nsType'
                ]
            )
            if (invalidFields) {
                reject({
                    error: true,
                    message: 'Missing required fields',
                    details: invalidFields
                })
            } else {
                this.checkForExistingNonsig(this.nonsig.nsNonsig)
                .then((onSuccess: StatusMessage) => {
                    let nsToAdd = validator.defaults({
                        nsId: uuid.v4(),
                        nsIsActive: true,
                        nsIsActiveTHQ: true,
                        nsAddr2: null,
                        nsBrandKey: null
                    })
                    let insertionSql = `
                        INSERT INTO
                            nsInfo (
                                nsId,
                                nsTradeStyle,
                                nsNonsig,
                                nsAddr1,
                                nsAddr2,
                                nsCity,
                                nsState,
                                nsPostalCode,
                                nsCountry,
                                nsBrandKey,
                                nsIsActive,
                                nsIsActiveTHQ,
                                nsType
                            )
                        VALUES (
                            ${pool.escape([
                                nsToAdd.nsId,
                                nsToAdd.nsTradeStyle,
                                nsToAdd.nsNonsig,
                                nsToAdd.nsAddr1,
                                nsToAdd.nsAddr2,
                                nsToAdd.nsCity,
                                nsToAdd.nsState,
                                nsToAdd.nsPostalCode,
                                nsToAdd.nsCountry,
                                nsToAdd.nsBrandKey,
                                nsToAdd.nsIsActive,
                                nsToAdd.nsIsActiveTHQ,
                                nsToAdd.nsType
                            ])}
                        )
                    `
                    pool.query(insertionSql, (err: Error, results) => {
                        if (err) {
                            throw {
                                error: true,
                                message: err
                            }
                         } else {
                            resolve({
                                error: false,
                                message: 'Added nonsig',
                                details: nsToAdd
                            })
                         }
                    })
                }, (onFailure: StatusMessage) => {
                    reject(onFailure)
                })
                .catch((err: StatusMessage) => {
                    reject(err)
                })
            }
        })
    }
} // Nonsig

export class User {
    userOpt: UserTypes.All

    /**
     * Create, edit, destroy users
     */
    constructor(options: UserTypes.All) {
        this.userOpt = options
    }

    private newAccount(accountOpts: UserTypes.All): Promise<StatusMessage> {
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

    public createNew(): StatusMessage {
        this.userOpt.userId = uuid.v4()
        let requiredFields = [
            'userName',
            'userPass',
            'userEmail',
            'userNonsig',
            'userIsAdmin',
            'userPhone'
        ]
        let validator = new Validation(this.userOpt)
        let invalidFields = validator.required(requiredFields)
        if (invalidFields) {
            return {
                error: true,
                message: 'Invalid data',
                details: invalidFields
            }
        } else {
            let defaultedFields = validator.defaults({
                userId: uuid.v4(),
                userIsSuperAdmin: false,
                userAdministrator: null,
                userIsLocked: false,
                userIsConfirmed: false,
                userType: 1
            })
            this.newAccount(defaultedFields)
            .then(function(resolvedPromise) {
                return resolvedPromise
            }, function(rejectedPromise) {
                return rejectedPromise
            })
            .catch(function(err) {
                return {
                    error: true,
                    message: err
                }
            }) 
        }
    }
}