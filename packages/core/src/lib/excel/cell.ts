import { performance } from 'perf_hooks'
import { exec } from 'child_process'
import { writeFileSync, rename } from 'fs'

import { v4 as uuid } from 'uuid'

import Sheet from './sheet'
import { copyDirSync, deleteDirSync } from '@lib/utils'
import { resolve } from 'path'
import Towel from '../queries/towel/towel'

/**
 * lib/excel/cell.ts
 * Create cells and rows for an excel spreadsheet
 */

// Node Modules

// NPM Modules

// Local Modules

// Constants and global variables

const msToS = (ms: number) => {
  return Math.fround(ms / 1000)
}

export default async function() {
  return new Promise((resolvePromise) => {
    const startTime = performance.now()
    const cols1 = ['sys_id', 'test']

    const data1 = [
      {
        sys_id: 'Sys ID header',
        test: 'blue'
      },
      {
        sys_id: 'test sys_id',
        test: 'green'
      },
      {
        sys_id: 'test sys_id',
        test: 'yellow'
      }
    ]

    const cols = [
      'nonsig',
      'nsTradeStyle',
      'active',
      'nsCountry',
      'nsState',
      'nsCity',
      'nsPostalCode',
      'nsAddr1'
    ]
    const towel = new Towel('sys_customer')
    towel.setFields(cols)
    towel.setLimit(15000)
    towel
      .get()
      .then((q) => {
        const data = q.data
        const queryTime = performance.now()
        const bookFileName = uuid()
        const tempPath = resolve(__dirname, '../../../../excel/temp/')
        const bookPath = resolve(tempPath, bookFileName)
        const outPath = resolve(__dirname, '../../../../excel/books/')

        copyDirSync(resolve(__dirname, '../../../../excel/template'), bookPath)
        const { sheet, shared } = Sheet(data, cols)
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
        const copyTime = performance.now()

        const zipPath = '"C:\\Program Files\\7-Zip\\7z.exe"' // Set the path for the 7z executable
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
              `${outPath}/sys_db_dictionary.xlsx`,
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
