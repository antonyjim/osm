// Use this config to separate libraries from
// main entry modules.

require('dotenv').config()

const {
  readdirSync,
  readFileSync
} = require('fs')

const {
  resolve
} = require('path')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require(resolve(__dirname, '..', '..', '..', 'client', 'node_modules', 'html-webpack-plugin'));

const updateInstall = require('./utils/updateInstall')
const packagesDir = resolve(__dirname, '..', '..', '..')

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
  const buildOpts = {}

  process.env.OSM_BUILD_ID = uniqueBuildId
  updateInstall(uniqueBuildId)

  readdirSync(resolve(__dirname, '..', '..', '..')).forEach(function (package, i) {
    const installedData = JSON.parse(readFileSync(resolve(__dirname, '..', '..', '..', '..', '.installed')).toString())
    if (installedData && installedData.packages.find((val) => {
        return val.name === package && val.enabled
      })) {
      buildOpts['PACKAGE_' + package.toUpperCase()] = true
    } else {
      buildOpts['PACKAGE_' + package.toUpperCase()] = false
    }
  })

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
        if (package.OSM && package.OSM.entry && package.OSM.entry.lib) {
          entryPoints[packageName + '_lib'] = resolve(resolvedSrcDir, 'src', package.OSM.entry.lib)
        }

        // Look for the type of client we are working iwth.
        // For `core` clients, we will be building with the normal
        // config settings.
        // Any other client type needs its own config
        if (package.OSM && package.OSM.client === 'core') {
          entryPoints['client'] = resolve(packagesDir, 'client', 'src', 'client', 'index.tsx')
        } else if (package.OSM && package.OSM.client === 'standalone' && package.OSM.entry.client) {
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
            // path: resolve( 'build'),
            path: resolve(packagesDir, 'client', 'build'),
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
              '@lib': resolve(packagesDir, 'client', 'src', 'client', 'lib'),
              '@components': resolve(packagesDir, 'client', 'src', 'client', 'common'),
              '@domain': resolve(packagesDir, 'domain', 'src', 'client')
            },
            modules: ['node_modules'],
            extensions: ['.ts', '.tsx', '.js', '.jsx']
          },
          module: {
            rules: [
              // Process ts files
              {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                include: [
                  resolve(__dirname, '..', '..', '..', 'domain', 'src'),
                  resolve(__dirname, '..', '..', '..', 'client', 'src')
                ],
                loader: require.resolve(resolve(__dirname, './utils/apiRequestGenerator'))
              },
              {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                include: [
                  resolve(__dirname, '..', '..', '..', 'domain', 'src'),
                  resolve(__dirname, '..', '..', '..', 'client', 'src')
                ],
                loader: require.resolve(resolve(__dirname, '..', '..', 'node_modules', 'ts-loader')),
                options: {
                  transpileOnly: true,
                  configFile: resolve(packagesDir, 'client', 'tsconfig.json')
                }
              },
              {
                test: /\.js$/,
                exclude: /node_modules/,
                include: [
                  resolve(__dirname, '..', '..', '..', 'domain', 'src'),
                  resolve(__dirname, '..', '..', '..', 'client', 'src')
                ],
                loader: 'source-map-loader'
              },
              {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                include: [
                  resolve(__dirname, '..', '..', '..', 'domain', 'src'),
                  resolve(__dirname, '..', '..', '..', 'client', 'src')
                ],
                loader: require.resolve(resolve(packagesDir, 'client', 'node_modules', 'ifdef-loader')),
                options: buildOpts
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

          },
          plugins: [
            new ForkTsCheckerWebpackPlugin(),
            new HtmlWebpackPlugin(
              Object.assign({}, {
                  inject: true,
                  template: resolve(packagesDir, 'client', 'static', 'index.html'),
                },
                isProduction ? {
                  minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                  },
                } :
                undefined
              ))
          ],
          externals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
          }

        })
      })

      // Rethrow nested errors, let webpack report error
      .catch(rejectConfig)
  })
})(process.env, process.argv)