import $ from 'jquery'

function flattenQuery(queryObject) {
  let queryStringArray = [`token=${window.THQ.token || ''}`]
  if (queryObject && typeof queryObject === 'object') {
    Object.keys(queryObject).map((queryKey) => {
      queryStringArray.push(
        `${queryKey}=${encodeURIComponent(queryObject[queryKey])}`
      )
    })
  } else if (queryObject) {
    queryStringArray.push(query)
  }
  return queryStringArray.join('&')
}

const API = {
  // Define constants
  TABLE: '/api/q/',
  post: ({
    path,
    query,
    body
  }, cb) => {
    const authPath = path + '?' + flattenQuery(query)
    console.log('Making POST request to ' + authPath)
    if (cb !== null && cb !== undefined) {
      $.ajax(authPath, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        data: JSON.stringify(body),
        success: (res) => {
          cb(null, res)
        },
        error: (err) => {
          cb(err)
        }
      })
    } else {
      return new Promise((resolve, reject) => {
        $.ajax(authPath, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          data: JSON.stringify(body),
          success: (res) => {
            resolve(res)
          },
          error: (err) => {
            throw err
          }
        })
      })
    }
  },

  get: ({
    path,
    query
  }, cb) => {
    const authPath = path + '?' + flattenQuery(query)
    console.log('Making GET request to ' + authPath)
    if (cb !== null && cb !== undefined) {
      $.ajax(authPath, {
        headers: {
          Accept: 'application/json'
        },
        method: 'GET',
        success: (res) => {
          cb(null, res)
        },
        error: (err) => {
          cb(err)
        }
      })
    } else {
      return new Promise((resolve, reject) => {
        $.ajax(authPath, {
          headers: {
            Accept: 'application/json'
          },
          method: 'GET',
          success: (res) => {
            resolve(res)
          },
          error: (err) => {
            throw err
          }
        })
      })
    }
  },

  /**
   * @param {string} path URL to make request to
   * @param {object} query Query string parameters in object format
   * @param {object} body Body of update parameters
   */
  put: ({
    path,
    query,
    body
  }, cb) => {
    const authPath = path + '?' + flattenQuery(query)
    if (cb !== null && cb !== undefined) {
      $.ajax(authPath, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        data: JSON.stringify(body),
        method: 'PUT',
        success: (res) => {
          cb(null, res)
        },
        error: (err) => {
          cb(err)
        }
      })
    } else {
      return new Promise((resolve, reject) => {
        $.ajax(authPath, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          data: JSON.stringify(body),
          method: 'PUT',
          statusCode: {
            204: () => {
              resolve({
                info: [{
                  message: 'Record updated'
                }]
              })
            },
            201: () => {
              resolve({
                info: [{
                  message: 'Record inserted'
                }]
              })
            }
          },
          error: (err) => {
            throw err
          }
        })
      })
    }
  },
  /**
   * @param {string} path URL to make request to
   * @param {object} query Query string parameters in object format
   * @param {object} body Body of update parameters
   */
  patch: ({
    path,
    query,
    body
  }, cb) => {
    const authPath = path + '?' + flattenQuery(query)
    if (cb !== null && cb !== undefined) {
      $.ajax(authPath, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        data: JSON.stringify(body),
        method: 'PATCH',
        success: (res) => {
          cb(null, res)
        },
        error: (err) => {
          cb(err)
        }
      })
    } else {
      return new Promise((resolve, reject) => {
        $.ajax(authPath, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          data: JSON.stringify(body),
          method: 'PATCH',
          statusCode: {
            204: (res) => {
              resolve({
                statusCode: 204,
                okay: () => {
                  return true
                }
              })
            },
            201: (res) => {
              resolve(res)
            }
          },
          error: (err) => {
            throw err
          }
        })
      })
    }
  }
}

export function TowelRecord(table) {
  this.tableName = table
  return this
}

TowelRecord.prototype.update = async function (sysId, body) {
  return new Promise(resolve => {
    this.id = sysId
    if (this.tableName.endsWith('_list')) this.tableName = this.tableName.slice(0, -5)

    if (!sysId) {
      throw new Error('Missing id to update record')
    }
    API.patch({
        path: `/api/q/${this.tableName}/${this.id}`,
        body
      })
      .then(response => {
        console.log(response)
        resolve(response)
      })
      .catch(err => {
        console.error(err)
        resolve({
          error: err
        })
      })
  })
}

TowelRecord.prototype.get = async function ({
  fields,
  args,
  id
}) {
  return new Promise(resolve => {
    if (id && this.tableName.endsWith('_list')) {
      this.tableName = this.tableName.slice(0, -5)
    }
    const path = id ?
      `/api/q/${this.tableName}/${id}` :
      `/api/q/${this.tableName}`
    API.get({
        path,
        query: {
          fields,
          args
        }
      })
      .then(res => {
        return resolve(res)
      })
      .catch(err => {
        console.error(err)
        return resolve({
          error: err
        })
      })
  })

}

TowelRecord.prototype.create = async function (body, fields) {
  return new Promise(resolve => {
    API.post({
        path: '/api/q/' + this.tableName,
        body,
        query: {
          fields: fields || ''
        }
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        resolve({
          error: err
        })
      })
  })

}

export default API