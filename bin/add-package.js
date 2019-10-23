`
Bootstrap a new package. New packages are one of 3 types:
 0: Separate client and server, but the server is written in typescript/javascript
 1: Separate server not written in javascript, but shared client
 2: Unified server and client, both to be required by their respective core module
`

// Read certain setup vars from input and copy the appropriate bootstrapper to the packages directory
var readline = require('readline')
var fs = require('fs')
var path = require('path')

var rl = readline.createInterface({
  input: process.stdin,
  output: fs.createWriteStream(path.resolve(__dirname, '..', 'log.txt'))
})

/**
 *
 * @param {string} question String representing question to be prompted to user
 * @param {string | RegExp} allowed Filter to apply to user input
 * @param {function} transform Callback to apply in addition to validation
 */
function ask(question, allowed, transform) {
  return new Promise(function (resolveAnswer, reject) {
    // Allow the user to provide a callback function
    let resolve = resolveAnswer
    if (typeof transform === 'function') {
      resolve = transform(resolveAnswer)
    }

    rl.question(question, function (answer) {
      if (allowed && Array.isArray(allowed) && allowed.indexOf(answer) > -1) {
        resolve(answer)
      } else if (allowed && Array.isArray(allowed)) {
        console.error(
          new Error(
            'Expected one of: ' + allowed.join(', ') + ' but got: ' + answer
          )
        )
        ask(...arguments)
      } else if (allowed instanceof RegExp) {
        if (allowed.test(answer)) {
          resolve(answer)
        } else {
          console.error(
            new Error(
              'Provided value does not match regexp ' + allowed.toString()
            )
          )
          ask(...arguments)
        }
      } else if (allowed === 'bool') {
        if (/^(true|false|1|0|yes|no|y|n)$/.test(allowed)) {
          resolve(answer)
        } else {
          console.error(new Error('Expected true or false, but got: ' + answer))
          ask(...arguments)
        }
      } else if (allowed === 'number') {
        var tryNum = parseInt(answer, 10)
        if (isNaN(tryNum)) {
          console.error('Expected number but got: ' + answer)
          ask(...arguments)
        } else {
          resolve(tryNum)
        }
      } else if (allowed === 'string') {
        if (/^\s$/.test(answer) || answer.length === 0) {
          console.error(new Error('Expected string'))
          ask(...arguments)
        } else {
          resolve(answer)
        }
      } else {
        resolve(answer)
      }
    })
  })
}

function execBootstrapper(bootstrapType) {
  var tagRegex = /\{\{((?:.|\r?\n)+?)\}\}/g

  // If no matches are found, return immediately
  if (!tagRegex.test(text)) {
    return text
  }

  var resultString = ''
  var match, index, tokenValue, resolvedValue
  let lastIndex = (tagRegex.lastIndex = 0)

  while ((match = tagRegex.exec(text))) {
    index = match.index
    console.log(availableVars[match[1].trim()])

    // Clean off any extra spaces on the interpolated var
    resultString += text.slice(lastIndex, index)
    resultString += availableVars[match[1].trim()]
    lastIndex = index + match[0].length
  }

  if (lastIndex < text.length) {
    resultString += text.slice(lastIndex)
  }

  return resultString

}



var nameRegex = new RegExp(
  '^(?:@[a-z0-9-~][a-z0-9-._~]*/)?[a-z0-9-~][a-z0-9-._~]*$'
)

var availableVars = {
  ...process.env,
  shortName: '',
  description: '',
  baseRoute: '',
  longName: '',
  friendlyName: '',
  appScope: '',
  dirname: __dirname
    .toString()
    .split('\\')
    .join('/'),
  database: process.env.DB_NAME || 'osm'
}

ask('Enter short url friendly package name: ', nameRegex)
  .then((packageName) => {
    availableVars.shortName = packageName
    return ask(
      'Enter a long name for use in configuration (' + packageName + ')'
    )
  })
  .then((longName) => {
    if (longName !== '') {
      availableVars.longName = longName
    } else {
      availableVars.longName = longName.shortName
    }
    return ask('Enter a short description of your module', 'string')
  })
  .then((description) => {
    availableVars.description = description
    return ask(`
Which type of module are you creating?
1: Standalone client with server written in ts/js
2: Shared client with standalone server written in different language
3: Shared client & server with both written in ts/js
`, ['1', '2', '3'])
  })
  .then((selectedType) => {
    switch (selectedType) {
      case '1': {
        execBootstrapper('0')
        break
      }
      case '2': {
        ask(`
With this sort of deployment, OSM can automatically spawn a new process, or forward
authenticated requests to your sub-app. Would you like to:
 1: Have OSM spawn a new instance of your app
 2: Have OSM proxy authenticated requests to your app
        `, ['1', '2'])
          .then(spawnOpt => {
            if (spawnOpt === '1') {
              ask(`
By default, OSM will pass an environment arg called OSM_PROXY_LISTEN_${availableVars.shortName.toUpperCase()} 
which contains the port number for OSM to forward requests to. If your app listens on a static port, enter that port now.`, ).then(listenPort => {
                if (listenPort) {
                  availableVars.proxyArgs = 'localhost:' + listenPort
                } else {
                  availableVars.proxyArgs = 'env'
                }

                return ask(`
Enter the command line arguments to spawn your sub-application, relative to the root of your package.
e.g. For the \`domain\` package, the spawn args are \`python app/server.py\`
`).then(spawnArgs => {
                  availableVars.spawnArgs = spawnArgs
                  execBootstrapper('1')
                })
              })
            } else {
              // spawnOpt = 2
              ask(`Enter the proxy port in [address]:[port] notation.`)
                .then(proxyArgs => {
                  availableVars.proxyArgs = proxyArgs
                  availableVars.spawnArgs = ''
                  execBootstrapper('1')
                })
            }
          })
        break
      }

      case '3': {

      }
    }
  })