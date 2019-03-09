import $ from 'jquery'

function flattenQuery(queryObject) {
  const queryStringArray = [`token=${window.THQ.token || ''}`]
  if (queryObject && typeof queryObject === 'object') {
    Object.keys(queryObject).map((queryKey) => {
      queryStringArray.push(
        `${queryKey}=${encodeURIComponent(queryObject[queryKey])}`
      )
    })
  } else if (queryObject) {
    queryStringArray.push(queryObject)
  }
  return queryStringArray.join('&')
}

const API = {
  // Define constants
  TABLE: '/api/q/',
  post: (
    {
      path,
      query,
      body
    }: {
      path: string
      query?: { [key: string]: string }
      body: { [key: string]: string }
    },
    cb?
  ) => {
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
            res.ok = () => {
              return true
            }
            resolve(res)
          },
          error: (err) => {
            throw err
          }
        })
      })
    }
  },

  get: (
    {
      path,
      query
    }: {
      path: string
      query?: object
    },
    cb?
  ) => {
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
  put: ({ path, query, body }, cb?) => {
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
                info: [
                  {
                    message: 'Record updated'
                  }
                ]
              })
            },
            201: () => {
              resolve({
                info: [
                  {
                    message: 'Record inserted'
                  }
                ]
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
  patch: (
    {
      path,
      query,
      body
    }: {
      path: string
      query?: object
      body?: any
    },
    cb?
  ) => {
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
          if (res) {
            res.okay = () => {
              return true
            }
            cb(null, res)
          }
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

export class TowelRecord {
  private tableName: string
  private id: string

  constructor(table) {
    this.tableName = table
  }

  public async update(sysId, body) {
    return new Promise((resolve) => {
      this.id = sysId
      if (this.tableName && this.tableName.endsWith('_list')) {
        this.tableName = this.tableName.slice(0, -5)
      }

      if (!sysId) {
        throw new Error('Missing id to update record')
      }
      API.patch({
        path: `/api/q/${this.tableName}/${this.id}`,
        body
      })
        .then((response) => {
          console.log(response)
          resolve(response)
        })
        .catch((err) => {
          console.error(err)
          resolve({
            error: err
          })
        })
    })
  }

  public async get({
    fields,
    args,
    id
  }: {
    fields?: string[] | string
    args?: object
    id?: string
  }) {
    return new Promise((resolve) => {
      if (id && this.tableName.endsWith('_list')) {
        this.tableName = this.tableName.slice(0, -5)
      }
      const path = id
        ? `/api/q/${this.tableName}/${id}`
        : `/api/q/${this.tableName}`
      API.get({
        path,
        query: {
          fields,
          args
        }
      })
        .then((res) => {
          return resolve(res)
        })
        .catch((err) => {
          console.error(err)
          return resolve({
            error: err
          })
        })
    })
  }

  public create(body, fields?) {
    return new Promise((resolve) => {
      API.post({
        path: '/api/q/' + this.tableName,
        body,
        query: {
          fields: fields || ''
        }
      })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          resolve({
            error: err
          })
        })
    })
  }
}

export default API
