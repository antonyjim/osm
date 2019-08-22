#!/usr/bin/node
 // Lint all packages

var {
  exec
} = require('child_process')
var {
  readdirSync
} = require('fs')
var {
  join
} = require('path')

var originalDir = __dirname
var packageDir = join(__dirname, '../packages')


// Change directories to the specified dir, 
// then run `npm install`
function execNpmI(dir) {
  return new Promise(function (resolve, reject) {
    process.chdir(dir)
    exec('npm run lint', function (err, stdout, stderr) {
      if (err) {
        console.error(err)
      }
      resolve()
    })
    process.chdir(originalDir)
  })
}

var allPackages = readdirSync(packageDir)
var allPackagePromises = []

// Loop through each directory
allPackages.forEach(function (package) {
  allPackagePromises.push(execNpmI(join(packageDir, '/', package)))
})

Promise.all(allPackagePromises)
  .then(function () {
    console.log('All done')
  })
  .catch(function (err) {
    console.error(err)
  })