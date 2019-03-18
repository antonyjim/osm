/**
 * src/lib/ql/hooks/generateHooks.ts
 * Generate hooks from the sys_db_hook table
 * and save the output files to dist/hooks
 */

// Node Modules
import {
  writeFile,
  existsSync,
  mkdirSync,
  rmdirSync,
  readdirSync,
  statSync,
  unlinkSync
} from 'fs'
import { resolve } from 'path'

// NPM Modules

// Local Modules
import Towel from '../../queries/towel/towel'
import { HOOKS_DIR } from '../../connection'

// Constants and global variables

function removeRecursively(path: string) {
  if (existsSync(path)) {
    const stats = statSync(path)
    if (stats.isDirectory()) {
      const children = readdirSync(path)
      if (children && children.length > 0) {
        children.map((child) => {
          const subStats = statSync(resolve(path, child))
          if (subStats.isDirectory) {
            removeRecursively(resolve(path, child))
          } else {
            try {
              unlinkSync(resolve(path, child))
            } catch (err) {
              console.error(err)
            }
          }
        })
      }
      try {
        rmdirSync(HOOKS_DIR)
      } catch (err) {
        console.error(err)
      }
    } else {
      try {
        unlinkSync(path)
      } catch (err) {
        console.error(err)
      }
    }
  }
}

export default function() {
  ;(async () => {
    const hooks = await new Towel({
      table: 'sys_db_hook',
      fields: ['code', 'hook', 'hook_table', 'hook_table_display']
    })
      .get()
      .catch((err) => {
        console.error(err)
      })

    if (hooks && hooks.data.length > 0) {
      if (existsSync(HOOKS_DIR)) removeRecursively(HOOKS_DIR)
      mkdirSync(HOOKS_DIR)
      hooks.data.map((hook) => {
        const hookFile = `${hook.hook}_${hook.hook_table_display}.js`

        writeFile(resolve(HOOKS_DIR, hookFile), hook.code, (err) => {
          if (err) console.error(err)
          console.log(`[HOOK_GENERATOR] Generated hook file ${hookFile}`)
        })
      })
    } else {
      console.log('[HOOK_GENERATOR] NO HOOKS FOUND')
    }
  })()
}

/*

#!/bin/env/node
/**
 * Script hook for onBeforeUpdated on table sys_db_object
 * 
 * The Towel API should provide everything that is needed to verify any fields.
 * Documentation can be found at /public/docs/Towel.md
 * 
 * Please follow best practices when coding, making sure to use JSDOC comments
 * whenever possible. JSDOC documentation can be found at https://devdocs.io/jsdoc/
 * 
 * NOTE: This script will run in an isolated environment. You cannot call on any
 * standard node modules or NPM modules. This script will be called using the Function()
 * constructor and will be passed the folowing 2 parameters:
 * 
 * @param {string} sysId The ID of the record being modified
 * @param {object} incomingFields The fields that are in the request body (if applicable)
 * 
 * If this function throws any errors, the request will be aborted and returned to the client
 * with an error 500 response. This function should return an object with the following keys:
 * 
 * @returns {status: string, confirmedFields: object, warnings: object | object[]}
 * /
var Towel = require('./../towel')

module.exports = function(sysId, action, incomingFields) {
  this.status = 'OK'
  this.confirmedFields = {...incomingFields}
  this.warnings = []

  // Do stuff
  var query = 'SELECT (1 + 1) AS ADDITION'
  var number
  Towel.rawQuery(query)
  .then(numberFetched => {
    console.log('[HOOK_RUNNER] ADDITION ' + numberFetched)
  })
  .catch(err => {
    console.error(err)
  })

  return this
}


*/
