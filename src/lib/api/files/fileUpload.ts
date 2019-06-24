/**
 * Here we need to process file uploads and store them in sys_attachment
 */

import * as Formidable from 'formidable'
import { IFileUpload } from '../../../types/server'
import { TowelRecord } from '../../queries/towel/towelRecord'
import Towel from '../../queries/towel/towel'
import { simpleQuery } from '../../queries'
import { resolve } from 'url'
import { v4 as uuid } from 'uuid'

function verifyUnique(file: IFileUpload) {
  return new Promise((resolveUnique, rejectUnique) => {
    if (file.referenced_table) {
      simpleQuery(
        'SELECT file_name FROM sys_attachment WHERE referenced_table = ? AND referenced_table_record = ? AND file_name_upper = ?',
        [
          file.referenced_table,
          file.referenced_table_record,
          file.file_name.toUpperCase()
        ]
      )
        .then((results) => {
          if (results.length > 0) {
            file.file_name = file.file_name + '_copy'
            verifyUnique(file).then((uniqueFile) => {
              resolveUnique(uniqueFile)
            })
          } else {
            resolveUnique(file)
          }
        })
        .catch(rejectUnique)
    } else {
      simpleQuery(
        'SELECT file_name FROM sys_attachment WHERE referenced_table IS NULL AND referenced_table_record IS NULL AND file_name_upper = ?',
        [file.file_name.toUpperCase()]
      )
        .then((results) => {
          file.referenced_table = null
          file.referenced_table_record = null
          if (results.length > 0) {
            file.file_name = file.file_name + '_copy'
            verifyUnique(file).then((uniqueFile) => {
              resolveUnique(uniqueFile)
            })
          } else {
            resolveUnique(file)
          }
        })
        .catch(rejectUnique)
    }
  })
}

/**
 * Insert files into the sys_attachment table
 * @param files Array of file objects to upload
 */
export function storeIncomingFile(files: IFileUpload[]) {
  if (!Array.isArray(files)) {
    files = [files]
  }
  return files.map((file) => {
    return new Promise((resolveCreated, reject) => {
      if (!file.referenced_table && file.referenced_table_record) {
        reject(
          new Error(
            'Reference table is required if unique record id is passed. Received record id ' +
              file.referenced_table_record +
              ' and table ' +
              file.referenced_table
          )
        )
      } else if (file.referenced_table && !file.referenced_table_record) {
        reject(
          new Error(
            'Unique record ID is required if referenced table is passed. Received table ' +
              file.referenced_table +
              ' and record id ' +
              file.referenced_table_record
          )
        )
      } else {
        // Now we have one of 2 scenarios:
        // 1. An anonymous file upload, in which case we will enforce a unique constraint
        // on the file name with the rest of the database where referenced_table == null
        //
        // 2. A file with a reference to another record
        verifyUnique(file)
          .then((uniqueFile: IFileUpload) => {
            const newSysId = uuid()
            simpleQuery(
              'INSERT INTO sys_attachment (sys_id, content_type, referenced_table, referenced_table_record, file_name, file_name_upper, file_size, file_contents)\
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
              [
                newSysId,
                uniqueFile.content_type,
                uniqueFile.referenced_table,
                uniqueFile.referenced_table_record,
                uniqueFile.file_name,
                uniqueFile.file_name.toUpperCase(),
                uniqueFile.file_size,
                uniqueFile.file_contents
              ]
            )
              .then((onInsert) => {
                if (uniqueFile.referenced_table) {
                  resolveCreated(
                    '/api/sys_attachment/' +
                      uniqueFile.referenced_table +
                      '/' +
                      uniqueFile.referenced_table_record +
                      '/' +
                      uniqueFile.file_name
                  )
                } else {
                  resolveCreated(
                    '/api/sys_attachment/anonymous/' + uniqueFile.file_name
                  )
                }
              })
              .catch(reject)
          })
          .catch(reject)
      }
    })
  })
}
