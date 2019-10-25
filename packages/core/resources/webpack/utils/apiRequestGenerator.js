'use strict'

var parse = require('@babel/parser').parse
var generateHash = require('../../../dist/lib/utils').generateHash
var simpleQuery = require('../../../dist/lib/connection').simpleQuery

/**
 * 
 * @param {*} astObj Ast representation of object reference
 */
function getDotNotation(astObj) {
  if (astObj.type === 'MemberExpression') {
    var currentNode = astObj
    var parts = []
    while (currentNode.type === 'MemberExpression') {
      if (currentNode.property.type === 'Identifier') {
        parts.push(currentNode.property.name)
      } else if (currentNode.property.type === 'StringLiteral') {
        if (currentNode.property.value.indexOf(' ') > -1) {
          // Eventually need to push this to a specific thing
          parts.push(currentNode.property.value)
        }
      } else {
        parts.push()
      }
      currentNode = currentNode.object
    }

    if (currentNode.type === 'Identifier') {
      parts.push(currentNode.name)
    }
  }
  parts = parts.filter((val) => {
    return val !== 'window'
  })
  return parts.reverse().join('.')
}

function getObjPropName(obj) {
  var propKeyName
  switch (obj.key.type) {
    case 'StringLiteral': {
      propKeyName = obj.key.value
      break
    }
    default: {
      propKeyName = obj.key.name
    }
  }

  return propKeyName
}

/**
 * Parses the ApiResource constructor looking for the query descriptors,
 * then return a serialization of that query.
 * @param {*} astArgs AST representation of object properties passed to new ApiResource
 */
function parseApiResourceArg(astArgs, sourceFile) {
  var jsObj = {}
  // Search through each property listed in the `new ApiResource` call.
  // Handle each one appropriately
  astArgs.forEach(function (astObjProp) {
    var propKeyName = getObjPropName(astObjProp)

    switch (propKeyName) {
      // Look for the object containing the conditions for the query
      case 'conditions': {
        // If we are passed an option other than an object, we can't format the query
        if (astObjProp.type !== 'ObjectExpression') {
          // There are 2 types of arguments. Session arguments and client arguments
          // static arguments are available in the window.OSM.session object in the
          // client or when an object literal (i.e. not a variable)

          // dynamic arguments are any other object or variable. These arguments will
          // be transformed into obfuscated query string parameters in the serialized
          // fetch request.

          // The reason we need to differentiate is because static arguments cannot be passed
          // from the client. They are only available in the context of the user making the
          // request. Therefore, the only arguments available in the window.OSM.session are
          // only pertinent to the user making the request such as user id, roles, etc...
          var [staticArgs, dynamicArgs] = (function parseConditions(condAst) {
            var _staticArgs = []
            var _dynamicArgs = []
            condAst.properties.forEach(function (condProp) {
              // Operators can be specified on the key of a field name
              // in the format ['key[OPERATOR]']. For example: 
              // conditions: {
              //   'last_login[<]': new Date()
              // }
              var propName = getObjPropName(condProp)
              var operator

              // Since the operator is not required, we do a search for [OPERATOR] syntax
              if ((operator = propName.match(/\[(.*)\]/)) !== null) {
                propName = propName.replace(operator[0], '').trim()
                operator = operator[1]
              } else {
                operator = '='
              }

              // After getting the name of the prop, look for its type.
              // Literal types can be turned into static arguments.
              // window.OSM.session properties can be turned into
              // static arguments as well.

              // Any other Identifiers can be be turned into dynamic arguments
              switch (condProp.value.type) {
                case 'StringLiteral':
                case 'NumericLiteral':
                case 'NullLiteral':
                case 'BooleanLiteral': {
                  _staticArgs.push({
                    field: propName,
                    operator: operator,
                    value: condProp.value.value
                  })
                  break
                }

                // Get the 'object.child.childItem' notation
                case 'MemberExpression': {
                  if (condProp.value) {
                    var dots = getDotNotation(condProp.value)
                    if (dots.startsWith('OSM.session')) {
                      _staticArgs.push({
                        field: propName,
                        operator: operator,
                        reqKey: dots.replace('OSM.session.', '')
                      })
                    } else {
                      _dynamicArgs.push({
                        field: propName,
                        operator: operator,
                        rawVal: sourceFile.slice(condProp.value.start, condProp.value.end)
                      })
                    }
                  }

                  break
                }

                default: {
                  // Create dynamic args
                  _dynamicArgs.push({
                    field: propName,
                    operator: operator,
                    literalVal: sourceFile.slice(condProp.value.start, condProp.value.end)
                  })
                }
              }
            })

            return [_staticArgs, _dynamicArgs]
          })(astObjProp.value)
          jsObj.static_conditions = staticArgs
          jsObj.dynamic_conditions = dynamicArgs
        } else {
          throw new Error('`conditions` must be specified as an object literal. Got ' + condProp.type)
        }
        break
      }
      case 'table':
      case 'role':
      case 'alias': {
        if (astObjProp.value.type === 'StringLiteral') {
          jsObj[propKeyName] = astObjProp.value.value
        } else {
          throw new Error('`' + propKeyName + '` may only be represented by a string literal. Got ' + astObjProp.type)
        }
        break
      }

      case 'fields': {
        if (astObjProp.value.type !== 'ArrayExpression') {
          throw new Error('`fields` may only be represented by an array of string literals.')
        } else {
          jsObj.fields = astObjProp.value.elements.map(function (el) {
            if (el.type === 'StringLiteral') {
              return el.value
            } else {
              throw new Error('`fields` may only be represented by an array of string literals. Got ' + el.type)
            }
          })
        }
        break
      }

      default: {
        console.warn('Unknown ApiResource option: %s', propKeyName)
      }
    }
  })

  return jsObj
}

/**
 * Converts ast representation of object into JS representation
 * @param {*} apiResourceNode Ast representation of new ApiResource.arguments
 */
function parseApiResourceNode(apiResourceNode, sourceFile) {
  if (apiResourceNode.length > 1) {
    throw new Error('ApiResource constructor may only be called with 1 object argument. Received ' + apiResourceNode.length)
  } else if (apiResourceNode.length === 0) {
    throw new Error('ApiResource constructor must be called with 1 object argument. Received 0')
  } else if (apiResourceNode[0].type !== 'ObjectExpression') {
    throw new Error('ApiResource constructor may only be called with 1 object argument. Received 1 ' + apiResourceNode[0].type)
  } else {
    return parseApiResourceArg(apiResourceNode[0].properties, sourceFile)
  }
}

/**
 * Look for new ApiResource calls
 * @param {*} astNode Ast Representation of any Node
 */
function parseNode(astNode, sourceFile) {
  // Slices are what need to be removed from the source file in place
  // of the fetch request
  var slices = []
  // These are the actual objects that are represented in the source code
  var apiResourceObjsInNode = []
  switch (astNode.type) {
    case 'NewExpression': {
      if (astNode.callee.name === 'ApiResource') {
        var apiResource = parseApiResourceNode(astNode.arguments, sourceFile)
        slices.push({
          start: astNode.start,
          end: astNode.end
        })
        if (!Array.isArray(apiResource)) {
          apiResourceObjsInNode.push(apiResource)
        } else {
          apiResourceObjsInNode.push(...apiResource)
        }
      }
      break;
    }

    /**
     * All of these statements have a body that can be parsed
     */
    case 'ArrowFunctionExpression':
    case 'ExpressionStatement': {
      var apiResourceObj = parseNode(astNode.expression, sourceFile)
      if (apiResourceObj !== null) {
        apiResourceObjsInNode.push(...apiResourceObj.resources)
        slices.push(...apiResourceObj.slices)
      }
      break
    }
    case 'BlockStatement':
    case 'ReturnStatement':
    case 'LabeledStatement':
    case 'WithStatement':
    case 'Function':
    case 'Class':
    case 'ClassBody':
    case 'WhileStatement':
    case 'DoWhileStatement':
    case 'ForStatement':
    case 'ForInStatement':
    case 'ForOfStatement':
    case 'DoExpression':
    case 'Function': {
      astNode.forEach(function (rootNode) {
        var apiResourceObj = parseNode(rootNode, sourceFile)
        if (apiResourceObj !== null) {
          apiResourceObjsInNode.push(...apiResourceObj)
        }
      })
      break
    }

    default: {
      break
    }
  }

  return {
    resources: apiResourceObjsInNode,
    slices: slices
  }
}

function parseAst(ast, sourceFile) {
  var rootProgram = ast.program.body
  var apiResourceObjs = []
  var slices = []
  rootProgram.forEach(function (rootNode) {
    var apiResourceObj = parseNode(rootNode, sourceFile)
    if (apiResourceObj.resources) {
      apiResourceObjs.push(...apiResourceObj.resources)
    }

    if (apiResourceObjs.slices) {
      slices.push(...apiResourceObjs.slices)
    }
  })

  return [apiResourceObjs, slices]
}

/**
 * Parse an object and serialize it into something to be inserted into
 * the sys_generated_resource table
 * @param {*} obj An object containing details for a single query
 */
function generateQuery(obj) {
  console.log('%o', obj)
  var buildHash = process.env.OSM_BUILD_ID
  var returnObj = {}
  var requestHash = generateHash()
  var returnQuery = '/api/_/' + buildHash + '/' + requestHash + '?'

  // Look for raw options
  if (obj.raw && obj.raw.sql) {
    return {
      raw: {
        sql: obj.raw.sql,
        params: obj.raw.params
      }
    }
  } else {
    returnObj = {
      dynamic_conditions: [],
      static_conditions: []
    }
    // Check to make sure all required attributes are there
    if (!obj.table) {
      throw new Error('`table` is required when creating an ApiResource request.')
    } else {
      returnObj.table = obj.table
    }

    if (obj.alias) {
      returnObj.alias = obj.alias
    }

    if (obj.fields) {
      returnObj.fields = obj.fields
    } else {
      console.warn('`fields` was null or undefined. Server generated code will \
use the default fields at app startup which are subject to change through configuration.')
    }

    obj.dynamic_conditions.forEach(function (dynArg, i) {
      // If there is no table alias specified, then we will assume
      // the dev is attempting to select a field from the first table.
      // Joined fields are required to have the alias specified
      var tableAlias
      if (!(tableAlias = dynArg.field.match(/^\$(\d*)/g))) {
        dynArg.field = '$1.' + dynArg.field
      }

      // Create a random alias for this field
      var queryAlias = generateHash(5)
      if (i > 0) {
        returnQuery += '&'
      }
      returnQuery += (queryAlias + '=' + dynArg.rawVal)

      returnObj.dynamic_conditions.push({
        field: dynArg.field,
        operator: dynArg.operator,
        alias: queryAlias
      })
    })

  }

  return [returnQuery, {
    resource_hash: requestHash,
    sql_query: JSON.stringify(returnObj),
    build_id: buildHash
  }]

}

module.exports = function (source) {
  this.async()
  // Since this is very much dependent on build ids
  this.cacheable = false
  var newSource = ''
  var ast = parse(source, {
    strictMode: true,
    plugins: ['jsx', 'dynamicImport'],
    sourceType: 'module'
  })
  var [objToSerialize, slices] = parseAst(ast, source)
  var [fetch, queries] = objToSerialize.map(generateQuery)

  if (slices.length !== objToSerialize.length) {
    console.warn('An unequal amount of slices were found compared to ApiResource requests.')
  }

  slices.forEach(function (slice, i) {
    newSource += source.slice(0, slice.from) + fetch[i] + source.slice(slice.to)
  })

  if (queries) {
    simpleQuery('INSERT INTO sys_generated_resource ?', queries)
      .then(() => {
        this.callback(null, newSource)
      })
      .catch((err) => {
        this.callback(err, source)
        // this.callback(source)
      })
  } else {
    this.callback(null, source)
  }

}