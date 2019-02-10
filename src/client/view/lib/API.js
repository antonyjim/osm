
function flattenQuery(queryObject) {
    let queryStringArray = [`token=${window.THQ.token || ''}`]
    if (queryObject && typeof queryObject === 'object') {
        Object.keys(queryObject).map(queryKey => {
            queryStringArray.push(`${queryKey}=${encodeURIComponent(queryObject[queryKey])}`)
        })
    } else if (queryObject) {
        queryStringArray.push(query)
    }
    return queryStringArray.join('&')
}

const API = {
    POST: ({path, body}, cb) => {
        
    },

    GET: ({path, query}, cb) => {
        const authPath = path + '?' + flattenQuery(query)
        console.log('Making GET request to ' + authPath)
        if (cb !== null && cb !== undefined) {
            $.ajax(authPath, {
                headers: {
                    'Accept': 'application/json'
                },
                method: "GET",
                success: (res => {
                    cb(null, res)
                }),
                error: (err) => {
                    cb(err)
                }
            })
        } else {
            return new Promise((resolve, reject) => {
                $.ajax(authPath, {
                    headers: {
                        'Accept': 'application/json'
                    },
                    method: "GET",
                    success: (res => {
                        resolve(res)
                    }),
                    error: (err => {
                        throw err
                    })
                })
            })
        }

    },

    put: ({path, query, body}, cb) => {
        const authPath = path + '?' + flattenQuery(query)
        if (cb !== null && cb !== undefined) {
            $.ajax(authPath, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: body,
                method: "PUT",
                success: (res => {
                    cb(null, res)
                }),
                error: (err) => {
                    cb(err)
                }
            })
        } else {
            return new Promise((resolve, reject) => {
                $.ajax(authPath, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    method: "GET",
                    success: (res => {
                        resolve(res)
                    }),
                    error: (err => {
                        throw err
                    })
                })
            })
        }
    }
}

export default API