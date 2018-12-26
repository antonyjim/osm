
export function submitForm({body, action, method, cb}) {
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
}