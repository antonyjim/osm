// Use this config to separate libraries from
// main entry modules.

require('dotenv').config({
  path: '../../.env'
})

require('module-alias/register')
const {
  readdirSync
} = require('fs')
const {
  resolve
} = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

// const updateInstall = require('./utils/updateInstall')
const packagesDir = resolve(__dirname, '..', '..', '..')
const moduleAliases = (() => {
  const oAliases = require(resolve(packagesDir, 'core', 'package.json'))._moduleAliases
  const newAliases = {}
  Object.keys(oAliases).forEach(function (k) {
    newAliases[k] = resolve(packagesDir, 'core', oAliases[k]).replace('/dist/', '/src/')
  })
  return newAliases
})()

function generateRandomHash(length = 8) {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}


module.exports = (function (env, argv) {
  // Figure out if we are building a production build or dev
  const isProduction = env.NODE_ENV === 'production'
  const uniqueBuildId = generateRandomHash()
  process.env.OSM_BUILD_ID = uniqueBuildId
  // updateInstall(uniqueBuildId)

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
        const entryPoints = {
          "app": resolve(packagesDir, 'core', 'src', 'app', 'app')
        }

        readdirSync(packagesDir).forEach(function (pkg) {
          const package = require(resolve(packagesDir, pkg, 'package.json'))
          const packageName = package.name
          if (package.OSM && package.OSM.entry && package.OSM.entry.lib && package.OSM.lib === 'shared') {
            entryPoints[packageName + '_lib'] = resolve(packagesDir, pkg, package.OSM.entry.lib)
          }
        })


        return resolveConfig({
          mode: isProduction ? 'production' : 'development',
          devtool: isProduction === 'production' ? 'source-maps' : 'eval',
          context: packagesDir,
          entry: entryPoints,
          target: "node",
          output: {
            path: resolve(packagesDir, 'core', 'dist'),
            // path: resolve(packagesDir, 'client', 'build'),
            filename: '[name].js',
          },
          resolve: {
            alias: moduleAliases,
            modules: [resolve(packagesDir, 'core', 'node_modules')],
            extensions: ['.ts', '.tsx', '.js', '.jsx']
          },
          module: {
            rules: [
              // Process ts files
              {
                test: /\.(j|t)s?$/,
                loader: require.resolve(resolve(__dirname, '..', '..', 'node_modules', 'ts-loader')),
                exclude: /node_modules/,
                options: {
                  transpileOnly: true,
                  configFile: resolve(packagesDir, 'core', 'tsconfig.json')
                }
              },
              // {
              //   test: /\.(j|t)s$/,
              //   loader: require.resolve(resolve(__dirname, '..', '..', 'node_modules', 'source-map-loader'))
              // }
            ]
          },
          plugins: [
            new ForkTsCheckerWebpackPlugin({
              tsconfig: resolve(packagesDir, 'core', 'tsconfig.json')
            }),
          ],
          externals: {
            express: 'require(\'express\')'
          }
        })
      })

      // Rethrow nested errors, let webpack report error
      .catch(rejectConfig)
  })
})(process.env, process.argv)