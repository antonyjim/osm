import { IFileUpload, IDatabaseFolderStructure } from '../types/files'
import { simpleQuery } from '../../../../lib/queries'
import { v4 as uuid } from 'uuid'
import {
  CustomComponentLoader,
  ICustomComponentInfo
} from '../../customComponentLoader'

/**
 * Inserts a new file into the database
 * @param file File information to insert into sys_component_file
 */
export function createCustomComponentFile(file: IFileUpload): Promise<string> {
  return new Promise(
    (resolveCreatedComponentFile, rejectCreatedComponentFile) => {
      if (!file.fileName) {
        return rejectCreatedComponentFile(
          new Error('No file name provided for new component!')
        )
      } else if (!file.fileType) {
        file.fileType = 'application/typescript'
      } else if (!file.purpose) {
        file.purpose = 'ts'
      } else if (!file.component) {
        rejectCreatedComponentFile(new Error('No component name provided!'))
      }

      // First we need to verify that the component actually exists
      CustomComponentLoader.getByName(file.component).then(
        (component: ICustomComponentInfo) => {
          if (component === null) {
            rejectCreatedComponentFile(
              new Error(
                'Component ' +
                  file.component +
                  ' was not found. Please add the component before continuing.'
              )
            )
          } else {
            simpleQuery(
              'SELECT sys_id FROM sys_component_file WHERE parent_component = ? AND file_name = ? AND file_path = ?',
              [component.sys_id, file.fileName, file.filePath]
            ).then((fileResults: IDatabaseFolderStructure[]) => {
              if (fileResults.length > 0) {
                rejectCreatedComponentFile(
                  new Error('Filename already exists.')
                )
              } else {
                const newSysId = uuid()
                simpleQuery(
                  'INSERT INTO sys_component_file (sys_id, parent_component, file_path, file_name, file_type, purpose, version_of, contents) VALUES (?)',
                  [
                    [
                      newSysId,
                      component.sys_id,
                      file.filePath,
                      file.fileName,
                      file.fileType,
                      file.purpose,
                      1,
                      file.fileContents
                    ]
                  ]
                )
                  .then((onInserted) => {
                    resolveCreatedComponentFile(newSysId)
                  })
                  .catch(rejectCreatedComponentFile)
              }
            })
          }
        }
      )
    }
  )
}
