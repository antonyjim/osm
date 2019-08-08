// allForms[table] = {
//   title: title.plural || '',
//   tabs: [
//     {
//       title: 'General Information',
//       name: 'General',
//       primaryKey: allTables[table].primaryKey,
//       fields: theseCols
//     }
//   ]
// }

export type GenericFieldTypes = boolean | string | number

export interface IFormDetails {
  title: string
  table: string
  tabs: { [tabId: string]: IFormTab }
}

export interface ITableField {
  columnName?: string
  label: string
  maxLength?: number
  nullable?: boolean
  readonly?: boolean
  refTable?: string
  localRef?: string
  reference?: string
  requiredCreate?: boolean
  requiredUpdate?: boolean
  displayAs?: string
  type: string
  visible: boolean
}

export interface ISysForm {
  sys_id: string
  form_name: string
  table_reference?: string
}

export interface ISysFormTab {
  sys_id: string
  form_id: string
  tab_name: string
  tab_title: string
  table_ref?: string
  table_args?: string
  fields?: string
  custom_component?: string
}

export interface ISysFormBody {
  sys_id: string
  tab_id: string
}

export interface IFormTab {
  title: string
  name: string
  // PrimaryKey is what is used for the match.params.id
  // It is also what gets passed as the parameter when
  // making any changes to a row
  primaryKey?: string
  fields?: {
    [fieldId: string]: ITableField
  }

  // It is possible for tabs to have custom components (ie Not a simple table or form)
  // In that case, customComponent will have a url string pointing to the script
  // to load the component from.
  customComponent?: string

  // In the event the tab is a reference table, these fields will be used to
  // render the table in the ui
  table?: {
    name: string
    args: string
  }
}

export interface ITableSchema {
  columns: { [id: string]: ITableField }
  defaultFields: string[]
  displayField: string
  primaryKey: string
  tableId: string
  readRole?: string
  editRole?: string
  deleteRole?: string
  permissions?: {
    create: boolean
    delete: boolean
    edit: boolean
    read: boolean
  }
}
