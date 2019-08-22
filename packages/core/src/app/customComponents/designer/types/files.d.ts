export interface IFile {
  fileName: string
  fileType: string
  fileUri: string
}

export interface IFolder {
  folderName: string
  folders?: IFolder[]
  files?: IFile[]
}

export interface IDatabaseFolderStructure {
  sys_id: string
  parent_component?: string
  file_name: string
  file_type: string
  file_path: string
  file_contents?: string
  version_of?: number
  purpose: 'db' | 'ts' | 'tsx' | 'css' | 'asset'
}

export interface IFileUpload {
  fileName: string
  fileType: string
  purpose: 'db' | 'ts' | 'tsx' | 'css' | 'asset'
  fileContents: string
  filePath: string
  sysId?: string
  component?: string
}
