/**
 * Validate credentials before loading application
 */

function passLogin() {
    let username = document.querySelector('#username').value
    let password = document.querySelector('#password').value
    $.ajax('/login', {
        method: 'POST',
        data: JSON.stringify({
            user: {
                username,
                password
            }
        }),
        headers: {
            "Content-Type": "Application/JSON"
        },
        success: function(authenticationResults) {
            if (authenticationResults.message === 'Success' && authenticationResults.details && authenticationResults.details.token) {
                window.location.href = '/?token=' + authenticationResults.details.token
            } else {
                document.querySelector('#passwordError').innerText = authenticationResults.message
                document.querySelector('#passwordError').style.display = 'block'
            }
        },
        error: function(err) {
            console.error(err)
        }
    })
}

function submitRegistration(e) {
    let formFields = document.querySelectorAll('#register input')
    let registration = {}
    formFields.forEach(field => {
        registration[field.id] = field.value
    })
    $.ajax('/newUser', {
        method: 'POST',
        data: JSON.stringify(registration),
        headers: {
            'Content-Type': 'Application/JSON'
        },
        success: function(response) {
            console.log(response)
            alert = $('#register .alert')
            .show()
            .text(response.message)
        },
        error: function(err) {
            alert = $('#register .alert')
            .show()
            .text(err)
        }
    })
}

function handleOnLoad() {
    document.querySelector('#loginBtn').addEventListener('click', passLogin)
    $('#submit').on('click', submitRegistration)
    if (window.location.pathname === '/logout') {
        history.pushState({loaded: true}, 'Tire-HQ', '/')
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleOnLoad)
} else {
    handleOnLoad()
}