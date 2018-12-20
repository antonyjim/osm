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
     */
    public required(requiredFields): Array<ValidationFields> {
        if (!requiredFields) {
            return [{
                isInvalid: true,
                fieldName: 'all',
                fieldValue: null
            }]
        }
        let invalidFields: Array<ValidationFields> = []
        for (let field of requiredFields) {
            if (this.providedFields[field] !== undefined 
                && this.providedFields[field] !== null) {
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
            for (let field of Object.keys(defaultFields)) {
                if (!this.providedFields[field]) {
                    // Only set the default if the field does not exist
                    this.providedFields[field] === defaultFields[field]
                } else {
                    continue
                }
            }
            return this.providedFields
        }
    }
}
