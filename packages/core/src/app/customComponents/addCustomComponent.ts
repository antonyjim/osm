import { ICustomComponentInfo } from './customComponentLoader'
import { v4 as uuid } from 'uuid'
import { Validation } from '../../lib/validation'
import { simpleQuery } from '../../lib/queries'

/**
 * src/lib/customComponents/addCustomComponent.ts
 */

export function addCustomComponent(
  componentInfo: ICustomComponentInfo
): Promise<string> {
  return new Promise(
    (resolveAddedCustomComponent, rejectAddedCustomComponent) => {
      if (!componentInfo.sys_id) {
        componentInfo.sys_id = uuid()
      }

      const validFields: ICustomComponentInfo = new Validation(
        componentInfo
      ).notEmpty(['name', 'title', 'sys_id'], 1)

      if (!validFields) {
        rejectAddedCustomComponent(new Error('Missing required fields'))
      }

      simpleQuery(
        'INSERT INTO sys_component (sys_id, name, title) VALUES (?, ?, ?)',
        [validFields.sys_id, validFields.name, validFields.title]
      )
        .then((onInserted) => {
          resolveAddedCustomComponent(componentInfo.sys_id)
        })
        .catch(rejectAddedCustomComponent)
    }
  )
}
