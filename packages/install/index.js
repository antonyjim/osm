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
const connection = require('@lib/connection').overrideConnectionVar('database', null)
const transformSql = require('./schema_transform')

const packagesDir = join(__dirname, 'packages')
const packages = readdirSync(packagesDir)
const sourceDirs = join(__dirname, '..')

module.exports = function (cb) {
  // We start with something just so Promise.all gets called and resolved
  const sqlSourceQueries = []

  for (let package of packages) {
    const allFiles = readdirSync(join(packagesDir, package))
    if (existsSync(join(sourceDirs, package, '.installed'))) {
      continue
    }
    allFiles.forEach(function (fileOrDir) {
      const statsForFileOrDir = statSync(join(packagesDir, package, fileOrDir))
      if (statsForFileOrDir.isDirectory() && fileOrDir === 'sql') {
        const indexSqlFile = join(__dirname, 'packages', package, 'sql', 'index.sql')
        if (existsSync(indexSqlFile)) {
          // If index.sql exists, we need to transform it by replacing
          // environment variables in curly braces, then run each command
          // in the file.
          sqlSourceQueries.push(new Promise((resolve, reject) => {
            const fileName = transformSql(indexSqlFile, package)
            connection.query(readFileSync(fileName).toString(), (err, results) => {
              if (err) {
                return reject(err)
              }
              resolve(package)
            })
          }))
        }
      }
    })
  }

  Promise.all(sqlSourceQueries).then((packageResults) => {
      // Include the hash of the build commit
      exec('git rev-parse --verify HEAD', function (err, stdout) {
        if (err) {
          console.log(err)
          return cb(err)
        }
        const installedData = {
          installed_at: new Date().toISOString(),
          commit: stdout.replace('\n', '')
        }

        // For each package we just installed, write a .installed file at the root of each dir
        for (packageName of packageResults) {
          writeFileSync(join(sourceDirs, packageName, '.installed'), JSON.stringify(installedData, null, 2), {
            encoding: 'utf8'
          })

        }

        // Call the callback with a null for the error
        return cb(null)

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
}