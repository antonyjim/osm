/**
 * src/lib/ql/forms/forms.ts
 * Provide a translation of the raw sys_form data
 * for the <Form /> Component
 */

// Node Modules

// NPM Modules
import { v4 as uuid } from 'uuid'

// Local Modules
import { getTables } from './constructSchema'
import Towel from '../../towel'
import { simpleQuery } from '../../connection'

// Constants and global variables
let forms = null

export default function getForm(table) {
  if (forms && forms.hasOwnProperty('sys_form')) return forms[table]
  else constructForms()
}

export async function constructForms() {
  // Attempt to get forms from the sys_form table
  const allForms = {}
  const customForms = await new Towel({
    table: 'sys_form',
    fields: [
      'sys_id',
      'form_id',
      'tab_name',
      'tab_title',
      'table_ref',
      'table_args',
      'field_name',
      'form_name'
    ]
  }).get()

  if (customForms && customForms.data && customForms.data.length !== 0) {
    console.log('Fetched form')
    return
  }
  const allTables = getTables()
  console.log('[FORM_GENERATOR] Got Tables')
  for (const table of Object.keys(allTables)) {
    const initialFormId = uuid()
    const title = await new Towel({
      table: 'sys_db_object',
      fields: ['plural']
    }).get({ id: allTables[table].tableId })
    const theseCols = []
    for (const col in allTables[table].columns) {
      if (
        allTables[table].columns[col] &&
        (allTables[table].columns[col].visible ||
          col === allTables[table].primaryKey)
      ) {
        const thisCol = allTables[table].columns[col]
        thisCol.name = col || ''
        theseCols.push(thisCol)
        const fieldId = await simpleQuery(
          'SELECT t1.sys_id AS id FROM sys_db_dictionary t1 LEFT JOIN sys_db_object t2 ON t1.table_name = t2.sys_id WHERE t2.name = ? AND t1.column_name = ? LIMIT 1',
          [table, col]
        )
        const initialForm = [
          uuid(), // sys_id
          initialFormId, // form_id
          table, // form_name
          'general_information', // tab_name
          'General Information', // tab_title
          null, // table_ref
          null, // table_args,
          fieldId[0].id // field_name
        ]
        simpleQuery('INSERT INTO sys_form VALUES ?', [[initialForm]])
        console.log(initialForm)
      }
    }

    allForms[table] = {
      title: title.plural || '',
      tabs: [
        {
          title: 'General Information',
          name: 'General',
          primaryKey: allTables[table].primaryKey,
          fields: theseCols
        }
      ]
    }
  }

  forms = allForms
}
