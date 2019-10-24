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
const connection = require('../core/dist/lib/connection').overrideConnectionVar('database', null)
const transformSql = require('./schema_transform')

const packagesDir = join(__dirname, 'packages')
const packages = readdirSync(packagesDir)
const sourceDirs = join(__dirname, '..')
const enabledPackages = []
const installFile = join(sourceDirs, '..', '.installed')

module.exports = function (singlePackage, callback) {
  // We start with something just so Promise.all gets called and resolved
  const sqlSourceQueries = []
  let cb
  if (typeof singlePackage === 'function') {
    cb = singlePackage
  } else {
    cb = callback
  }

  if (existsSync(installFile)) {
    enabledPackages = JSON.parse(readFileSync(installFile).toString()).packages
  }

  function handlePackageInstallation(package, reinstall) {
    const allFiles = readdirSync(join(packagesDir, package))
    const packagePackageJSON = require(join(sourceDirs, package, 'package.json'))
    if (!reinstall && enabledPackages.filter(p => {
        p.name === package && p.enabled
      }).length > 0) {
      return
    }

    // Check if we have a `core` client type in the package.json file
    // for the to-be-installed package. If so, then we need to update
    // the tsconfig file for the `client` package to reflect the src
    // directory for the package being installed.
    // if (packagePackageJSON.OSM.client === 'core') {
    //   const clientPackageJSON = require('../client/tsconfig.json')

    // }

    allFiles.forEach(function (fileOrDir) {
      const statsForFileOrDir = statSync(join(packagesDir, package, fileOrDir))
      if (statsForFileOrDir.isDirectory() && fileOrDir === 'sql') {
        const indexSqlFile = join(packagesDir, package, 'sql', 'index.sql')
        if (existsSync(indexSqlFile)) {
          // If index.sql exists, we need to transform it by replacing
          // environment variables in curly braces, then run each command
          // in the file.
          sqlSourceQueries.push(new Promise((resolve, reject) => {
            const sqlSourceContents = transformSql(indexSqlFile, package)
            connection.query(readFileSync(sqlSourceContents).toString(), (err, results) => {
              if (err) {
                return reject(err)
              }
              resolve(package)
            })
          }))
        }
      } else if (statsForFileOrDir.isFile() && fileOrDir.startsWith('install_')) {
        // Expect any install_* files to export a single function
        const installFn = require(join(packagesDir, package, fileOrDir))()
        if (installFn instanceof Promise) {
          sqlSourceQueries.push(installFn)
        }
      }
    })
  }

  if (cb !== singlePackage && typeof singlePackage === 'string') {
    handlePackageInstallation(singlePackage, true)
  } else {
    packages.forEach(handlePackageInstallation)
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
          commit: stdout.replace('\n', ''),
          packages: [...(packageResults.map(function (packageName) {
            return {
              name: packageName,
              enabled: true
            }
          }))]
        }

        // Write a .installed file at root dir
        writeFileSync(join(sourceDirs, '..', '.installed'), JSON.stringify(installedData, null, 2), {
          encoding: 'utf8'
        })

        // Call the callback with a null for success
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