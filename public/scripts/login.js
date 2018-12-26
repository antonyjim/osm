/**
 * Validate credentials before loading application
 */

function passLogin() {
    let username = document.querySelector('#username').value
    let password = document.querySelector('#password').value
    fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
            user: {
                username,
                password
            }
        }),
        headers: {
            "Content-Type": "Application/JSON"
        }
    })
    .then(res => {
        return res.json()
    })
    .then(authenticationResults => {
        if (authenticationResults.message === 'Success' && authenticationResults.details && authenticationResults.details.token) {
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
    if (window.location.pathname === '/logout') {
        history.pushState({loaded: true}, 'Tire-HQ', '/')
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleOnLoad)
} else {
    handleOnLoad()
}