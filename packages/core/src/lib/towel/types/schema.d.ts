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

export interface IDatabaseSchema {
  database?: string
  tables?: {
    [tableName: string]: ITableSchema
  }
}

export interface IDictionary<T> {
  [key: string]: T
}
