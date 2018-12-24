/**
 * validation.ts
 * Provide functions for validating data
*/

// Node Modules


// NPM Modules


// Local Modules
import { ValidationFields } from "../types/server";
import { UserTypes } from "../types/users";

// Constants and global variables

export class Validation {
    providedFields: any

    /**
     * Accept the provided input and what the required fields are
     */
    constructor(providedFields: any) {
        this.providedFields = providedFields
    }

    /**
     * Check that all fields in an array are present and not null
     * @param requiredFields Array of field names
     * @param switchOn If this, validate on more fields
     * @param extraRequiredFields Any more fields based on the switch
     */
    public required(requiredFields, switchOn?, extraRequiredFields?): Array<ValidationFields> {
        if (!requiredFields) {
            return [{
                isInvalid: true,
                fieldName: 'all',
                fieldValue: null
            }]
        }
        let fieldsToValidate: Array<string> = []
        if (this.providedFields[switchOn]) {
            fieldsToValidate = requiredFields.concat(extraRequiredFields)
        } else {
            fieldsToValidate = requiredFields
        }
        let invalidFields: Array<ValidationFields> = []
        for (let field of fieldsToValidate) {
            if (this.providedFields[field] !== undefined 
                && this.providedFields[field] !== null
                && this.providedFields[field] !== '') {
                    continue
            } else {
                invalidFields.push({
                    isInvalid: true,
                    fieldName: field,
                    fieldValue: this.providedFields[field]
                })
            }
        }
        return invalidFields
    }

    /**
     * Set default fields from provided object
     * @param defaultFields Object containing defult field values to set
     */
    public defaults(defaultFields): any {
        if (!defaultFields) {
            return this.providedFields
        } else {
            let defaultedFields = this.providedFields
            for (let field of Object.keys(defaultFields)) {
                if (!defaultedFields[field] || defaultedFields[field] == '') {
                    // Only set the default if the field does not exist
                    defaultedFields[field] = defaultFields[field]
                } else {
                    continue
                }
            }
            return defaultedFields
        }
    }

    public updateFields(allowableFields): any {
        if (!allowableFields) {
            return this.providedFields
        } else {
            let sanitizedObject: any = {}
            for (let key of allowableFields) {
                if (this.providedFields[key]) {
                    sanitizedObject[key] = this.providedFields[key]
                }
            }
            return sanitizedObject
        }
    }
}
