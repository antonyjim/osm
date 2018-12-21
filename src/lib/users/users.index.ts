/**
 * users.index.ts
 * Provide utilities for creating and modifying user accounts
*/

// Node Modules


// NPM Modules
import * as uuid from 'uuid'

// Local Modules
import { UserTypes } from './../../types/users'
import { Validation } from '../validation'
import { StatusMessage } from '../../types/server';
import { newAccount } from '../accounts/accounts.create';
import { getPool } from '../connection';

// Constants and global variables
const pool = getPool()

export class User {
    userOpt: UserTypes.All

    /**
     * Create, edit, destroy users
     */
    constructor(options: UserTypes.LoginInfo) {
        for (let key of Object.keys(options)) {
            this.userOpt[key] = options[key]
        }
    }

    public createNew(): StatusMessage {
        this.userOpt.userId = uuid.v4()
        let requiredFields = [
            'userId',
            'userName',
            'userPass',
            'userEmail',
            'userNonsig',
            'userIsAdmin',
            'userView',
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
                userIsSuperAdmin: false,
                userAdministrator: null,
                userIsLocked: false,
                userType: 1
            })
            newAccount(defaultedFields)
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