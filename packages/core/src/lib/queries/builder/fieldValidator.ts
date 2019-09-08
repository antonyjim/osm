/**
 * lib/Querynator/fieldValidator.ts
 * Validate that fields match the type provided in the schema
 */

// Node Modules

// NPM Modules

// Local Modules
import { simpleQuery } from '@lib/connection'
import { ITableField, GenericFieldTypes } from '@osm/forms'
import { getTables } from '@app/model/constructSchema'
import { isBool as isBoolean } from '@lib/utils'

// Constants and global variables

export async function validateFieldIsValid(
  fieldInfo: ITableField,
  fieldValue: string | boolean | number
): Promise<GenericFieldTypes> {
  return new Promise((resolveValidField, rejectValidField) => {
    if (
      !fieldInfo.nullable &&
      (fieldValue === null || fieldValue === undefined)
    ) {
      rejectValidField(new Error(`Value cannot be null`))
    } else if (fieldInfo.reference && fieldInfo.refTable) {
      simpleQuery('SELECT DISTINCT ?? FROM ?? WHERE ?? = ?', [
        fieldInfo.reference,
        fieldInfo.refTable,
        fieldInfo.reference,
        fieldValue
      ])
        .then((row) => {
          if (Array.isArray(row) && row.length !== 0) {
            return resolveValidField(row[0][fieldInfo.reference])
          } else {
            rejectValidField(
              new Error('Invalid reference for ' + fieldInfo.label)
            )
          }
        })
        .catch((e) => {
          rejectValidField(
            new Error('Invalid reference for ' + fieldInfo.label)
          )
        })
    } else if (fieldInfo.type === 'boolean') {
      if (isBoolean(fieldValue)) {
        return resolveValidField(!!fieldValue)
      } else {
        rejectValidField(new Error('Expected boolean for ' + fieldInfo.label))
      }
    } else if (fieldInfo.type === 'string' && typeof fieldValue === 'string') {
      if (fieldInfo.maxLength) {
        return resolveValidField(fieldValue.slice(0, fieldInfo.maxLength))
      } else return fieldValue
    } else if (fieldInfo.type === 'number') {
      if (typeof fieldInfo === 'number') return fieldInfo
      else if (
        typeof fieldValue === 'string' &&
        !isNaN(parseInt(fieldValue, 10))
      ) {
        return resolveValidField(parseInt(fieldValue, 10))
      } else {
        rejectValidField(new Error('Expected number for ' + fieldInfo.label))
      }
    } else {
      rejectValidField(new Error('Unknown exception occurred'))
    }
  })
}

/**
 * Validate that the fields that are being queried are real fields
 * @param fields Object containing the fields to be validated against
 * @param aliases Table aliases received from this.queryBuilder
 */
export function validateFieldsExist(
  fields: string[],
  table: string,
  aliases?: any
): {
  valid: { validField: string[]; placeHolder: string; originalField: string }[]
  invalid: { message: string }[]
} {
  const schema = getTables()
  const returnFields: {
    validField: string[]
    placeHolder: string
    originalField: string
  }[] = []
  const invalidFields: { message: string }[] = []

  fields.map((field) => {
    const thisField = {
      validField: [],
      placeHolder: '',
      originalField: field
    }
    /*
      Referenced fields that are queried need to be
      treated a little differently by looking for the 
      reference field displayAs property rather than the 
      sys_id property.
    */
    if (field.endsWith('_display')) {
      field = field.slice(0, -8)
    }

    /*
      Verify that the table & column being queried against actually
      exists and can be queried against. If not, return.
    */
    if (schema[table] && schema[table].columns[field]) {
      const ref = schema[table].columns[field]

      if (
        aliases &&
        aliases[ref.refTable] &&
        schema[ref.refTable] &&
        schema[ref.refTable].columns[ref.displayAs]
      ) {
        /*
          Look for references. If found,
          add the referenced table to the 
          return object.
        */
        thisField.validField.push(aliases[ref.refTable], ref.displayAs)
        thisField.placeHolder = '??.??'
      } else if (aliases && aliases[table]) {
        /*
          If this is not a referenced object, then we
          can simply return the raw alias
        */
        thisField.validField.push(aliases[table], field)
        thisField.placeHolder = '??.??'
      } else if (aliases && !aliases[table]) {
        /*
          If we've gotten this far, then the table
          does exist, but the column does not exist.
        */
        return false
      } else {
        /*
          ???
        */
        thisField.validField.push(field)
        thisField.placeHolder = '??'
      }
      returnFields.push(thisField)
    } else {
      invalidFields.push({
        message: `${field} was unexpected for table ${table}`
      })
    }
  })
  return {
    valid: returnFields,
    invalid: invalidFields
  }
}
