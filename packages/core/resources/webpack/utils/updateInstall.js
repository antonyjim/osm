var fs = require('fs')
var resolve = require('path').resolve
var readdirSync = fs.readdirSync,
  writeFileSync = fs.writeFileSync
readFileSync = fs.readFileSync

/**
 * Update the .installed file for each package
 */
module.exports = function (buildId) {
  const packagesDir = resolve(
    __dirname, // utils
    '..', // webpack
    '..', // resources
    '..', // core
    '..', // packages
    '..', // osm
  )
  const buildInfo = JSON.parse(readFileSync(resolve(packagesDir, '.installed')).toString())
  fs.writeFileSync(resolve(packagesDir, '.installed'), JSON.stringify({
    ...buildInfo,
    build_id: buildId
  }, null, 2), {
    encoding: 'utf8'
  })

}