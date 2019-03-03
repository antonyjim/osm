import Sheet from './sheet'

/**
 * lib/excel/cell.ts
 * Create cells and rows for an excel spreadsheet
 */

// Node Modules

// NPM Modules

// Local Modules

// Constants and global variables

const cols = ['sys_id', 'test']

const data = [
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

console.log(Sheet(data, cols))
