import API from '../../lib/API'

export interface IFile {
  fileName: string
  fileType: string
  fileUri: string
}

export interface IFileExplorerFileProps {
  fileName: string
  fileType: string
  fileUri: string
  depth: number
  index: number
  activeIndex: () => number[]
  setActiveIndex: React.Dispatch<number[]>
}

/**
 * Renders a file in the list
 * @param props Object containing descriptions for component
 */
export function FileExplorerFile(props: IFileExplorerFileProps) {
  const setFileContents = (e: React.MouseEvent) => {
    API.get({ path: props.fileUri })
      .then((file) => {
        monaco.editor.getModels()[0].setValue(file.data.contents)
        monaco.editor.setModelLanguage(
          monaco.editor.getModels()[0],
          'typescript'
        )
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
          jsx: monaco.languages.typescript.JsxEmit.Preserve
        })

        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
          typeRoots: [
            'server/node_modules/@types',
            'client/node_modules/@types'
          ]
        })
      })
      .catch(alert)
  }
  return (
    <div className='file-explorer-row' onClick={setFileContents}>
      <div className='file-explorer-file file-explorer-row-contents'>
        <span
          className='file-explorer-name file-explorer-icon file-explorer-icon-file'
          style={{
            margin: '0 0 0 ' + ((props.depth || 2) * 8).toString() + 'px',
            backgroundColor: props.activeIndex().includes(props.index)
              ? 'green'
              : ''
          }}
        >
          <span className='file-explorer-label'>{props.fileName}</span>
        </span>
      </div>
    </div>
  )
}
