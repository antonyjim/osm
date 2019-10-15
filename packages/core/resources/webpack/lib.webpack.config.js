// Use this config to separate libraries from
// main entry modules.

require('dotenv').config({
  path: '../../.env'
})
const {
  readdirSync
} = require('fs')
const {
  resolve
} = require('path')

const updateInstall = require('./utils/updateInstall')
const packagesDir = resolve(__dirname, '..', '..')

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
  updateInstall(uniqueBuildId)

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
        if (package.OSM.entry.lib) {
          entryPoints[packageName + '_lib'] = resolve(resolvedSrcDir, 'src', package.OSM.entry.lib)
        }

        // Look for the type of client we are working with.
        // For `core` clients, we will be building with the normal
        // config settings.
        // Any other client type needs its own config
        if (package.OSM.client === 'core' && package.OSM.entry.client) {
          entryPoints[packageName + '_client'] = resolve(resolvedSrcDir, package.OSM.entry.client)
        } else if (package.OSM.client === 'standalone' && package.OSM.entry.client) {
          console.warn('%s has a package type of %s, but an entry point for client was also provided, \
this entry point will be ignored. %s clients require a seperate webpack configuration.', package.name, package.OSM.client, package.OSM.client)
        }

        return resolveConfig({
          mode: isProduction ? 'production' : 'development',
          devtool: isProduction === 'production' ? 'source-maps' : 'eval',
          context: resolve(resolvedSrcDir),
          entry: {
            ...entryPoints
          },
          output: {
            path: resolve(__dirname, 'build'),
            // path: resolve(packagesDir, 'client', 'build'),
            filename: isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
            chunkFilename: isProduction ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
            publicPath: '/public/'
          },
          optimization: {
            splitChunks: {
              chunks: 'all',
              name: false,
            },
            runtimeChunk: true,
          },
          resolve: {
            alias: {
              '@lib': resolve(packagesDir, 'client', 'src', 'lib'),
              '@components': resolve(packagesDir, 'client', 'src', 'common')
            },
            modules: ['node_modules'],
            extensions: ['.ts', '.tsx', '.js', '.jsx']
          },
          module: {
            rules: [
              // Process ts files
              {
                test: /\.(j|t)sx?$/,
                loader: './utils/apiRequestGenerator'
              },
              {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
              },
              {
                test: /\.js$/,
                loader: 'source-map-loader'
              },
              {
                oneOf: [{
                  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                  loader: require.resolve('url-loader'),
                  options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                  },
                }]
              }
            ]
          }

        })
      })

      // Rethrow nested errors, let webpack report error
      .catch(rejectConfig)
  })
})(process.env, process.argv)