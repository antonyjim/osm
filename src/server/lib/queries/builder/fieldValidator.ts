/**
 * lib/Querynator/fieldValidator.ts
 * Validate that fields match the type provided in the schema
 */

// Node Modules
import { isBoolean } from 'util'

// NPM Modules

// Local Modules
import { simpleQuery } from '../../connection'
import { ITableField } from '../../../../types/forms'
import { getTables } from '../../api/schema/constructSchema'

// Constants and global variables

export async function validateFieldIsValid(
  fieldInfo: ITableField,
  fieldValue: string | boolean | number
) {
  if (
    !fieldInfo.nullable &&
    (fieldValue === null || fieldValue === undefined)
  ) {
    throw new Error(`Value cannot be null`)
  } else if (fieldInfo.reference && fieldInfo.refTable) {
    const row = await simpleQuery('SELECT DISTINCT ?? FROM ?? WHERE ?? = ??', [
      fieldInfo.reference,
      fieldInfo.refTable,
      fieldInfo.reference,
      fieldValue
    ]).catch((e) => {
      throw new Error('Invalid reference')
    })
    if (Array.isArray(row) && row.length !== 0) return true
    else throw new Error('Invalid reference')
  } else if (fieldInfo.type === 'boolean') {
    if (isBoolean(fieldValue)) {
      return !!fieldValue
    } else {
      throw new Error('Expected boolean')
    }
  } else if (fieldInfo.type === 'string' && typeof fieldValue === 'string') {
    if (fieldInfo.maxLength) return fieldValue.slice(0, fieldInfo.maxLength)
    else return fieldValue
  } else if (fieldInfo.type === 'number') {
    if (typeof fieldInfo === 'number') return fieldInfo
    else if (
      typeof fieldValue === 'string' &&
      !isNaN(parseInt(fieldValue, 10))
    ) {
      return parseInt(fieldValue, 10)
    } else throw new Error('Expected number')
  } else throw new Error('Unknown exception occurred')
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
): { validField: string[]; placeHolder: string; originalField: string }[] {
  const schema = getTables()
  const validFields: {
    validField: string[]
    placeHolder: string
    originalField: string
  }[] = []

  fields.map((field) => {
    if (schema[table] && schema[table].columns[field]) {
      const ref = schema[table].columns[field]
      const thisField = {
        validField: [],
        placeHolder: '',
        originalField: ''
      }
      if (
        aliases &&
        aliases[ref.refTable] &&
        schema[ref.refTable] &&
        schema[ref.refTable].columns[ref.displayAs]
      ) {
        thisField.validField.push(aliases[ref.refTable], ref.displayAs)
        thisField.placeHolder = '??.??'
        thisField.originalField = field
      } else if (aliases && aliases[table]) {
        thisField.validField.push(aliases[table], field)
        thisField.placeHolder = '??.??'
        thisField.originalField = field
      } else if (aliases && !aliases[table]) {
        return false
      } else {
        thisField.validField.push(field)
        thisField.placeHolder = '??'
        thisField.originalField = field
      }
      validFields.push(thisField)
    }
  })
  return validFields
}
