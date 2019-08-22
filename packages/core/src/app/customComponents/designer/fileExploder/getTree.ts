import { IFolder, IDatabaseFolderStructure, IFile } from '../types/files'
import { simpleQuery } from '../../../../lib/queries'
import { TowelRecord } from '../../../../lib/queries/towel/towelRecord'

/**
 * src/lib/customComponents/getTree.ts
 *
 * Retrieves a tree of files from the sys_component_file table
 */

/**
 * Fetch a list of files from the database
 * @param component Name of component to retrieve file tree for
 */
export function getCustomComponentFileTree(
  component: string
): Promise<IFolder> {
  return new Promise((resolveFileTree, rejectFileTree) => {
    simpleQuery('SELECT ?? FROM ?? WHERE ?? = ?', [
      'sys_id',
      'sys_component',
      'name',
      component
    ])
      .then((componentIdResults: { sys_id: string }[]) => {
        if (componentIdResults.length > 0) {
          return simpleQuery('SELECT ??, ??, ??, ??, ?? FROM ?? WHERE ?? = ?', [
            'sys_id',
            'file_name',
            'file_type',
            'file_path',
            'purpose',
            'sys_component_file',
            'parent_component',
            componentIdResults[0].sys_id
          ])
        } else {
          rejectFileTree(new Error('Component ' + component + ' not found.'))
        }
      })
      .then((resolvedFiles: IDatabaseFolderStructure[]) => {
        if (resolvedFiles.length > 0) {
          resolveFileTree(buildFileStructure(resolvedFiles, component))
        } else {
          rejectFileTree(
            new Error('No component files found for component ' + component)
          )
        }
      })
  })
}

export function buildFileStructure(
  files: IDatabaseFolderStructure[],
  componentName: string
): IFolder {
  const finalFolderStructure: IFolder = {
    folderName: 'root',
    folders: [],
    files: []
  }

  const findFilePathFromArray = (pathArr: string[], file: IFile) => {
    // Here we need to just loop through each folder in the requested folder
    // to check if this folder exists
    const parseFolderStructure = (
      folder: IFolder,
      targetFolderName: string
    ): number => {
      for (let i = 0; i < folder.folders.length; i++) {
        if (folder.folders[i].folderName === targetFolderName) {
          return i
        }
      }
      return -1
    }

    let nextFolder: IFolder = finalFolderStructure
    pathArr.forEach((pathEl: string) => {
      if (pathEl === '') return
      const exists = parseFolderStructure(nextFolder, pathEl)
      if (exists === -1) {
        nextFolder.folders.push({
          folderName: pathEl,
          folders: [],
          files: []
        })
        return (nextFolder = nextFolder.folders[nextFolder.folders.length - 1])
      }
      return (nextFolder = nextFolder.folders[exists])
    })

    nextFolder.files.push(file)
  }

  files.forEach((file: IDatabaseFolderStructure) => {
    let filePath = file.file_path.split('/')
    filePath = filePath.filter((el) => {
      if (el !== '') {
        return el
      }
    })

    findFilePathFromArray(filePath, {
      fileName: file.file_name,
      fileType: file.file_type,
      fileUri:
        '/api/c/customComponentBuilder/' +
        componentName +
        '/blob/' +
        filePath.join('/') +
        '/' +
        file.file_name
    })
  })

  return finalFolderStructure
}
