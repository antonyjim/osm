/**
 * lib/excel/sheet.ts
 * Provide the functionality to create excel sheets
 */

// Node Modules

// NPM Modules

// Local Modules

// Constants and global variables

// Store the alphabet in an indexable array
const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S'
]

export default function Sheet(inputData: any[], headers: string[]) {
  this.uniqueData = []
  this.allDataCount = 0
  this.cols = headers
  this.data = inputData
  this.sheetFooter = ''
  this.sheetHeader = ''
  this.currentRow = 0

  this._row = (obj) => {
    const row: string[] = []
    this.cols.map((col, i) => {
      if (obj[col]) {
        const data: string = obj[col].toString() // Data that will become the cell text
        const uniqueIndex: number = this.uniqueData.indexOf(data) // Check if the data is unique
        const letter: string = alphabet[i] // Letter of the column
        let thisIndex: number // Index to be used in the sharedStrings.xml file

        if (uniqueIndex > -1) {
          thisIndex = uniqueIndex // Use existing index
        } else {
          thisIndex = this.uniqueData.length // Use the end of the current unique values
          this.uniqueData.push(data) // Add the value to the unique values
        }
        this.allDataCount++

        // Construct the cell
        if (this.currentRow === 1) {
          row.push(
            `<c r="${letter}${
              this.currentRow
            }" s="1" t="s"><v>${thisIndex}</v></c>`
          ) // s="2" bolds the header
        } else {
          row.push(
            `<c r="${letter}${this.currentRow}" t="s"><v>${thisIndex}</v></c>`
          )
        }
      }
    })
    return `<row r="${
      this.currentRow
    }" spans="1:13" x14ac:dyDescent="0.25">${row.join('')}</row>`
  }

  const allRows = []
  const maxLetter = alphabet[this.cols.length - 1]
  let uniqueString = ''
  this.data.map((obj, i) => {
    this.currentRow++
    allRows.push(this._row(obj))
  })
  this.sheetHeader = `<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac xr xr2 xr3" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" xmlns:xr="http://schemas.microsoft.com/office/spreadsheetml/2014/revision" xmlns:xr2="http://schemas.microsoft.com/office/spreadsheetml/2015/revision2" xmlns:xr3="http://schemas.microsoft.com/office/spreadsheetml/2016/revision3" xr:uid="{61361057-2AAF-4FA7-A88B-B2C4B873DEBE}"><dimension ref="A1:${maxLetter}${
    this.currentRow
  }"/><sheetViews><sheetView tabSelected="1" workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="N4" sqref="N4"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="15" x14ac:dyDescent="0.25"/><sheetData>`
  this.sheetFooter = `</sheetData><pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/><pageSetup orientation="portrait" r:id="rId1"/></worksheet>`
  uniqueString =
    '<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="' +
    this.allDataCount +
    '" uniqueCount="' +
    this.uniqueData.length +
    '"><si><t>' +
    this.uniqueData.join('</t></si><si><t>') +
    '</t></si></sst>'
  return {
    sheet: this.sheetHeader + allRows.join('') + this.sheetFooter,
    shared: uniqueString
  }
}
