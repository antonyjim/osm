import constructSchema, { getTables } from './constructSchema'
import { getPool, simpleQuery } from '../../connection'
import { inspect } from 'util'
import { v4 as uuid } from 'uuid'

export function rawGen() {
  console.log('Generating right now')
  constructSchema()
    .then((tables) => {
      console.log('Completed bulding schema')
      ;(async () => {
        const allTables = await simpleQuery(
          "SHOW TABLES WHERE Tables_in_thq LIKE 'sys%' AND NOT Tables_in_thq like '%_list'"
        )
        const formattedTables = []
        const flaggedKeyFields = []
        allTables.map((table) => {
          const tableName = table.Tables_in_thq
          if (tables[tableName] && tables[tableName].tableId !== '') {
            console.log(
              'Table %s already exists in table schema with %s',
              tableName,
              inspect(tables[tableName], false, 1)
            )
            return
          } else {
            console.log('Table %s does not exist in current schema', tableName)
            createTableIfNotExists(tableName)
              .then((tableId) => {
                simpleQuery('DESCRIBE ??', [tableName]).then((columns) => {
                  console.log(columns)
                  const theseColumns = []
                  let hasSetDisplay = false
                  columns.map((col, i) => {
                    let displayField = false
                    if (col.Field !== 'sys_id' && hasSetDisplay === false) {
                      displayField = true
                      hasSetDisplay = true
                    }

                    if (col.Key === 'MUL')
                      flaggedKeyFields.push({
                        table: tableName,
                        field: col.Field
                      })

                    theseColumns.push([
                      uuid(), // sys_id
                      null, // reference_id
                      col.Field, // column_name,
                      true, // visible
                      false, // admin_view
                      false, // readonly
                      col.Null === 'NO' ? true : false, // nullable
                      col.Field, // label
                      null, // hint
                      parseType(col.Type).dataType.toUpperCase(), // type
                      parseType(col.Type).dataLength, // len
                      col.Default, // default_value
                      true, // required_on_create
                      false, // required_on_update
                      tableId, // table_name
                      true, // default_view
                      col.Key === 'PRI' ? true : false, // update_key
                      100, // col_order
                      null, // enum
                      displayField // display_field
                    ])
                  })

                  simpleQuery('INSERT INTO sys_db_dictionary VALUES ?', [
                    theseColumns
                  ])
                })
              })
              .catch((err) => {
                console.error(err)
              })
          }
        })
      })()
    })
    .catch((err) => {
      console.error(
        `[CONSTRUCT_SCHEMA] CRITICAL ERROR WHEN STARTING SERVER ${err.message}`
      )
      getPool().end()
    })

  function parseType(sqlType: string) {
    function getLen(type) {
      const len = parseInt(type.match(/[^\(\)]+(?=\))/g)[0], 10)
      if (isNaN(len)) {
        return 0
      } else {
        return len
      }
    }

    const returnType = {
      dataType: 'tinyint',
      dataLength: 0
    }
    const switchVal = sqlType.slice(0, 3)
    switch (switchVal) {
      case 'cha': {
        returnType.dataType = sqlType.slice(0, 4)
        returnType.dataLength = getLen(sqlType)
        break
      }
      case 'var': {
        returnType.dataType = sqlType.slice(0, 7)
        returnType.dataLength = getLen(sqlType)
        break
      }
      case 'int': {
        returnType.dataType = sqlType.slice(0, 3)
        returnType.dataLength = getLen(sqlType)
        break
      }
      case 'big': {
        returnType.dataType = sqlType.slice(0, 6)
        returnType.dataLength = getLen(sqlType)
        break
      }
      case 'tex': {
        returnType.dataType = sqlType.slice(0, 4)
        returnType.dataLength = 65535
        break
      }
      case 'blo': {
        returnType.dataType = sqlType.slice(0, 4)
        returnType.dataLength = 65535
        break
      }
      case 'tin': {
        returnType.dataType = 'boolean'
        break
      }
      default: {
        returnType.dataType = sqlType
      }
    }
    return returnType
  }
}

async function createTableIfNotExists(tableName) {
  const table = await simpleQuery(
    'SELECT sys_id FROM sys_db_object where name = ?',
    [tableName]
  )
  if (table) {
    return table[0].sys_id
  } else {
    const id = uuid()
    const status = await simpleQuery('INSERT INTO sys_db_object VALUES (?)', [
      [id, tableName, tableName, null, null]
    ])
    return id
  }
}
