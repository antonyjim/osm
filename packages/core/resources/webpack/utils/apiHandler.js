// Transform `new ApiResource()` calls into `fetch()` calls
const connection = require('mysql').createConnection({
  user: process.env.DB_USER || 'node',
  password: process.env.DB_PASS || 'development',
  database: process.env.DB_DB || 'osm',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306
})

const vm = require('vm')
const env = {
  OSM: {
    user: {
      id: true,
      name: true,
      roles: true
    },
    scope: true,
    domain: true
  }
}
const context = vm.createContext()

export default (function parseResourceRequests(source) {
  let matchEnd = 0
  const objName = 'new ApiResource'
  // Look for the first match on objName
  let searchStart = source.indexOf(objName, matchEnd)
  let parsedStringObj = null

  // Loop through and look for parenteses
  while (searchStart > -1 && matchEnd < source.length) {
    const openingParen = source.indexOf('(', searchStart) + 1
    let endOfParentheses = openingParen + 1
    let nested = 0
    while ((source[endOfParentheses] !== ')' || nested !== 0) && endOfParentheses < source.length) {
      if (source[endOfParentheses] === '(') {
        nested++
      } else if (source[endOfParentheses] === ')') {
        nested--
      }
      endOfParentheses++
    }

    matchEnd = endOfParentheses + 1
    searchStart = source.indexOf(objName, matchEnd)
    parsedStringObj = source.substring(openingParen, endOfParentheses)
  }

  console.log(parsedStringObj)
  let queryConfigObj = {}

  try {
    queryConfigObj = eval(`(function(){return ${parsedStringObj}})()`)
  } catch (err) {
    throw new TypeError('Error parsing query config with error ' + err.toString())
  }

  return queryConfigObj
})('new ApiResource({somekey: OSM.user.userId})')