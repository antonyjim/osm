

export const API = {
    get: ({path}) => {

    },

    post: ({path, body}, cb) => {
        let authPath = path + '?token=' + window.THQ.token
        if (cb !== null && cb !== undefined) {
            $.ajax(authPath, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: "POST",
                data: body,
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
                    method: "POST",
                    data: body,
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