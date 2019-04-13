/**
 * src/lib/ql/forms/forms.ts
 * Provide a translation of the raw sys_form data
 * for the <Form /> Component
 */

// Node Modules

// NPM Modules
import { v4 as uuid } from 'uuid'

// Local Modules
import { getTables } from '../schema/constructSchema'
import Towel from '../../queries/towel/towel'
import { simpleQuery } from '../../connection'
import { IFormDetails, IFormTab } from '../../../../types/forms'
import { TowelRecord } from '../../queries/towel/towelRecord'

// Constants and global variables
let forms: { [table: string]: IFormDetails } = {}

interface IFormRow {
  field_name: string
  form_id: string
  form_name: string
  sys_id: string
  tab_name: string
  tab_title: string
  table_args: string
  table_ref: string
  field_name_display: string
  table_ref_display: string
}

export default function getForm(table) {
  constructForms()
  if (forms && forms.hasOwnProperty('sys_form')) return forms[table]
  // else constructForms()
  else return {}
}

async function serializeFormFromRow(row: IFormRow) {
  const schema = getTables()
  const tab: IFormTab = {
    name: row.tab_name,
    title: row.tab_title,
    primaryKey: schema[row.form_name].primaryKey
  }
  if (row.table_ref && row.table_args) {
    tab.table = {
      name: row.table_ref_display,
      args: row.table_args
    }
  } else {
    if (!tab.fields) tab.fields = {}
    tab.fields[row.field_name_display] =
      schema[row.form_name].columns[row.field_name_display]
  }

  if (!forms[row.form_name]) {
    // At this point, the forms object for this table should be blank
    forms[row.form_name] = {
      title: row.form_name,
      table: row.form_name,
      tabs: {
        [row.tab_title]: tab
      }
    }
  } else if (forms[row.form_name].tabs) {
    // Now there are already tabs in existence,
    // so there is no need to re-declare title and table.

    if (row.tab_title) {
      // console.log(
      //   '[FORM_GENERATOR] Adding form tab %s to form %s',
      //   row.tab_name,
      //   row.form_name
      // )
      const thisTab: IFormTab = forms[row.form_name].tabs[row.tab_title]
      if (thisTab.fields && row.field_name) {
        const field = schema[row.form_name].columns[row.field_name_display]
        forms[row.form_name].tabs[row.tab_title].fields[
          row.field_name_display
        ] = field
      } else {
        forms[row.form_name].tabs[row.tab_title].table = {
          name: row.table_ref_display,
          args: row.table_args
        }
      }
    } else {
      console.log('[FORM_GENERATOR] Creating tab %s', row.tab_name)
    }
  } else {
    forms[row.form_name].tabs[row.tab_name].fields = {}
  }
}

export async function constructForms() {
  // Attempt to get forms from the sys_form table
  const allForms = {}
  const towel = new Towel('sys_form_back')
  towel.setFields([
    'sys_id',
    'form_id',
    'tab_name',
    'tab_title',
    'table_ref',
    'table_args',
    'field_name',
    'form_name',
    'table_ref_display',
    'field_name_display'
  ])
  towel.setLimit(5000) // Yeah yeah, I probably should implement an infinite query. Sue me
  const customForms = await towel.get()

  if (customForms && customForms.data && customForms.data.length !== 0) {
    customForms.data.map((formDetail: IFormRow) => {
      // const tableName = formDetail.form_name
      serializeFormFromRow(formDetail)
    })
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
        thisCol.label = col || ''
        theseCols.push(thisCol)
        const fieldId = await simpleQuery(
          'SELECT t1.sys_id AS id FROM sys_db_dictionary t1 LEFT JOIN sys_db_object t2 ON t1.table_name = t2.sys_id WHERE t2.name = ? AND t1.column_name = ? LIMIT 1',
          [table, col]
        )
        const initialForm: string[] | null = [
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
