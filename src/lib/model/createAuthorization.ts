import { simpleQuery } from '../queries'
import { v4 as uuid } from 'uuid'

function insertDefaults(tableId: string): Promise<string> {
  return new Promise((resolveInsertedDefaults, rejectInsertedDefaults) => {
    const insertionQuery =
      'INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const insertionValues = [
      'sys_authorization',
      'sys_id',
      'auth_priv',
      'auth_table',
      'auth_can_create',
      'auth_can_read',
      'auth_can_edit',
      'auth_can_delete',
      'auth_can_read_own',
      'auth_can_edit_own',
      'auth_can_delete_own',
      'auth_can_create_own',
      // VALUES
      uuid(),
      '6', // Yeah yeah, magic numbers and all
      tableId,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ]
    simpleQuery(insertionQuery, insertionValues)
      .then(() => {
        resolveInsertedDefaults(tableId)
      })
      .catch(rejectInsertedDefaults)
  })
}

export function createDefaultAuthorizationSchema(
  tableId: string
): Promise<string> {
  return new Promise(
    (resolveCreatedDefaultAuthorization, rejectCreateDefaultAuthorization) => {
      simpleQuery(
        'SELECT DISTINCT auth_priv FROM sys_authorization WHERE auth_table = ?',
        [tableId]
      ).then((results: { auth_priv: string }[]) => {
        if (results.length === 0) {
          insertDefaults(tableId)
            .then(resolveCreatedDefaultAuthorization)
            .catch(rejectCreateDefaultAuthorization)
        } else {
          let hasAdminPrivilege = false
          results.forEach((priv) => {
            if (priv.auth_priv === '6') {
              hasAdminPrivilege = true
            }
          })
          if (!hasAdminPrivilege) {
            insertDefaults(tableId)
              .then(resolveCreatedDefaultAuthorization)
              .catch(rejectCreateDefaultAuthorization)
          } else {
            resolveCreatedDefaultAuthorization()
          }
        }
      })
    }
  )
}
