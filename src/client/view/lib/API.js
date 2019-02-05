

const API = {
    POST: ({path, body}, cb) => {
        
    },

    GET: ({path, query}, cb) => {
        let queryStringArray = ['token=' + window.THQ.token]
        if (query && typeof query === 'object') {
            Object.keys(query).map(queryKey => {
                queryStringArray.push(`${queryKey}=${encodeURIComponent(query[queryKey])}`)
            })
        } else if (query) {
            queryStringArray.push(query)
        }

        let authPath = path + '?' + queryStringArray.join('&')
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

    }
}

export default API