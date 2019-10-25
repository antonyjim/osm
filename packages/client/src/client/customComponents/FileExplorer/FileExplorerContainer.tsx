import { FileExplorerActions } from './FileExplorerActions'
import { useState, useEffect } from 'react'
import {
  IFileExplorerFolderProps,
  FileExplorerFolder
} from './FileExplorerFolder'
import { IFileExplorerFileProps } from './FileExplorerFile'
import API from '../../lib/API'

export interface IFileExplorerContainerProps {
  fileStructureLocation: string
}

interface IFile {
  fileName: string
  fileType: string
  fileUri: string
}

interface IFolder {
  folderName: string
  folders?: IFolder[]
  files?: IFile[]
}

export interface IFileStructure {
  parentName: string
  folders: IFolder[]
}

export function FileExplorerContainer(props: IFileExplorerContainerProps) {
  const [fileStructure, setFileStructure] = useState<IFileStructure>()

  const [activeIndex, setActiveIndex] = useState<number[]>([-1])
  const [allFileFolders, setAllFileFolders] = useState<JSX.Element[]>([])

  const getActiveIndex = (): null | number[] => {
    return activeIndex
  }

  const InitialFolderLoader = (initProps): JSX.Element => {
    return (
      <FileExplorerFolder
        folderName='root'
        // @ts-ignore
        folders={fileStructure.folders}
        // @ts-ignore
        files={fileStructure.files}
        depth={0}
        activeIndex={initProps.activeIndex}
        setActiveIndex={initProps.setActiveIndex}
        index={0}
      />
    )
  }

  useEffect(() => {
    if (fileStructure !== undefined) {
      setAllFileFolders([
        <InitialFolderLoader
          activeIndex={getActiveIndex}
          setActiveIndex={setActiveIndex}
        />
      ])
    }
  }, [fileStructure])

  useEffect(() => {
    API.get({ path: props.fileStructureLocation })
      .then((details: { data: IFileStructure; success: boolean }) => {
        if (details.success) {
          setFileStructure(details.data)
        }
      })
      .catch(alert)
  }, [props.fileStructureLocation])

  return (
    <div className='file-explorer-container pl-1'>
      <FileExplorerActions />
      {fileStructure && allFileFolders}
    </div>
  )
}
