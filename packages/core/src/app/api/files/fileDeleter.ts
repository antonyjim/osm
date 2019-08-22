import { IFileGetterWithRecord } from './fileGetter'
import { simpleQuery } from '../../../lib/queries'

function executeDelete(sysId: string) {
  return new Promise((resolve, reject) => {
    simpleQuery('DELETE sys_attachment WHERE sys_id = ?', [sysId])
      .then(resolve)
      .catch(reject)
  })
}

export function deleteFile(file: IFileGetterWithRecord) {
  return new Promise((resolve, reject) => {
    if (
      file.referenced_table &&
      file.referenced_table_record &&
      file.file_name
    ) {
      simpleQuery(
        'SELECT sys_id FROM sys_attachment where referenced_table = (\
        SELECT sys_id FROM sys_db_object WHERE name = ?\
        ) AND referenced_table_record = ? AND file_name = ?',
        [file.referenced_table, file.referenced_table_record, file.file_name]
      )
        .then((results) => {
          if (results.length > 0) {
            reject(new Error('Multiple files matched.'))
          } else if (results.length === 0) {
            reject(new Error('Could not locate file'))
          } else {
            executeDelete(results[0].sys_id)
              .then(resolve)
              .catch(reject)
          }
        })
        .catch(reject)
    } else {
      simpleQuery(
        'SELECT sys_id FROM sys_attachment where referenced_table IS NULL AND referenced_table_record IS NULL AND file_name = ?',
        [file.file_name]
      )
        .then((results) => {
          if (results.length > 0) {
            reject(new Error('Multiple files matched.'))
          } else if (results.length === 0) {
            reject(new Error('Could not locate file'))
          } else {
            executeDelete(results[0].sys_id)
              .then(resolve)
              .catch(reject)
          }
        })
        .catch(reject)
    }
  })
}
