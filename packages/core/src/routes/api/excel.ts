/**
 * lib/routes/api/excel.ts
 * Provide a functionality to export to excel
 */

// Node Modules

// NPM Modules
import { Router, Request, Response } from 'express'
import { getTables } from '../../app/model/constructSchema'
import { exportExcel } from '../../lib/excel/makeBook'
import Towel from '../../lib/queries/towel/towel'

// Local Modules

// Constants and global variables

const excelRoute: Router = Router()

excelRoute.get('/:table', (req: Request, res: Response) => {
  const table: string = req.params.table
  const fields: string[] = req.query.fields.split(',')
  if (!(table in getTables())) {
    return res.status(404).json({ error: 'Table not found' })
  } else {
    const towelQuery: Towel = new Towel(table)
    towelQuery.setFields(fields)
    exportExcel(towelQuery)
      .then((fileInfo) => {
        return res.status(200).json(fileInfo)
      })
      .catch((err) => {
        return res.status(500).json(err)
      })
  }
})

export { excelRoute }
