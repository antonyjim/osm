import { IFolder, IFileUpload } from './types/files'
import { ICustomComponentInfo } from '../customComponentLoader'
import { v4 as uuid } from 'uuid'
import { readFileSync } from 'fs'
import { join } from 'path'
import { addCustomComponent } from '../addCustomComponent'
import { createCustomComponentFile } from './fileEditor/createFile'
import { getCustomComponentFileTree } from './fileExploder/getTree'

export function bootstrapNewCustomComponent(
  componentInfo: ICustomComponentInfo
): Promise<IFolder> {
  return new Promise(
    (resolveBootstrappedProject, rejectBootstrappedProject) => {
      // This is a good default project to get the designer off the ground
      componentInfo.sys_id = uuid()

      const bootstrappingFileStructure: IFileUpload[] = [
        {
          sysId: uuid(),
          fileName: 'router.tsx',
          filePath: '/client/view/',
          fileType: 'application/x-tsx',
          purpose: 'tsx',
          component: componentInfo.name,
          fileContents: readFileSync(
            join(
              __dirname,
              '../../../../resources/customComponents/bootstrapperTemplate/router.tsx'
            )
          ).toString()
        },
        {
          sysId: uuid(),
          fileName: 'entry.tsx',
          filePath: '/server/routes',
          fileType: 'application/x-typescript',
          purpose: 'ts',
          component: componentInfo.name,
          fileContents: readFileSync(
            join(
              __dirname,
              '../../../../resources/customComponents/bootstrapperTemplate/expressEntry.ts'
            )
          ).toString()
        },
        {
          sysId: uuid(),
          fileName: 'lib.ts',
          filePath: '/server/lib',
          fileType: 'application/x-typescript',
          purpose: 'ts',
          component: componentInfo.name,
          fileContents: readFileSync(
            join(
              __dirname,
              '../../../../resources/customComponents/bootstrapperTemplate/libSample.ts'
            )
          ).toString()
        }
      ]

      addCustomComponent(componentInfo)
        .then(() => {
          return Promise.all([
            ...bootstrappingFileStructure.map((newFileToAdd: IFileUpload) => {
              return createCustomComponentFile(newFileToAdd)
            })
          ])
        })
        .then(() => {
          return getCustomComponentFileTree(componentInfo.name)
        })
        .then((fileTree: IFolder) => {
          resolveBootstrappedProject(fileTree)
        })
        .catch(rejectBootstrappedProject)
    }
  )
}
