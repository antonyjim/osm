/**
 * validation.ts
 * Provide functions for validating data
 */

// Node Modules

// NPM Modules
import { isUndefined } from 'lodash'

// Local Modules
import { IValidationFields } from '../types/server'

// Constants and global variables

export class Validation {
  private providedFields: any

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
  public required(
    requiredFields: string[],
    switchOn?: string,
    extraRequiredFields?
  ): IValidationFields[] {
    if (!requiredFields) {
      return [
        {
          isInvalid: true,
          fieldName: 'all',
          fieldValue: null
        }
      ]
    }
    let fieldsToValidate: string[] = []
    if (this.providedFields && this.providedFields[switchOn]) {
      fieldsToValidate = requiredFields.concat(extraRequiredFields)
    } else {
      fieldsToValidate = requiredFields
    }
    const invalidFields: IValidationFields[] = []
    for (const field of fieldsToValidate) {
      if (
        this.providedFields[field] !== undefined &&
        this.providedFields[field] !== null &&
        this.providedFields[field] !== ''
      ) {
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
      const defaultedFields = this.providedFields
      for (const field of Object.keys(defaultFields)) {
        if (!defaultedFields[field] || defaultedFields[field] === '') {
          // Only set the default if the field does not exist
          defaultedFields[field] = defaultFields[field]
        } else {
          continue
        }
      }
      return defaultedFields
    }
  }

  public truncate(fields: { field: string; length: number }[]): any {
    for (const field of fields) {
      const fieldInQuestion = this.providedFields[field.field]
      if (field.field && fieldInQuestion) {
        this.providedFields[field.field] = fieldInQuestion.slice(
          0,
          field.length
        )
      }
    }
    return this
  }

  public updateFields(allowableFields): any {
    if (!allowableFields) {
      return this.providedFields
    } else {
      const sanitizedObject: any = {}
      for (const key of allowableFields) {
        if (
          this.providedFields[key] !== '' &&
          this.providedFields[key] !== null &&
          this.providedFields[key] !== undefined
        ) {
          sanitizedObject[key] = this.providedFields[key]
        }
      }
      return sanitizedObject
    }
  }

  public exists() {
    return this.providedFields !== null && this.providedFields !== undefined
  }

  public matches(test) {
    return this.providedFields === test
  }

  public isEmail() {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    return emailRegex.test(this.providedFields)
  }

  public notEmpty(fields: any, minLen?: number) {
    const min = minLen || 0
    if (Array.isArray(fields)) {
      const validFields = {}
      fields.map((field) => {
        if (
          !isUndefined(this.providedFields[field]) &&
          this.providedFields[field].length > min
        ) {
          validFields[field] = this.providedFields[field]
        }
      })
      return validFields
    } else if (typeof fields === 'object') {
      const keys = Object.keys(fields)
      const validFields: any = {}
      keys.map((key) => {
        if (typeof fields[key] === 'string' && fields[key].length > min) {
          validFields[key] = fields[key]
        }
      })
      return validFields
    } else if (typeof fields === 'string') {
      if (fields.length > min) {
        return fields
      } else {
        return null
      }
    } else {
      return null
    }
  }
}

export function isBoolean(val) {
  return (
    val === 'false' ||
    typeof val === 'boolean' ||
    val === 'true' ||
    val === 1 ||
    val === 0
  )
}
