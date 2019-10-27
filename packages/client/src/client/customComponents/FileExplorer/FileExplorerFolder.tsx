import { IFileExplorerFileProps, FileExplorerFile } from './FileExplorerFile'
import { useState } from 'react'
import * as React from 'react'

export interface IFileExplorerFolderProps {
  folders?: IFileExplorerFolderProps[]
  files?: IFileExplorerFileProps[]
  folderName: string
  index: number
  depth: number
  activeIndex: () => number[]
  setActiveIndex: React.Dispatch<number[]>
}

export function FileExplorerFolder(props: IFileExplorerFolderProps) {
  const allItems: JSX.Element[] = []
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const toggleCollapsed = (e) => {
    setIsOpen(!isOpen)
  }

  if (props.folders) {
    const allFolders = props.folders.map(
      (folder: IFileExplorerFolderProps, i: number) => {
        return (
          <FileExplorerFolder
            folderName={folder.folderName}
            files={folder.files}
            folders={folder.folders}
            depth={(props.depth || 2) + 1}
            key={folder.folderName + i}
            index={props.index + 1}
            activeIndex={props.activeIndex}
            setActiveIndex={props.setActiveIndex}
          />
        )
      }
    )
    allItems.push(...allFolders)
  }

  if (props.files) {
    allItems.push(
      ...props.files.map((file: IFileExplorerFileProps, i: number) => {
        return (
          <FileExplorerFile
            fileName={file.fileName}
            fileType={file.fileType}
            fileUri={file.fileUri}
            depth={(props.depth || 2) + 1}
            key={file.fileName + i}
            index={props.index + i}
            activeIndex={props.activeIndex}
            setActiveIndex={props.setActiveIndex}
          />
        )
      })
    )
  }

  const handleClick = (e: React.MouseEvent) => {
    toggleCollapsed(e)
    props.setActiveIndex([props.index])
  }

  return (
    <>
      <div
        className={
          'file-explorer-row ' +
          (Array.isArray(props.activeIndex) &&
            props.index &&
            props.activeIndex.includes(props.index))
            ? 'file-explorer-row active-row'
            : 'file-explorer-row'
          // isOpen
          //   ? 'file-explorer-row file-explorer-collapsible collapsed'
          //   : 'file-explorer-row file-explorer-collapsible'
        }
        onClick={handleClick}
      >
        <div className='file-explorer-row-contents'>
          <span
            className={
              'file-explorer-name file-explorer-icon ' +
              (isOpen
                ? 'file-explorer-icon-folder-collapsed'
                : 'file-explorer-icon-folder')
            }
            style={{
              margin: '0 0 0 ' + ((props.depth || 2) * 8).toString() + 'px'
            }}
          >
            <span className='file-explorer-label'>{props.folderName}</span>
          </span>
        </div>
      </div>

      {isOpen && allItems}
    </>
  )
}
