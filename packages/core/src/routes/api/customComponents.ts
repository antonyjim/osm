import { Router, Request, Response } from 'express'
import { getCustomComponentFileTree } from '../../app/customComponents/designer/fileExploder/getTree'
import { IFolder } from '../../app/customComponents/designer/types/files'
import { ICustomComponentInfo } from '../../app/customComponents/customComponentLoader'
import { bootstrapNewCustomComponent } from '../../app/customComponents/designer/bootstrapper'
import { getCustomComponentDetails } from '../../app/customComponents/designer/getCustomComponentDetails'
import { getCustomComponentFile } from '../../app/customComponents/designer/fileEditor/getFile'
import { getCustomComponentLibs } from '../../app/customComponents/designer/getLibs'

const ccRoutes = Router()

ccRoutes.get(
  '/customComponentBuilder/libs/:libType',
  (req: Request, res: Response) => {
    res
      .status(200)
      .json({ data: getCustomComponentLibs(req.params.libType), success: true })
  }
)

ccRoutes.get(
  '/customComponentBuilder/:componentTitle',
  (req: Request, res: Response) => {
    getCustomComponentDetails(req.params.componentTitle)
      .then((details: ICustomComponentInfo) => {
        res.status(200).json({
          data: details,
          success: true
        })
      })
      .catch((err: Error) => {
        res.status(400).json({
          errors: [
            {
              message: err.message
            }
          ],
          success: false
        })
      })
  }
)

ccRoutes.get(
  '/customComponentBuilder/:componentTitle/blob/*?',
  (req: Request, res: Response) => {
    let filePath: string[] = req.params[0].split('/')
    const fileName: string = filePath.slice(-1)[0]
    filePath = filePath.slice(0, -1)

    getCustomComponentFile(
      '/' + filePath.join('/'),
      fileName,
      req.params.componentTitle
    )
      .then((file) => {
        res.status(200).json({
          data: file,
          success: true
        })
      })
      .catch((err) => {
        res.status(404).json({
          errors: [
            {
              message: err.message
            }
          ],
          success: false
        })
      })
  }
)

ccRoutes.get(
  '/customComponentBuilder/tree/:componentTitle',
  (req: Request, res: Response) => {
    getCustomComponentFileTree(req.params.componentTitle as string)
      .then((tree: IFolder) => {
        res.status(200).json({
          data: tree,
          success: true
        })
      })
      .catch((err: Error) => {
        res.status(400).json({
          errors: [
            {
              message: err.message
            }
          ],
          success: false
        })
      })
  }
)

ccRoutes.post(
  '/customComponentBuilder/bootstrapNewProject',
  (req: Request, res: Response) => {
    if (!req.body || !(req.body as ICustomComponentInfo)) {
      res.status(400).json({
        errors: [
          {
            message: 'Insufficient body provided to bootstrapper'
          }
        ]
      })
    } else {
      bootstrapNewCustomComponent(req.body)
        .then((fileTree: IFolder) => {
          res.status(200).json({
            data: fileTree,
            success: true
          })
        })
        .catch((err: Error) => {
          res.status(400).json({
            errors: [
              {
                message: err.message
              }
            ],
            success: false
          })
        })
    }
  }
)

export { ccRoutes }
