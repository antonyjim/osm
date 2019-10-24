#!/usr/bin/node

'use strict'

const help = `
Perform modifications to specified package.

Usage: osm mod <package> <enable|disable|reinstall|install|build|test> [--with-dep]

  <package>: Either the name of a single package or the word 'all' for every package.
  <action>: One of: enable, disable, reinstall, install, build, test
  --with-dep: When action is 'install' or 'reinstall', also run npm install in that package.
`

const {
  readdirSync,
  unlinkSync,
  writeFileSync,
  existsSync
} = require('fs')

const exec = require('child_process').exec

const resolve = require('path').resolve

const installFn = require('../../packages/install')

const sourceDirs = resolve(__dirname, '..', '..', 'packages')

function execCommand(command, cb) {
  exec(command, function (err, stdout, stderr) {
    if (err) {
      console.error(stderr)
      cb(err)
    } else if (stderr) {
      cb(stderr)
    } else {
      cb(null, stdout)
    }
  })
}

module.exports = function (packageName, action, args, cb) {
  // Store a list of packages to modify
  const modPackages = []

  if (packageName === 'all') {
    modPackages.concat(readdirSync(sourceDirs))
  } else if (packageName === 'help') {
    cb(null, help)
    return
  } else if (existsSync(resolve(sourceDirs, packageName))) {
    modPackages.push(packageName)
  } else {
    cb(new Error(packageName + ' not found in `packages` directory.'))
    return
  }

  modPackages.forEach(function (packageShortName) {
    const installFile = resolve(sourceDirs, packageShortName, '.installed')
    switch (action) {
      case 'enable': {
        try {
          const installedData = require(installFile)
          installedData.enabled = true
          writeFileSync(installFile, JSON.stringify(installedData, null, 2), {
            encoding: 'utf8'
          })

          return cb(null)
        } catch (requireErr) {
          return installFn(packageShortName, cb)
        }
      }

      case 'disable': {
        try {
          const installedData = require(installFile)
          installedData.enabled = false
          writeFileSync(installFile, JSON.stringify(installedData, null, 2), {
            encoding: 'utf8'
          })

          cb(null)
          return
        } catch (requireErr) {
          return cb(new Error(packageShortName + ' not currently installed.'))
        }
      }

      case 'reinstall': {
        try {
          unlinkSync(installFile)
        } catch (e) {
          void e
        }

        if (args.indexOf('--with-dep') > -1) {
          process.chdir(resolve(installFile, '..'))
          return execCommand('npm install', function (err) {
            if (err) {
              cb(err)
            } else {
              installFn(packageShortName, cb)
            }
          })
        } else {
          return installFn(packageShortName, cb)
        }
      }

      case 'install': {
        if (args.indexOf('--with-dep') > -1) {
          process.chdir(resolve(installFile, '..'))
          execCommand('npm install', function (err, message) {
            if (err) {
              return cb(err)
            } else {
              return installFn(packageShortName, cb)
            }
          })
        }
      }

      case 'build': {
        process.chdir(resolve(installFile, '..'))
        return execCommand('npm run build', cb)
      }

      case 'test': {
        process.chdir(resolve(installFile, '..'))
        return execCommand('npm test', cb)
      }

      default: {
        cb(new Error(action + ' not a valid action. Please specify one of: enable,disable,install,reinstall,build,test'))
      }
    }
  })
}