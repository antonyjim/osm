#!/usr/bin/node

/**
 * Go through each module and run index.sql if it exists and is
 * located under the sql/ folder in the install folder for that module.
 * 
 * Then, spawn a process for any install_*.js files that may exist.
 */

const {
  existsSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  statSync,
  unlinkSync
} = require('fs')
const exec = require('child_process').exec
const join = require('path').join
const query = require('@lib/connection').multiQuery
const transformSql = require('./schema_transform')

const packagesDir = join(__dirname, 'packages')
const packages = readdirSync(packagesDir)
const sourceDirs = join(__dirname, '..')

module.exports = function (cb) {
  const sqlSourceQueries = []
  packages.forEach(function (package) {
    const allFiles = readdirSync(join(packagesDir, package))
    if (existsSync(join(sourceDirs, package, '.installed'))) {
      return
    }
    allFiles.forEach(function (fileOrDir) {
      const statsForFileOrDir = statSync(join(packagesDir, package, fileOrDir))
      if (statsForFileOrDir.isDirectory() && fileOrDir === 'sql') {
        const indexSqlFile = join(__dirname, 'packages', package, 'sql', 'index.sql')
        if (existsSync(indexSqlFile)) {
          sqlSourceQueries.push(query(readFileSync(transformSql(indexSqlFile, package))))
        }
      }
    })

    Promise.all(sqlSourceQueries).then(() => {
        exec('git rev-parse --verify HEAD', function (err, stdout) {
          if (err) {
            console.log(err)
            cb(err)
          }
          const installedData = {
            installed_at: new Date().toISOString(),
            commit: stdout.replace('\n', '')
          }

          writeFileSync(join(sourceDirs, package, '.installed'), JSON.stringify(installedData, null, 2), {
            encoding: 'utf8'
          })
          cb(null)
        })
      }).catch(cb)
      .finally(() => {
        const allSqlFiles = readdirSync(__dirname).filter((file) => {
          return file.startsWith('schema_source_')
        })

        allSqlFiles.forEach(function (fileToDelete) {
          unlinkSync(join(__dirname, fileToDelete))
        })
      })

  })
}