import { simpleQuery } from '../../../../lib/queries'
import { getCustomComponentDetails } from '../getCustomComponentDetails'
import { ICustomComponentInfo } from '../../customComponentLoader'

export function getCustomComponentFile(
  filePath: string,
  fileName: string,
  componentName: string
) {
  return new Promise(
    (resolveGotCustomComponentFile, rejectGotCustomComponentFile) => {
      getCustomComponentDetails(componentName)
        .then((componentDetails: ICustomComponentInfo) => {
          return simpleQuery(
            'SELECT contents FROM sys_component_file WHERE file_path = ? AND file_name = ? AND parent_component = ?',
            [filePath, fileName, componentDetails.sys_id]
          )
        })
        .then((fileData: { contens: string }[]) => {
          if (fileData.length > 0) {
            resolveGotCustomComponentFile(fileData[0])
          } else {
            rejectGotCustomComponentFile(
              new Error('Could not locate component file')
            )
          }
        })
        .catch(rejectGotCustomComponentFile)
    }
  )
}
