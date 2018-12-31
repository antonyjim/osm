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
        this.normalizeNonsig()
    }

    private normalizeNonsig() {
        let nonsig = this.nonsig.nsNonsig
        if (nonsig.length < 9) {
            while (nonsig.length < 9) nonsig = '0' + nonsig
            this.nonsig.nsNonsig = nonsig
            return 0
        } else if (nonsig.length > 9) {
            this.nonsig.nsNonsig = nonsig.slice(0, 9)
            return 0
        } else {
            return 0
        }
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

    public existsAndIsActive(): Promise<{error: boolean, isActiveTHQ: boolean, isActive: boolean}> {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT nsNonsig, nsIsActive, nsIsActiveTHQ
                FROM nsInfo
                WHERE nsNonsig = ${pool.escape(this.nonsig.nsNonsig)}
            `
            pool.query(sql, (err: Error, results: Array<NonsigTypes.nsInfo>) => {
                if (err) {
                    err
                } else {
                    if (results.length === 0) {
                        const nonsig = results[0]
                        if(nonsig.nsIsActive && nonsig.nsIsActiveTHQ) {
                            resolve({
                                error: false,
                                isActiveTHQ: true,
                                isActive: true
                            })
                        } else if (nonsig.nsIsActive && !nonsig.nsIsActiveTHQ) {
                            resolve({
                                error: false,
                                isActiveTHQ: false,
                                isActive: true
                            })
                        } else {
                            resolve({
                                error: false,
                                isActiveTHQ: false,
                                isActive: false
                            })
                        }
                    } else {
                        reject({
                            error: true,
                            message: 'No nonsig found'
                        })
                    }
                }
            })
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
                    OR userId = ${pool.escape(accountOpts.userId)}
                    OR userEmail = ${pool.escape(accountOpts.userEmail)}`,
                function(err: Error, results: Array<UserTypes.LoginInfo>) {
                    if (err) {throw err}
                    if (results.length > 0) {
                        let reason: StatusMessage = {
                            error: true,
                            message: 'Username or ID or Email already exist'
                        }
                        reject(reason)
                    } else {
                        hash(this.userPass, saltRounds, function(hashed) {
                            new Nonsig({nsNonsig: accountOpts.userDefaultNonsig}).existsAndIsActive()
                            .then((nonsigExists) => {
                                if(nonsigExists.isActive && nonsigExists.isActiveTHQ) {
                                    pool.query(
                                        `INSERT INTO userRegistration
                                        (
                                            userId,
                                            userName, 
                                            userPass,
                                            userEmail,
                                            userDefaultNonsig,
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
                                            userFirstName,
                                            userLastName,
                                            userType,
                                            userPhone
                                        )
                                        VALUES (
                                            ${pool.escape([
                                                this.userId, 
                                                this.userFirstName,
                                                this.userLastName,
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
                                } else {
                                    reject({
                                        error: true,
                                        message: 'Nonsig is not active'
                                    })
                                }
                            }, (nonsigDoesNotExist) => {
                                reject(nonsigDoesNotExist)
                            })
                            .catch(err => {
                                throw err
                            })
                        })
                    }
                }
            )
        })
    }

    public createNew(): Promise<StatusMessage> {
        return new Promise((resolve, reject) => {
            this.userOpt.userId = uuid.v4()
            let requiredFields = [
                'userName',
                'userEmail',
                'userNonsig',
                'userPhone',
                'userFirstName',
                'userLastName'
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
                        userIsSuperAdmin: false,
                        userIsAdmin: false,
                        userAdministrator: null,
                        userType: 1
                    }
                )
                this.newAccount(defaultedFields)
                .then(function(resolvedPromise) {
                    resolve(resolvedPromise) 
                }, function(rejectedPromise) {
                    reject(rejectedPromise)
                })
                .catch(function(err) {
                    throw err
                }) 
            }
        })
    }
}