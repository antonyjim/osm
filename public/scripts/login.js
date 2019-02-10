/**
 * Validate credentials before loading application
 */

function passLogin() {
    let username = document.querySelector('#username').value
    let password = document.querySelector('#password').value
    $('#loginLoading').show()
    $('#loginDisplay').hide()
    $.ajax('/login/', {
        method: 'POST',
        data: JSON.stringify({
            user: {
                username: username,
                password: password
            }
        }),
        headers: {
            "Content-Type": "Application/JSON",
            "Accept": "Application/JSON"
        },
        success: function(authenticationResults) {
            if (authenticationResults.message === 'Success' && authenticationResults.details && authenticationResults.details.token) {
                window.location.href = '/?token=' + authenticationResults.details.token
            } else {
                $('#passwordError').text(authenticationResults.message)
                $('#passwordError').show()
                $('#loginLoading').hide()
                $('#loginDisplay').show()
            }
        },
        error: function(err) {
            $('#loginLoading').hide()
            $('#loginDisplay').show()
            console.error(err)
        }
    })
}

function forgotPass(e) {
    let email = document.getElementById('email').value
    if(/\S+@\S+\.\S+/.test(email)) {
        $.ajax({
            url: '/login/forgot',
            data: JSON.stringify({
                email: email
            }),
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            }
        })
        $('#email')
            .addClass('alert-success')
            .text('Email sent to ' + email)
            .show()
    } else {
        $('#email')
            .addClass('alert-danger')
            .text('Please supply a valid email')
            .show()
    }
}

function submitRegistration(e) {
    let formFields = document.querySelectorAll('#register input')
    let registration = {}
    formFields.forEach(function(field) {
        registration[field.id] = field.value
    })
    $.ajax('/login/newUser', {
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
            .text(err.message)
        }
    })
}

function handleOnLoad() {
    $('#loginBtn').on('click', passLogin)
    $('form[name=login] input').on('keyup', function(e) {
        if (e.keyCode === 13) {
            passLogin()
        }
    })
    $('#submit').on('click', submitRegistration)
    $('#subForgot').on('click', forgotPass)
    if (window.location.pathname === '/logout') {
        history.pushState({loaded: true}, 'Tire-HQ', '/')
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleOnLoad)
} else {
    handleOnLoad()
}