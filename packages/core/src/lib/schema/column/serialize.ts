const Types = {
  DECIMAL: 'DECIMAL',
  TINY: 'TINYINT',
  SHORT: 'SMALLINT',
  INT: 'INT',
  FLOAT: 'FLOAT',
  DOUBLE: 'DOUBLE',
  NULL: 'NULL',
  TIMESTAMP: 'TIMESTAMP',
  LONGLONG: 'BIGINT',
  INT24: 'MEDIUMINT',
  DATE: 'DATE',
  TIME: 'TIME',
  DATETIME: 'DATETIME',
  YEAR: 'YEAR',
  NEWDATE: 'NEWDATE',
  BIT: 'BIT',
  TIMESTAMP2: 'TIMESTAMP2',
  DATETIME2: 'DATETIME2',
  TIME2: 'TIME2',
  JSON: 'JSON',
  NEWDECIMAL: 'DECIMAL',
  ENUM: 'ENUM',
  SET: 'SET',
  TINY_BLOB: 'TINYBLOB',
  MEDIUM_BLOB: 'MEDIUMBLOB',
  LONG_BLOB: 'LONGBLOB',
  BLOB: 'BLOB',
  TINY_TEXT: 'TINYTEXT',
  MEDIUM_TEXT: 'MEDIUMTEXT',
  LONG_TEXT: 'LONGTEXT',
  TEXT: 'TEXT',
  VAR_STRING: 'VARCHAR',
  STRING: 'CHAR',
  CHAR: 'CHAR',
  VARCHAR: 'VARCHAR',
  BINARY: 'BINARY',
  GEOMETRY: 'GEOMETRY',
  BOOLEAN: 'BOOLEAN'
}

export enum ForeignKeyActions {
  CASCADE = 'CASCADE',
  RESTRICT = 'RESTRICT'
}

export enum ColumnAttributes {
  UNIQUE = 'UNIQUE',
  NOT_NULL = 'NOT NULL',
  AUTO_INCREMENT = 'AUTO_INCREMENT',
  INDEX = 'INDEX'
}

interface IColumnReference {
  table: string
  column: string
  onDelete: ForeignKeyActions
  onUpdate: ForeignKeyActions
}

export interface IColumnDefinition {
  nameType: {
    value: string
    params: (number | string | boolean | Date)[]
  }
  reference?: {
    value: string
    params: string[]
  }
  index?: {
    value: string
    params: string[]
  }
}

export interface IColumn {
  name: string
  type: string
  length?: number
  default?: number | string | boolean | Date
  reference?: IColumnReference
  attributes?: ColumnAttributes[]
}

const requiredLengths: string[] = [
  Types.BINARY,
  Types.VAR_STRING,
  Types.STRING,
  Types.CHAR,
  Types.VARCHAR
]

const maxLengths: number[] = [255, 65532, 255, 255, 65532]

const reservedWords = [
  'CREATE',
  'DELETE',
  'SELECT',
  'INSERT',
  'INTO',
  'LENGTH',
  'DROP',
  'USE',
  'ALTER',
  'TABLE',
  'DATABASE'
]

/**
 * Returns an object containing the column
 * definition, and foreign key info. Also
 * returns an array of placeholder values to
 * be used when mysql.query is called.
 * @param column Column info
 */
export function stringifySqlColumn(column: IColumn): IColumnDefinition {
  column.type = column.type.toUpperCase()
  const columnAttributeProcessors = {
    UNIQUE() {
      if (column.attributes.includes(ColumnAttributes.INDEX)) {
        colDefinition.nameType.value += ' UNIQUE '
        return
      }
      colDefinition.nameType.value += ' UNIQUE '
      colDefinition.index.value += ' INDEX(??) '
      colDefinition.index.params.push(column.name)
      return
    },
    'NOT NULL'() {
      colDefinition.nameType.value += ' NOT NULL '
      return
    },
    INDEX() {
      colDefinition.index.value += ' INDEX(??) '
      colDefinition.index.params.push(column.name)
      return
    },
    AUTO_INCREMENT() {
      if (![Types.INT, Types.LONGLONG].includes(Types[column.type])) {
        throw new Error(
          'AUTO_INCREMENT can only be applied to INT and BIGINT types, got: ' +
            Types[column.type]
        )
      }
      if (column.attributes.includes(ColumnAttributes.INDEX)) {
        colDefinition.nameType.value += ' AUTO_INCREMENT '
        return
      }
      colDefinition.nameType.value += ' AUTO_INCREMENT '
      colDefinition.index.value += ' INDEX(??) '
      colDefinition.index.params.push(column.name)
    }
  }

  const colDefinition: IColumnDefinition = {
    nameType: {
      value: `?? ${Types[column.type]}`,
      params: [column.name]
    },
    index: {
      value: '',
      params: []
    },
    reference: {
      value: '',
      params: []
    }
  }

  const requiredLength = requiredLengths.indexOf(column.type)

  if (!column.name || typeof column.name !== 'string') {
    throw new Error('Invalid column name provided for column ' + column.name)
  } else if (column.name.length > 64) {
    throw new Error(
      'Column name too long. Max length of column is 64, got: ' +
        column.name.length
    )
  } else if (!/^[a-z_](?:[a-z0-9_])*$/i.test(column.name)) {
    throw new Error(
      'Column name must start with a letter or underscore and only contain letters, numbers and underscores got: ' +
        column.name
    )
  } else if (reservedWords.includes(column.name.toUpperCase())) {
    throw new Error(
      'Column name is an SQL reserved word: ' + column.name.toUpperCase()
    )
  }

  if (requiredLength > -1) {
    if (
      !column.length ||
      column.length > maxLengths[requiredLength] ||
      column.length < 1
    ) {
      throw new Error(
        'Invalid length for column ' + column.name + ' and type ' + column.type
      )
    } else {
      colDefinition.nameType.value += `(${column.length}) `
    }
  }

  if (!(column.type in Types)) {
    throw new Error('Invalid type provided for column ' + column.name)
  }

  if (column.attributes && column.attributes.length > 0) {
    for (const attr of column.attributes) {
      if (columnAttributeProcessors[attr]) {
        columnAttributeProcessors[attr]()
      }
    }
  }

  // Check if there is a default (typeof in case default = false)
  if (column.default || typeof column.default === 'boolean') {
    colDefinition.nameType.value += ' DEFAULT ? '
    colDefinition.nameType.params.push(column.default)
  }

  if (column.reference) {
    colDefinition.reference.value +=
      ' FOREIGN KEY(??) REFERENCES ??(??) ON DELETE ' +
      column.reference.onDelete +
      ' ON UPDATE ' +
      column.reference.onUpdate
    colDefinition.reference.params = [
      ...colDefinition.reference.params,
      column.name,
      column.reference.table,
      column.reference.column
    ]
  }

  return colDefinition
}
