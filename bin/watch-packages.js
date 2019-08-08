// Watch for changes in the packages/*/src directories
var {
  readdirSync,
  existsSync,
  readFileSync
} = require('fs')
var {
  spawn
} = require('child_process')
var {
  join
} = require('path')

var packageDir = join(__dirname, '../packages')
var originalCwd = process.cwd()

// Execute `npm run watch` from each directory
readdirSync(packageDir).forEach(function (package) {
  var packageJsonPath = join(packageDir, package, 'package.json')
  // Make sure package.json exists
  if (existsSync(packageJsonPath)) {
    try {
      var jsonContents = readFileSync(packageJsonPath).toString()
      jsonContents = JSON.parse(jsonContents)

      // Look for the watch script
      if (jsonContents.scripts.watch) {
        // Change to the package directory
        process.chdir(join(packageDir, package))
        var thisChild = spawn('npm', ['run', 'watch'], {
          env: {
            ...process.env,
            NODE_ENV: 'development'
          },
          shell: true
        })

        thisChild.stdout.on('data', function (data) {
          process.stdout.write(`[${package.toUpperCase()}] LOG MESSAGE: ${new Date().toDateString()}`)
          process.stdout.write(data)
          process.stdout.write(Buffer.from('\n', 'utf-8'))
        })

        thisChild.stderr.on('data', function (data) {
          process.stderr.write(data)
          process.stderr.write(Buffer.from('\n', 'utf-8'))
        })

        thisChild.on('error', function (err) {
          console.error(err.toString())
          process.stderr.write(Buffer.from('\n', 'utf-8'))
        })

        thisChild.on('message', function (message) {
          console.log(message.toString())
        })

        process.chdir(originalCwd)
      }
    } catch (err) {
      console.error(err)
    }
  }
})