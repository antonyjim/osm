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
  generateHash
} = require('@lib/utils')

var tagRegex = /\{\{((?:.|\r?\n)+?)\}\}/g

var resultFile = `schema_source_${generateHash()}.sql`

module.exports = function (inputFile, package) {
  var availableVars = {
    ...process.env,
    dirname: join(__dirname, package, 'sql').toString().split('\\').join('/'),
    database: process.env.DB_NAME || 'osm'
  }
  var interpolatedText = (function parseSql(text) {
    // Escape escaped forward and backslashes
    text = text
      .toString()
      .replace('\\', '\\\\')
      .replace(/(!\*)\/(?!\*)/gi, '//')

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

  return join(__dirname, resultFile)
}