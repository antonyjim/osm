import { ITHQWindowNamespace } from '../typings'

declare global {
  interface Window {
    MonacoEnvironment: any
    $: JQuery
    THQ: ITHQWindowNamespace
  }
}

interface IAPIResponse {
  errors?: [
    {
      message: string
      field?: string
    }
  ]
  warnings?: [
    {
      message: string
      field?: string
    }
  ]
  info?: [
    {
      message: string
    }
  ]
  data?: {
    [table: string]: {
      [column: string]: string
    }
  }
  meta?: {
    from: number
    to: number
  }
}

function makeFetchRequest(uri: string, init?: RequestInit) {
  return new Promise((resolveRequest) => {
    fetch(uri, init)
      .then((res) => {
        if (res.status === 204) return { ...res }
        return res.json()
      })
      .then((data: IAPIResponse) => {
        return resolveRequest(data)
      })
      .catch((err) => {
        throw err
      })
  })
}

function flattenQuery(queryObject?) {
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
  post: ({
    path,
    query,
    body
  }: {
    path: string
    query?: { [key: string]: string }
    body: { [key: string]: string }
  }) => {
    const authPath = path + '?' + flattenQuery(query)
    console.log('Making POST request to ' + authPath)

    return new Promise((resolve, reject) => {
      makeFetchRequest(authPath, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
      })
        .then((data: IAPIResponse) => {
          resolve(data)
        })
        .catch((err) => {
          throw err
        })
    })
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
    return new Promise((resolve, reject) => {
      makeFetchRequest(authPath, {
        headers: {
          Accept: 'application/json'
        },
        method: 'GET'
      })
        .then((data: IAPIResponse) => {
          resolve(data)
        })
        .catch((err) => {
          throw err
        })
    })
  },

  /**
   * @param {string} path URL to make request to
   * @param {object} query Query string parameters in object format
   * @param {object} body Body of update parameters
   */
  put: ({ path, query, body }) => {
    const authPath = path + '?' + flattenQuery(query)

    return new Promise((resolve, reject) => {
      makeFetchRequest(authPath, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(body)
      })
        .then((data: IAPIResponse) => {
          resolve(data)
        })
        .catch((err) => {
          throw err
        })
    })
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
  }: {
    path: string
    query?: object
    body?: any
  }) => {
    const authPath = path + '?' + flattenQuery(query)
    return new Promise((resolve, reject) => {
      makeFetchRequest(authPath, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(body)
      })
        .then((data: IAPIResponse) => {
          resolve(data)
        })
        .catch((err) => {
          throw err
        })
    })
  },

  del: (path: string) => {
    const authPath = path + '?' + flattenQuery()
    return new Promise((resolve, reject) => {
      makeFetchRequest(authPath, {
        method: 'DELETE'
      })
        .then((data: IAPIResponse) => {
          resolve(data)
        })
        .catch((err) => {
          throw err
        })
    })
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

  public async delete(id: string) {
    return new Promise((resolve) => {
      API.del('/api/q/' + this.tableName + '/' + id)
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
