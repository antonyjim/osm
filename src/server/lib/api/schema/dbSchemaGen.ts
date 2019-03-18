import constructSchema, { getTables } from './constructSchema'
import { getPool, simpleQuery } from '../../connection'
import { inspect } from 'util'
import { v4 as uuid } from 'uuid'

export function syncDbSchema() {
  constructSchema() // Refresh the in-memory schema object
    .then((tables) => {
      ;(async () => {
        const allTables = await simpleQuery(
          "SHOW TABLES WHERE NOT Tables_in_thq LIKE '%_list'"
        )
        const formattedTables = []
        const flaggedKeyFields = []
        allTables.map((table) => {
          const tableName = table.Tables_in_thq
          // if (tables[tableName] && tables[tableName].tableId !== '') {
          //   console.log(
          //     'Table %s already exists in table schema with %s',
          //     tableName,
          //     inspect(tables[tableName], false, 1)
          //   )

          //   return
          // } else {
          //   console.log('Table %s does not exist in current schema', tableName)
          createTableIfNotExists(tableName)
            .then((tableId) => {
              simpleQuery('DESCRIBE ??', [tableName]).then((columns) => {
                console.log(columns)
                const theseColumns = []
                let hasSetDisplay = false
                columns.map((col, i) => {
                  if (tables[tableName].columns[col.Field]) {
                    console.log('Column %s already defined', col)
                    return // Column already defined
                  } else {
                    let displayField = false
                    if (col.Field !== 'sys_id' && hasSetDisplay === false) {
                      displayField = true
                      hasSetDisplay = true
                    }

                    if (col.Key === 'MUL') {
                      flaggedKeyFields.push({
                        table: tableName,
                        field: col.Field
                      })
                    }

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
                  }
                })

                if (theseColumns.length > 0) {
                  simpleQuery('INSERT INTO sys_db_dictionary VALUES ?', [
                    theseColumns
                  ])
                }
              })
            })
            .catch((err) => {
              console.error(err)
            })
          // }
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
        returnType.dataLength = null
        break
      }
      default: {
        returnType.dataType = sqlType
        returnType.dataLength = null
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
    // const id = uuid()
    // await simpleQuery('INSERT INTO sys_db_object VALUES (?)', [
    //   [id, tableName, tableName, null, null]
    // ])
    const tableInfo = await simpleQuery(`CALL create_table(?, ?)`, [
      tableName,
      uuid
    ])
    return tableInfo[0].sys_id
  }
}
