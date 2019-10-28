import { getTables } from '@app/model/constructSchema'
import { ITableField, ITableSchema } from '@osm/forms'
import { IDictionary } from '@osm/server'

/**
 * Build a SELECT query based on the provided arguments
 * @param tableName Name of table being queried
 * @param fields Fields being queried
 */
export function queryBuilder(tableName: string, fields: string[] | string) {
  const warnings = []
  const schema: ITableSchema = <ITableSchema>getTables(tableName)
  const tableCols: IDictionary<ITableField> = schema.columns
  const validFields: string[] = []
  const fieldPlaceholderValues: string[] = []
  const fieldPlaceholders: string[] = []
  const tableAliases: { [id: string]: string } = {} // Every table gets it's own alias, something like `sys_user` `t1`
  const baseStatement: string = 'SELECT '
  const tableParams: string[] = []
  const leftJoin: string = ' LEFT JOIN ?? ?? ON ??.?? = ??.?? '
  let tableAliasIndex: number = 1
  let fromStatement: string = ' FROM ?? ?? '
  let fieldArr: string[]
  if ((fields && fields[0] === '*') || !fields) {
    fieldArr = schema.defaultFields
  } else if (!Array.isArray(fields) || fields.length === 0) {
    if (fields && fields.length > 0 && typeof fields === 'string') {
      fieldArr = fields.split(',')
    } else {
      fieldArr = schema.defaultFields
    }
  } else fieldArr = fields

  tableAliases[tableName] = `t${tableAliasIndex}`
  tableAliasIndex++
  tableParams.push(tableName, tableAliases[tableName])

  fieldArr.forEach((qField: string) => {
    const refCol: ITableField = tableCols[qField]
    if (validFields.includes(qField)) return false // Prevent duplicate fields in queries
    if (refCol) {
      if (!refCol.visible) {
        return false
      }
      if (!refCol.localRef && !tableAliases[tableName]) {
        tableAliases[tableName] = `t${tableAliasIndex}` // Add the table to aliases
        fromStatement += ' ?? ?? ' // Provide for table alias e.g. `sys_user` `t1`
        tableParams.push(tableName, `t${tableAliasIndex}`) // Add params to field substution
        validFields.push(qField)
        fieldPlaceholderValues.push(tableAliases[tableName], qField) // Add field value to params with alias
        tableAliasIndex++
        fieldPlaceholders.push('??.??')
      } else if (refCol.localRef && refCol.refTable) {
        const alias = `t${tableAliasIndex}`
        if (!tableAliases[refCol.refTable]) {
          tableAliases[refCol.refTable] = alias
        }
        tableAliasIndex++

        fromStatement += leftJoin // Add the join statement, which requires 6 params
        /*
          Params required for joins:
            1. Name of the table that is being joined
            2. Alias of the table being joined
            3. Alias of the table on the left of the join
            4. Column from the table on the left of the join
            5. Alias of table being joined (same as 2)
            6. Column of the table being joined
        */
        tableParams.push(
          refCol.refTable,
          alias,
          tableAliases[tableName],
          refCol.localRef,
          alias,
          refCol.reference
        )

        /*
          Params required for the select part of the query:
            1. table alias of table being joined
            2. column from joined table
            3. alias for this column
        */
        validFields.push(qField)
        fieldPlaceholderValues.push(
          alias,
          refCol.displayAs,
          qField + '_display',
          alias,
          (<ITableSchema>getTables(refCol.refTable)).primaryKey,
          qField
        )
        fieldPlaceholders.push('??.?? AS ??', '??.?? AS ??')
      } else {
        // When the table has already been added to tableAliases,
        // all we have to do are add the query fields
        validFields.push(qField)
        fieldPlaceholderValues.push(tableAliases[tableName], qField)
        fieldPlaceholders.push('??.??')
      }
    } else {
      warnings.push({
        message: `Column "${qField}" does not exist on table "${tableName}"`
      })
    }
  })

  return {
    query: `${baseStatement} ${fieldPlaceholders.join(', ')} ${fromStatement}`,
    params: Array.prototype.concat(fieldPlaceholderValues, tableParams),
    aliases: tableAliases,
    countField: fieldPlaceholderValues[1],
    warnings
  }
}
