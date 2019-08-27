/**
 * lib/excel/cell.ts
 * Create cells and rows for an excel spreadsheet
 */

// Node Modules
import { resolve } from 'path'
import { writeFileSync, rename } from 'fs'
import { exec } from 'child_process'
import { performance } from 'perf_hooks'

// NPM Modules
import { v4 as uuid } from 'uuid'

// Local Modules
import Towel from '../queries/towel/towel'
import { copyDirSync, deleteDirSync } from '../utils'
import Sheet from './sheet'
import { platform } from 'os'

// Constants and global variables

// I know this is probably completely unnecessary
const msToS = (ms: number) => {
  return Math.fround(ms / 1000)
}

export async function exportExcel(towel: Towel) {
  return new Promise((resolvePromise) => {
    const startTime = performance.now() // Measure before query

    // Limit results to 15000
    towel.setLimit(15000)
    towel
      .get()
      .then((q) => {
        const data = q.data
        const queryTime = performance.now() // After query
        const bookFileName = uuid()
        const tempPath = resolve(__dirname, '../../../../resources/excel/temp/')
        const bookPath = resolve(tempPath, bookFileName)
        const outPath = resolve(__dirname, '../../../../resources/excel/books/')

        try {
          copyDirSync(resolve(__dirname, 'template'), bookPath)
        } catch (e) {
          throw new Error('Template does not exist at ' + tempPath)
        }
        const { sheet, shared } = Sheet(data, towel.requestedFields)
        const sheetFile = resolve(bookPath, 'xl/worksheets/sheet1.xml')
        const sharedFile = resolve(bookPath, 'xl/sharedStrings.xml')
        writeFileSync(
          sheetFile,
          '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + sheet,
          { encoding: 'utf8' }
        )
        writeFileSync(
          sharedFile,
          '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + shared,
          { encoding: 'utf8' }
        )
        const copyTime = performance.now() // After copy and sheet writes

        // Set the path for the 7z executable
        const zipPath =
          platform() === 'win32' ? '"C:\\Program Files\\7-Zip\\7z.exe"' : 'zip'

        exec(
          [
            zipPath,
            'a',
            `${outPath}/${bookFileName}.zip`,
            `${bookPath}/*`
          ].join(' '),
          (err, stdout, stderr) => {
            if (err) console.error(err)
            console.log(stdout)
            console.log(stderr)
            rename(
              `${outPath}/${bookFileName}.zip`,
              `${outPath}/${towel.tableName}.xlsx`,
              (renameErr) => {
                if (renameErr) console.error(renameErr)
                try {
                  deleteDirSync(`${bookPath}`)
                } catch (e) {
                  console.error(e)
                }
                console.log(
                  'Creation times: \n Query: %d s \n Template: %d s \n Zip: %d s \n Total: %d s',
                  msToS(queryTime - startTime),
                  msToS(copyTime - queryTime),
                  msToS(performance.now() - copyTime),
                  msToS(performance.now() - startTime)
                )
                console.log('Excel spreadsheet ready at %s.xlsx', bookPath)
                return resolvePromise({ path: bookPath })
              }
            )
          }
        )
      })
      .catch((e) => {
        throw e
      })
  })
}
