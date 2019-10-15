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
    '..', // core
    '..' // packages
  )
  const packages = readdirSync(
    packagesDir
  )
  packages.forEach(function (package) {
    var installJsObj = {}
    try {
      var existingInstallFile = readFileSync(resolve(packagesDir, package, '.installed'), 'utf8')
      installJsObj = JSON.parse(existingInstallFile.toString())
    } catch (e) {
      // .installed file not found
      console.warn('.installed not found in ', package)
    }

    installJsObj.build_id = buildId

    writeFileSync(resolve(packagesDir, '.installed'), package, 'utf8', JSON.stringify(installJsObj))
  })
}