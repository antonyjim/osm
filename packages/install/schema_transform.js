/**
 * Our goal here is to create a schema entry file that we can use to create
 * a new database. At least, that's what I hope we're doing.
 */

var {
  readFileSync,
  writeFileSync,
  existsSync
} = require('fs')
var {
  join,
  resolve
} = require('path')

var {
  generateHash
} = require('../core/dist/lib/utils')


var resultFile = `gen_schema_source_${generateHash()}.sql`

/**
 * Replaces tags in {{}} with provided values
 * @param {string} text Text to replace tags in
 * @param {any} obj Object containing replacement values
 */
function replaceTags(text, obj) {
  var tagRegex = /\{\{((?:.|\r?\n)+?)\}\}/g
  // If no matches are found, return immediately
  if (!tagRegex.test(text)) {
    return text
  }

  var resultString = ''
  var match, index, tokenValue, resolvedValue
  let lastIndex = tagRegex.lastIndex = 0

  while ((match = tagRegex.exec(text))) {
    index = match.index


    // Clean off any extra spaces on the interpolated var
    resultString += text.slice(lastIndex, index)
    resultString += obj[match[1].trim()]
    lastIndex = index + match[0].length
  }

  if (lastIndex < text.length) {
    resultString += text.slice(lastIndex)
  }

  return resultString
}


module.exports = function (inputFile, package) {
  var availableVars = {
    ...process.env,
    // dirname: join(__dirname, 'packages', package, 'sql').toString().split('\\').join('/'),
    dirname: join(__dirname, 'packages', package, 'sql').toString(),
    database: process.env.DB_NAME || 'osm'
  }
  // Store the contents of the new file
  let newFile = `
    /**************************************************
     * AUTOMATICALLY GENERATED
     * SQL SOURCE FILE ${resultFile}
     * FOR ${availableVars.database} MYSQL DATABASE.
     *
     * GENERATED AT ${new Date().toISOString()}
     * 
     * THIS FILE HAS ALREADY BEEN SOURCED TO CREATE
     * DATABASE TABLES AND INFORMATION. DO NOT MODIFY
     * FILE. CHANGES WILL NOT PROPOGATE TO DATABASE
     *************************************************/
      `
  let wholeFile = ''

  let interpolatedText = (function parseSql(text) {
    wholeFile += replaceTags(text, availableVars)
    // Escape escaped forward and backslashes
    text = text
      .toString()
      .replace('\\', '\\\\')
      .replace(/(!\*)\/(?!\*)/gi, '//')

    // Replace SOURCE calls with content from those files
    const sourceRegexp = /^SOURCE[^]/igm
    const semiColonRegexp = /(?:;)$/m
    let sourceMatch

    // Look for SOURCE in the index sql file
    while ((sourceMatch = sourceRegexp.exec(wholeFile))) {

      // Store the start of the file path
      let firstSourceIndex = sourceRegexp.lastIndex
      // Look from the end of SOURCE to the end of the file for a semicolon
      const semiColonMatch = semiColonRegexp.exec(wholeFile.slice(firstSourceIndex, -1))
      let endOfStatement = semiColonRegexp.lastIndex
      let sourceFileName = wholeFile.slice(firstSourceIndex, firstSourceIndex + semiColonMatch.index)
      if (existsSync(resolve(sourceFileName))) {
        // Insert the sql from file specified in SOURCE command
        const sqlFromFile = readFileSync(resolve(sourceFileName)).toString()
        const fileHeader = `
/******************************************
 * File sourced from ${sourceFileName}
 * ***************************************/
`
        let firstPart = wholeFile.substring(0, sourceMatch.index)
        // Append the rest of the file after the SOURCE statment, excluding the SOURCE statement
        let lastPart = wholeFile.slice(firstSourceIndex + semiColonMatch.index + 1)
        wholeFile = firstPart + fileHeader + replaceTags(sqlFromFile, availableVars) + lastPart
      } else {
        throw new Error('Could not resolve filename ' + sourceFileName)
      }
    }

    return newFile + wholeFile

  })(readFileSync(inputFile))

  writeFileSync(join(__dirname, resultFile), interpolatedText, {
    encoding: 'utf-8'
  })

  return join(__dirname, resultFile)
}