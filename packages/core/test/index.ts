/**
 * Entry point for the various tests
 */

import { readdirSync, Stats, statSync, readFile, readFileSync } from 'fs'

import * as mocha from 'mocha'
import { expect } from 'chai'
import Querynator from './unit/lib/queries/Querynator'
import constructSchema from '../src/lib/model/constructSchema'
import builder from './unit/lib/queries/builder'
import sheet from './unit/lib/excel'
import { resolve } from 'path'

const testDirectories = ['./API/tables', './lib/Querynator']
const testFiles: string[] = []

// Load environment variables
const data = readFileSync(resolve(__dirname, '../dot.test.env'), {
  encoding: 'utf8'
})

const lines: string[] | number[] = data.split('\n')
lines.map((line: string) => {
  const key: string = line.split('=')[0]
  const value: string = line.split('=')[1]
  if (value && value[0] === "'") {
    // console.log(
    //   '[STARTUP] Setting environment variable %s to value %s',
    //   key,
    //   value
    // )
    process.env[key] = value.slice(1, -1)
  } else {
    process.env[key] = value
  }
})

builder()
sheet()

// before(async () => {
//   process.env.NODE_ENV = 'test'
//   await constructSchema()
// })

// Querynator()

// function getDir(dir: string) {
//   const files: string[] = readdirSync(dir)
//   for (const file of files) {
//     const stats: Stats = statSync(resolve(dir, file))
//     if (stats.isDirectory()) {
//       getDir(resolve(dir, file))
//     } else {
//       testFiles.push()
//     }
//   }
// }

describe('smoke test', function() {
  it('checks equality', function() {
    expect(true).to.be.true
  })
})
