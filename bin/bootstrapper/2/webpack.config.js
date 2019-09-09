/**
 * With a client and server package, we need to bundle the client into one
 * folder while bundling the server resources into one single file
 */

// import helpers
const path = require('path')

// Define constants
const packageName = requrie('./package.json').name



// Export config
module.exports = new Promise((resolveWebpackConfig, rejectWebpackConfig) => {

  const serverConfig = {
    target: 'node',
    devtool: 'source-map',
    mode: 'development',
    entry: {
      lib: path.resolve(__dirname, 'src', 'server', 'lib'),
      routes: path.resolve(__dirname, 'src', 'server', 'routes')
    },
    output: {
      path: path.resolve(__dirname, 'dist', 'server'),
      filename: `${packageName}.[name].bundle.js`
    }
  }

  const clientConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: entryPoints
  }


  return resolveWebpackConfig([serverConfig, clientConfig])
})