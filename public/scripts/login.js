/**
 * Validate credentials before loading application
 */

function passLogin() {
    let username = document.querySelector('#username').value
    let password = document.querySelector('#password').value
    fetch(`/api/getToken?username=${username}&password=${password}`)
    .then(res => {
        return res.json()
    })
    .then(authenticationResults => {
        if (authenticationResults.message === 'Success' && authenticationResults.token) {
            window.location.href = '/?token=' + authenticationResults.token
        } else {
            document.querySelector('#passwordError').innerText = authenticationResults.message
            document.querySelector('#passwordError').style.display = 'block'
        }
    })
    .catch(err => {
        console.error(err)
    })
}

function handleOnLoad() {
    document.querySelector('#loginBtn').addEventListener('click', passLogin)
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleOnLoad)
} else {
    handleOnLoad()
}