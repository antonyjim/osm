/**
 * Our goal here is to create a schema entry file that we can use to create
 * a new database. At least, that's what I hope we're doing.
 */

var {
  readFileSync,
  writeFileSync
} = require('fs')
var {
  join
} = require('path')
var {
  createConnection
} = require('mysql')

var {
  generateHash
} = require('@lib/utils')

var tagRegex = /\{\{((?:.|\r?\n)+?)\}\}/g

var availableVars = {
  ...process.env,
  dirname: __dirname.toString().split('\\').join('/'),
  database: process.env.DB_NAME || 'osm'
}

console.log(availableVars.dirname)

var resultFile = `schema_source_${generateHash()}.sql`

module.exports = function (inputFile) {
  var interpolatedText = (function parseSql(text) {
    text = text
      .toString()
      .replace('\\', '\\\\')
      .replace('/', '//')

    // If no matches are found, return immediately
    if (!tagRegex.test(text)) {
      return text
    }

    var resultString = ''
    var match, index, tokenValue, resolvedValue
    let lastIndex = tagRegex.lastIndex = 0

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
  })(readFileSync(inputFile))

  writeFileSync(join(__dirname, resultFile), interpolatedText, {
    encoding: 'utf-8'
  })

  return resultFile
}