import { assert } from 'chai'
import { buildFileStructure } from '../../../../../../src/lib/customComponents/designer/fileExploder/getTree'
import {
  IDatabaseFolderStructure,
  IFolder
} from '../../../../../../src/lib/customComponents/designer/types/files'
import * as mocha from 'mocha'

describe('builds file structure from database', function() {
  it('should build the tree predictably', function() {
    const testFiles: IDatabaseFolderStructure[] = [
      {
        file_name: 'one_file.ts',
        purpose: 'ts',
        file_path: '/lib/where/is/this/file/located/at',
        sys_id: 'doesnt matter',
        file_type: 'application/typescript'
      }
    ]

    const expectedResult: IFolder = {
      folderName: 'root',
      folders: [
        {
          folderName: 'lib',
          folders: [
            {
              folderName: 'where',
              folders: [
                {
                  folderName: 'is',
                  folders: [
                    {
                      folderName: 'this',
                      folders: [
                        {
                          folderName: 'file',
                          folders: [
                            {
                              folderName: 'located',
                              folders: [
                                {
                                  folderName: 'at',
                                  files: [
                                    {
                                      fileName: 'one_file.ts',
                                      fileType: 'ts'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      files: []
    }

    console.log(assert.deepEqual(buildFileStructure(testFiles), expectedResult))
  })
})
