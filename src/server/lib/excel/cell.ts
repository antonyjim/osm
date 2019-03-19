import Sheet from './sheet'
import { copyDirSync, deleteDirSync } from '../utils'
import { resolve } from 'path'
import { writeFileSync, rename } from 'fs'
import Towel from '../queries/towel/towel'
import { exec } from 'child_process'
import { v4 as uuid } from 'uuid'

/**
 * lib/excel/cell.ts
 * Create cells and rows for an excel spreadsheet
 */

// Node Modules

// NPM Modules

// Local Modules

// Constants and global variables

export default async function() {
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
  towel.setLimit(150000)
  const data = (await towel.get()).data
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

  const zipPath = '"C:\\Program Files\\7-Zip\\7z.exe"' // Set the path for the 7z executable
  exec(
    [zipPath, 'a', `${outPath}/${bookFileName}.zip`, `${bookPath}/*`].join(' '),
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
          console.log('Excel spreadsheet ready at %s.xlsx', bookPath)
        }
      )
    }
  )
}
