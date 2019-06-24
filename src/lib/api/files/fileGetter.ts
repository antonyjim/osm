import { simpleQuery } from '../../queries'

export interface IFileGetterWithRecord {
  file_name?: string
  referenced_table: string
  referenced_table_record: string
}

export function getFileList(file: IFileGetterWithRecord) {
  return new Promise((resolve, reject) => {
    simpleQuery(
      'SELECT sys_id, content_type, file_name, file_size FROM sys_attachment WHERE referenced_table = (\
      SELECT sys_id FROM sys_db_object WHERE name = ?\
      ) AND referenced_table_record = ?',
      [file.referenced_table, file.referenced_table_record]
    )
      .then(resolve)
      .catch(reject)
  })
}

export function getFile(file: IFileGetterWithRecord) {
  return new Promise((resolve, reject) => {
    if (
      file.referenced_table &&
      file.referenced_table_record &&
      file.file_name
    ) {
      simpleQuery(
        'SELECT sys_id, content_type, file_name, file_size, file_contents FROM sys_attachment where referenced_table = (\
        SELECT sys_id FROM sys_db_object WHERE name = ?\
        ) AND referenced_table_record = ? AND file_name = ?',
        [file.referenced_table, file.referenced_table_record, file.file_name]
      )
        .then(resolve)
        .catch(reject)
    } else {
      simpleQuery(
        'SELECT sys_id, content_type, file_name, file_size, file_contents FROM sys_attachment where referenced_table IS NULL AND referenced_table_record IS NULL AND file_name = ?',
        [file.file_name]
      )
        .then(resolve)
        .catch(reject)
    }
  })
}
