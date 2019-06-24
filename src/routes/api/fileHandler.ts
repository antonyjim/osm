import { Router, Request, Response } from 'express'
import * as formidable from 'formidable'
import { join } from 'path'
import { tmpdir } from 'os'
import { storeIncomingFile } from '../../lib/api/files/fileUpload'
import { IFileUpload } from '../../types/server'
import { readFileSync } from 'fs'
import { getFileList, getFile } from '../../lib/api/files/fileGetter'
import { deleteFile } from '../../lib/api/files/fileDeleter'

const fileRouter = Router()

fileRouter.get(
  [
    '/anonymous/:file_name',
    '/:referenced_table/:referenced_table_record/:file_name',
    '/:referenced_table/:referenced_table_record'
  ],
  (req: Request, res: Response) => {
    let fetchPromise: Promise<any>
    if (
      req.params.referenced_table &&
      req.params.referenced_table_record &&
      req.params.file_name
    ) {
      fetchPromise = getFile({
        file_name: req.params.file_name,
        referenced_table: req.params.referenced_table,
        referenced_table_record: req.params.referenced_table_record
      })
    } else if (
      req.params.referenced_table &&
      req.params.referenced_table_record
    ) {
      fetchPromise = getFileList({
        referenced_table: req.params.referenced_table,
        referenced_table_record: req.params.referenced_table_record
      })
    } else {
      fetchPromise = getFile({
        referenced_table: null,
        referenced_table_record: null,
        file_name: req.params.file_name
      })
    }
    fetchPromise
      .then((fileInfo: IFileUpload) => {
        if (fileInfo[0].file_contents) {
          res.writeHead(200, {
            'Content-Type': fileInfo[0].content_type
          })
          res.write(fileInfo[0].file_contents, (err) => {
            console.error(err)
          })
          res.end()
        } else {
          res.status(200).json(fileInfo)
        }
      })
      .catch((err) => {
        console.error(err)
        res.status(400).send()
      })
  }
)

fileRouter.post(
  [
    '/:referenced_table/:referenced_table_record/:file_name',
    '/anonymous/:file_name'
  ],
  (req: Request, res: Response) => {
    const form = new formidable.IncomingForm()
    form.uploadDir = join(tmpdir())
    new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err)
        const filesToUpload: IFileUpload[] = Object.keys(files).map((file) => {
          return {
            file_name: files[file].name,
            file_size: files[file].bytesWritten,
            file_contents: readFileSync(files[file].path),
            referenced_table: req.params.referenced_table,
            referenced_table_record: req.params.referenced_table_record,
            content_type: files[file].type
          }
        })
        Promise.all(storeIncomingFile(filesToUpload))
          .then(resolve)
          .catch(reject)
      })
    })
      .then((paths) => {
        res.set('Location', paths[0])
        res.status(200).json({
          location: paths[0],
          success: true
        })
      })
      .catch((err: Error) => {
        console.error(err)
        res.status(400).json({
          errors: [
            {
              message: err.message
            }
          ]
        })
      })
  }
)

fileRouter.delete(
  [
    '/:referenced_table/:referenced_table_record/:file_name',
    '/anonymous/:file_name'
  ],
  (req: Request, res: Response) => {
    deleteFile({
      referenced_table: req.params.referenced_table,
      referenced_table_record: req.params.referenced_table,
      file_name: req.params.file_name
    })
      .then(() => {
        res.status(204).send()
      })
      .catch((err: Error) => {
        res.set('Error_Record', Buffer.from(err.message).toString('base64'))
        res.status(400).send()
      })
  }
)

export { fileRouter }
