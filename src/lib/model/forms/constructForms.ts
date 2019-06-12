/**
 * src/lib/ql/forms/forms.ts
 * Provide a translation of the raw sys_form data
 * for the <Form /> Component
 */

// Node Modules

// NPM Modules
import { v4 as uuid } from 'uuid'

// Local Modules
import { getTables } from '../constructSchema'
import Towel from '../../queries/towel/towel'
import { simpleQuery } from '../../connection'
import {
  IFormDetails,
  IFormTab,
  ISysForm,
  ISysFormTab
} from '../../../types/forms'
import { TowelRecord } from '../../queries/towel/towelRecord'
import { ITowelQueryResponse } from '../../../types/towelRecord'
import { handleError } from '../../utils'

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
  return new Promise((resolveFormCreation, rejectFormCreation) => {
    // Attempt to get forms from the sys_form table
    const allForms = {}

    // First we need to get the disinct list of forms from sys_form
    return new Promise((resolveFormList, rejectFormList) => {
      const formListQuery: string =
        'SELECT sys_id, form_name, form_title , form_args FROM sys_form'

      simpleQuery(formListQuery)
        .then(resolveFormList)
        .catch(rejectFormList)
    })
      .then((tableList: ISysForm[]) => {
        // Now that we have the list of tables, we need to find a list
        // of tabs from sys_form_tab
        return Promise.all([
          // The first element should be a list of tables
          tableList,
          ...tableList.map((table: ISysForm) => {
            const formDetailsQuery: string =
              'SELECT sys_id, form_id, tab_name, \
          tab_title, table_ref, table_args, fields, custom_component FROM sys_form_tab WHERE form_id = ?'
            const formDetailsParams: string[] = [table.sys_id]
            return simpleQuery(formDetailsQuery, formDetailsParams)
          })
        ])
      })
      .then(([tableList, ...formTabs]: [ISysForm[], ISysFormTab[]]) => {
        console.log(formTabs)
        return new Promise((resolve) => {
          tableList.forEach((table: ISysForm) => {
            allForms[table.form_name] = {
              title: table.form_name || '',
              tabs: []
            }

            formTabs.forEach((formTab) => {
              allForms[table.form_name].tabs.push(formTab[0])
            })
          })
          resolve([tableList, formTabs])
        })
      })
      .then(() => {
        const allTables = getTables()
        console.log('[FORM_GENERATOR] Got Tables')
        for (const table of Object.keys(allTables)) {
          if (!(table in allForms)) {
            const initialFormId = uuid()

            const initialForm: string[] | null = [
              initialFormId, // sys_id
              table, // form_name AKA Path
              allTables[table].tableId, // table_reference
              null // form_args
            ]
            simpleQuery('INSERT INTO sys_form VALUES ?', [[initialForm]]).catch(
              handleError
            )

            const fields = []
            Object.keys(allTables[table].columns).forEach((col) => {
              if (
                allTables[table].columns[col] &&
                (allTables[table].columns[col].visible ||
                  col === allTables[table].primaryKey)
              ) {
                const thisCol = allTables[table].columns[col]
                thisCol.label = col || ''
                fields.push(thisCol)
              }
            })

            const initialFormTab: string[] | null = [
              uuid(), // sys_id
              initialFormId, // form_id
              'general_information', // tab_name
              'General Information', // tab_title
              null, // table_ref
              null, // table_args
              JSON.stringify({
                fields
              }), // field
              null // custom_component
            ]

            simpleQuery('INSERT INTO sys_form_tab VALUES ?', [
              [initialFormTab]
            ]).catch(handleError)
          }
        }

        forms = allForms
        return resolveFormCreation(allForms)
      })
      .catch((err) => {
        console.error('[FORM_GENERATOR] Error gathering existing forms')
        console.error(err)
      })

    // const towel = new Towel('sys_form')
    // towel.setFields([
    //   'sys_id',
    //   'form_id',
    //   'tab_name',
    //   'tab_title',
    //   'table_ref',
    //   'table_args',
    //   'field_name',
    //   'form_name',
    //   'table_ref_display',
    //   'field_name_display'
    // ])
    // towel.setLimit(5000) // Yeah yeah, I probably should implement an infinite query. Sue me
    // let customForms: ITowelQueryResponse
    // try {
    //   customForms = await towel.get()
    // } catch (err) {
    //   console.error('[FORM_GENERATOR] Error when building forms %s', err.message)
    // }

    // if (customForms && customForms.data && customForms.data.length !== 0) {
    //   customForms.data.map((formDetail: IFormRow) => {
    //     // const tableName = formDetail.form_name
    //     serializeFormFromRow(formDetail)
    //   })
    // return
    // }
  })
}
