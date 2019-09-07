// Use this config to separate libraries from
// main entry modules.

const {
  readdirSync
} = require('fs')
const {
  resolve
} = require('path')

function generateRandomHash(length = 8) {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}


module.exports = function (env, argv) {
  // Figure out if we are building a production build or dev
  const isProduction = env.NODE_ENV === 'production' || env.NODE_ENV === 'testing' ? 'production' : 'development'

  // Find the nearest `src` folder by starting at cwd,
  // then working up to the root dir
  return new Promise(function config(resolveConfig, rejectConfig) {
    new Promise(function findSrcDir(resolveSrc, rejectSrc) {
        let cwd = process.cwd()
        let srcDir = null
        let isRoot = false
        let nextCwd = cwd

        while (!srcDir) {
          const thisDirFiles = readdirSync(nextCwd)
          if (thisDirFiles.indexOf('src') > -1) {
            srcDir = nextCwd
            break
          } else if (nextCwd === resolve('/')) {
            isRoot = true
            break
          } else {
            nextCwd = resolve(nextCwd, '..')
          }
        }

        // Check if srcDir has been resolved
        if (srcDir !== null) {
          resolveSrc(resolve(srcDir))
        } else {
          rejectConfig(new Error('Could not locate source directory'))
        }
      })
      .then(function withSrc(resolvedSrcDir) {
        const package = require(resolve(resolvedSrcDir, 'package.json'))
        const packageName = package.name
        const entryPoints = {}
        if (package.osm.entry.lib) {
          entryPoints[packageName + 'lib'] = resolve(resolvedSrcDir, 'src', package.osm.entry.lib)
        }

        if (package.osm.client === 'core' && package.osm.entryPoints.client) {
          entryPoints[packageName + 'client']
        } else if (package.osm.client === 'standalone' && package.osm.entryPoints.client) {

        } else {

        }

        return {
          mode: isProduction,
          devtool: isProduction === 'production' ? 'source-maps' : 'eval',
          context: resolve(resolvedSrcDir, 'src'),
          entry: {

          }

        }
      })

      // Rethrow nested errors, let webpack report error
      .catch(rejectConfig)
  })
}