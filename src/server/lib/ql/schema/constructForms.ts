/**
 * src/lib/ql/forms/forms.ts
 * Provide a translation of the raw sys_form data
 * for the <Form /> Component
 */

// Node Modules

// NPM Modules

// Local Modules
import { getTables } from './constructSchema'
import Towel from '../../towel'

// Constants and global variables
let forms = {}

export default function getForm(table) {
  if (forms) return forms[table]
  else constructForms()
}

export function constructForms(): void {
  ;(async () => {
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

    if (customForms && customForms.data && customForms.data.sys_form) {
      console.log('Fetched form')
    } else {
      for (const table of getTables()) {
        const title = await new Towel({
          table: 'sys_db_object',
          fields: ['plural']
        }).get({ id: table.tableId })
        const theseCols = []
        for (const col in table.columns) {
          if (
            table.columns[col] &&
            (table.columns[col].visible || col === table.primaryKey)
          ) {
            const thisCol = table.columns[col]
            thisCol.name = col || ''
            theseCols.push(thisCol)
          }
        }
        allForms[table] = {
          title: title.plural || '',
          tabs: [
            {
              title: 'General Information',
              name: 'General',
              primaryKey: table.primaryKey,
              fields: theseCols
            }
          ]
        }
      }
    }

    forms = allForms
  })()
}
