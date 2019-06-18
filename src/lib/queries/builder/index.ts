import { getTables } from '../../model/constructSchema'

export function queryBuilder(tableName: string, fields: string[] | string) {
  const warnings = []
  const schema = getTables()
  const tableCols = schema[tableName].columns
  const validFields = []
  const fieldPlaceholders = []
  const tableAliases = {} // Every table gets it's own alias, something like `sys_user` `t1`
  const baseStatement = 'SELECT '
  const tableParams = []
  const leftJoin = ' LEFT JOIN ?? ?? ON ??.?? = ??.?? '
  let tableAliasIndex = 1
  let fromStatement = ' FROM '
  let fieldArr
  if ((fields && fields[0] === '*') || !fields) {
    fieldArr = schema[tableName].defaultFields
  } else if (!Array.isArray(fields) || fields.length === 0) {
    if (fields && fields.length > 0 && typeof fields === 'string') {
      fieldArr = fields.split(',')
    } else {
      fieldArr = schema[tableName].defaultFields
    }
  } else fieldArr = fields

  fieldArr.map((qField) => {
    const refCol = tableCols[qField]
    if (validFields.includes(qField)) return false // Prevent duplicate fields in queries
    if (refCol) {
      if (!refCol.localRef && !tableAliases[tableName]) {
        tableAliases[tableName] = `t${tableAliasIndex}` // Add the table to aliases
        fromStatement += ' ?? ?? ' // Provide for table alias e.g. `sys_user` `t1`
        tableParams.push(tableName, `t${tableAliasIndex}`) // Add params to field substution
        validFields.push(tableAliases[tableName], qField) // Add field value to params with alias
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
        validFields.push(alias, refCol.displayAs, qField)
        fieldPlaceholders.push('??.?? AS ??')
      } else {
        validFields.push(tableAliases[tableName], qField)
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
    params: Array.prototype.concat(validFields, tableParams),
    aliases: tableAliases,
    countField: validFields[1],
    warnings
  }
}
