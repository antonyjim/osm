import { simpleQuery } from '../../lib/queries'

export interface ICustomComponentInfo {
  sys_id: string
  name: string
  title?: string
  metadata?: any
  version_of?: number
}

export class CustomComponentLoader {
  public static getByName(name: string): Promise<ICustomComponentInfo> {
    return new Promise(
      (resolveCustomComponentInfo, rejectCustomComponentInfo) => {
        if (!name) {
          rejectCustomComponentInfo(
            new Error('No Name provided to CustomComponentLoader.getByName!')
          )
        }

        simpleQuery(
          'SELECT sys_id, name, title FROM sys_component WHERE name = ?',
          [name]
        )
          .then((results: ICustomComponentInfo[]) => {
            if (results.length === 0) {
              resolveCustomComponentInfo(null)
            } else {
              resolveCustomComponentInfo(results[0])
            }
          })
          .catch(rejectCustomComponentInfo)
      }
    )
  }
}
