/**
 * Entry point for the various tests
 */

import { readdirSync, Stats, statSync } from 'fs'

import * as mocha from 'mocha'
import { expect } from 'chai'
import Querynator from './unit/lib/queries/Querynator'
import constructSchema from '../src/server/lib/API/schema/constructSchema'
import builder from './unit/lib/queries/builder'
import sheet from './unit/lib/excel'
import { resolve } from 'path'

const testDirectories = ['./API/tables', './lib/Querynator']
const testFiles: string[] = []

// before(async () => {
//   process.env.NODE_ENV = 'test'
//   await constructSchema()
// })

// Querynator()

builder()
sheet()

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
