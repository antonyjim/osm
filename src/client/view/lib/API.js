

export const API = {
    get: ({path}) => {

    },

    GET: ({path, query}, cb) => {
        let queryStringArray = ['token=' + window.THQ.token]
        Object.keys(query).map(queryKey => {
            queryStringArray.push(`${queryKey}=${encodeURIComponent(query[queryKey])}`)
        })
        let authPath = path + '?' + queryStringArray.join('&')
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

/*

query for users:

query=userIsActive|eq|true^userEmail|eq|"antonyjund@gmail.com"&fields=userId,userEmail

OR

query (userIsActive: true, userEmail: "lk|antony*") {
    userIsActive
    userEmail
}

*/