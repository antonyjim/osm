import { simpleQuery } from '../../../lib/queries'

export interface IFileGetterWithRecord {
  file_name?: string
  referenced_table: string
  referenced_table_record: string
}

export interface IFileWithRecord {
  sys_id: string
  content_type: string
  file_name: string
  file_size: number
  referenced_table: string
  referenced_table_record: string
}

export interface IFileWithoutRecord {
  sys_id: string
  content_type: string
  file_name: string
  file_size: number
}

export function getFileList(
  file: IFileGetterWithRecord
): Promise<IFileWithRecord[]> {
  return simpleQuery(
    'SELECT sys_id, content_type, file_name, file_size FROM sys_attachment WHERE referenced_table = (\
      SELECT sys_id FROM sys_db_object WHERE name = ?\
      ) AND referenced_table_record = ?',
    [file.referenced_table, file.referenced_table_record]
  )
}

export function getFile(
  file: IFileGetterWithRecord
): Promise<IFileWithoutRecord | IFileWithRecord> {
  if (file.referenced_table && file.referenced_table_record && file.file_name) {
    return simpleQuery(
      'SELECT sys_id, content_type, file_name, file_size, file_contents FROM sys_attachment where referenced_table = (\
        SELECT sys_id FROM sys_db_object WHERE name = ?\
        ) AND referenced_table_record = ? AND file_name = ?',
      [file.referenced_table, file.referenced_table_record, file.file_name]
    )
  } else {
    return simpleQuery(
      'SELECT sys_id, content_type, file_name, file_size, file_contents FROM sys_attachment WHERE referenced_table IS NULL AND referenced_table_record IS NULL AND file_name = ?',
      [file.file_name]
    )
  }
}

/**
 * Resolves a list of files with no relation to any tables.
 * @param {string} path Optionally provide a path to filter files
 */
export function getAllFiles(path?: string): Promise<IFileWithoutRecord[]> {
  let query: string =
    'SELECT sys_id, content_type, file_name, file_size FROM sys_attachment WHERE referenced_table IS NULL AND referenced_table_record IS NULL'
  const params: string[] = []

  if (path) {
    query += ' AND file_name LIKE ?%'
    params.push(path)
  }

  return simpleQuery(query, params)
}
