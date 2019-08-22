import { simpleQuery } from '../../../lib/queries'
import { ICustomComponentInfo } from '../customComponentLoader'

export function getCustomComponentDetails(
  componentName: string
): Promise<ICustomComponentInfo> {
  return new Promise(
    (resolveCustomComponentDetails, rejectCustomComponentDetails) => {
      if (!componentName) {
        rejectCustomComponentDetails(
          new Error('No component name provided to getCustomComponentDetails')
        )
      }

      simpleQuery(
        'SELECT sys_id, name, title, metadata, version_of FROM sys_component WHERE name = ?',
        [componentName]
      )
        .then((withDetails) => {
          if (withDetails.length > 0) {
            resolveCustomComponentDetails(withDetails[0])
          } else {
            rejectCustomComponentDetails(
              new Error('No components found with name of ' + componentName)
            )
          }
        })
        .catch(rejectCustomComponentDetails)
    }
  )
}
