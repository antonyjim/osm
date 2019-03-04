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
  post: ({ path, query, body }, cb) => {
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

  get: ({ path, query }, cb) => {
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
  put: ({ path, query, body }, cb) => {
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
          success: (res) => {
            resolve(res)
          },
          error: (err) => {
            throw err
          }
        })
      })
    }
  }
}

export default API
