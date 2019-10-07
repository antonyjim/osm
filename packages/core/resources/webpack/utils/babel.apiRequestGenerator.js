'use strict'

var parse = require('@babel/parser').parse

function findOSMNamespace(astObj) {

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

function astObjToJsObj(astObjProps) {
  var jsObj = {}
  astObjProps.forEach(function (astObjProp) {
    var propKeyName = getObjPropName(astObjProp)

    switch (astObjProp.value.type) {
      case 'StringLiteral':
      case 'NumericLiteral':
      case 'NullLiteral':
      case 'RegExpLiteral':
      case 'BooleanLiteral': {

        jsObj[propKeyName] = astObjProp.value.value
        break
      }
      case 'LogicalExpression': {

      }
    }

    jsObj[astObjProp.key.name]
  })


}

/**
 * Parses the ApiResource constructor looking for the query descriptors,
 * then return a serialization of that query.
 * @param {*} astArgs AST representation of object properties passed to new ApiResource
 */
function parseApiResourceArg(astArgs) {
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
              var operator = '='

              // Since the operator is not required, we do a search for [OPERATOR] syntax
              if ((operator = propName.match(/\[(.*)\]/)) !== null) {
                propName = propName.replace(operator[0], '').trim()
                operator = operator[1]
              }

              // After getting the name of the prop, look for its type.
              // Literal types can be turned into static arguments.
              // window.OSM.session properties can be turned into
              // static arguments as well.

              // Any other Identifiers can be be turned into dynamic arguments
              switch (condProp.type) {
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
                case 'MemberExpression': {
                  if (condProp.object) {
                    var originalSlice = source.slice(condProp.object.start, condProp.object.end)
                  }
                }
              }
            })

            return [_staticArgs, _dynamicArgs]
          })(astObjProp.value)
        } else {
          throw new Error('`conditions` must be specified as an object literal. Got ' + condProp.type)
        }
        break
      }
      case 'table':
      case 'role':
      case 'alias': {
        if (astObjProp.type === 'StringLiteral') {
          jsObj[propKeyName] = astObjProp.value.value
        } else {
          throw new Error('`' + propKeyName + '` may only be represented by a string literal. Got ' + astObjProp.type)
        }
        break
      }

      case 'fields': {
        if (astObjProp.type !== 'ArrayExpression') {
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
    }

    jsObj[astObjProp.key.name]
  })
}

/**
 * Converts ast representation of object into JS representation
 * @param {*} apiResourceNode Ast representation of new ApiResource.arguments
 */
function parseApiResourceNode(apiResourceNode) {
  if (apiResourceNode.length > 1) {
    throw new Error('ApiResource constructor may only be called with 1 object argument. Received ' + apiResourceNode.length)
  } else if (apiResourceNode.length === 0) {
    throw new Error('ApiResource constructor must be called with 1 object argument. Received 0')
  } else if (apiResourceNode[0].type !== 'ObjectExpression') {
    throw new Error('ApiResource constructor may only be called with 1 object argument. Received 1 ' + apiResourceNode[0].type)
  } else {
    parseApiResourceArg(apiResourceNode[0].properties)
  }
}

/**
 * Look for new ApiResource calls
 * @param {*} astNode Ast Representation of any Node
 */
function parseNode(astNode) {
  // Slices are what need to be removed from the source file in place
  // of the fetch request
  var slices = []
  // These are the actual objects that are represented in the source code
  var apiResourceObjsInNode = []
  switch (astNode.type) {
    case 'NewExpression': {
      if (astNode.expression.callee.name === 'ApiResource') {
        var apiResource = parseApiResourceNode(astNode.expression.arguments)
        slices.push({
          start: apiResource.start,
          end: apiResource.end
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
    case 'ExpressionStatement':
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
    case 'ArrowFunctionExpression':
    case 'DoExpression':
    case 'Function': {
      astNode.forEach(function (rootNode) {
        var apiResourceObj = parseNode(rootNode)
        if (apiResourceObj !== null) {
          apiResourceObjsInNode.push(...apiResourceObj)
        }
      })
      break;
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

function parseAst(ast) {
  var rootProgram = ast.program.body
  var apiResourceObjs = []
  var slices = []
  rootProgram.forEach(function (rootNode) {
    var apiResourceObj = parseNode(rootNode)
    if (apiResourceObj.resources !== null) {
      apiResourceObjs.push(...apiResourceObj.resources)
    }

    if (apiResourceObjs.slices !== null) {
      slices.push(...apiResourceObjs.slices)
    }
  })

  return apiResourceObjs
}

/**
 * Parse an object and serialize it into something to be inserted into
 * the sys_generated_resource table
 * @param {*} obj An object containing details for a single query
 */
function generateQuery(obj) {

}

module.exports = function (source) {
  var queries = []
  var ast = parse(source, {
    strictMode: true,
    plugins: ['jsx']
  })
  var objToSerialize = parseAst(ast)
  queries = objToSerialize.map(generateQuery)


  return source
}