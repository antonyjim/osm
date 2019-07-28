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

export type FormValue = string | boolean | number

export interface IFormDetails {
  title: string
  table?: string
  primaryKey: string
  tabs: { [tabId: string]: IFormTab }
}

export interface ITableField {
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

export interface IFormTab {
  title: string
  name: string
  primaryKey: string
  fields: {
    [fieldId: string]: ITableField
  }
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
  permissions?: {
    create: boolean
    delete: boolean
    edit: boolean
    read: boolean
  }
}

export interface ISerializedFormControl {
  component: any
  props: {
    label: string
    id?: string
    name: string
    onChange: React.ChangeEventHandler
    value: FormValue
    display?: string
    className?: string
    references?: string
    checked?: boolean | string
    maxLength?: number
  }
}
