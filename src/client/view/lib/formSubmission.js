
export function submitForm({body, action, method, cb}) {
    $.ajax(action, {
        method,
        data: JSON.stringify(body),
        headers: {
            'Content-Type': 'Application/json'
        },
        success: (data) => {
            cb(null, data)
        },
        error: cb
    })
    /*
    fetch(action, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        cb(null, data)
    })
    .catch(err => {
        cb(err)
    })
    */
}