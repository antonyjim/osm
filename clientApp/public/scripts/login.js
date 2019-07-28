/**
 * Validate credentials before loading application
 */

function passLogin() {
  var username = document.querySelector('#username').value
  var password = document.querySelector('#password').value
  $('#loginLoading').show()
  $('#loginDisplay').hide()
  $.ajax('/auth/login', {
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
    success: function (authenticationResults) {
      if (!authenticationResults.errors && authenticationResults.data && authenticationResults.data.token) {
        var returnTo = getQsKey('returnUrl')
        if (returnTo) {
          window.location.href = returnTo + '?token=' + authenticationResults.data.token
        } else {
          window.location.href = '/?token=' + authenticationResults.data.token
        }

      } else {
        $('#passwordError').text(authenticationResults.message)
        $('#passwordError').show()
        $('#loginLoading').hide()
        $('#loginDisplay').show()
      }
    },
    error: function (err) {
      $('#loginLoading').hide()
      $('#loginDisplay').show()
      $('$loginDisplay').html(err.message)
      console.error(err)
    }
  })
}

function getQsKey(key) {
  var locationString = window.location.href.split('?')
  if (locationString.length > 1) {
    var keysWithVals = locationString[1].split('&')
    var keyVal = null
    keysWithVals.forEach(function (keyString) {
      var keySplit = keyString.split('=')
      if (keySplit[0] === key) {
        keyVal = keySplit[1] || true
      }
    })
    return keyVal
  } else {
    return null
  }
}

function forgotPass(e) {
  var email = document.getElementById('email').value
  if (/\S+@\S+\.\S+/.test(email)) {
    $.ajax({
      url: '/auth/forgot',
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
  var formFields = document.querySelectorAll('#register input')
  var registration = {}
  formFields.forEach(function (field) {
    registration[field.id] = field.value
  })
  $.ajax('/auth/newUser', {
    method: 'POST',
    data: JSON.stringify(registration),
    headers: {
      'Content-Type': 'Application/JSON'
    },
    success: function (response) {
      console.log(response)
      alert = $('#register .alert')
        .show()
        .text(response.message)
    },
    error: function (err) {
      alert = $('#register .alert')
        .show()
        .text(err.message)
    }
  })
}

function handleOnLoad() {
  $('#loginBtn').on('click', passLogin)
  $('form[name=login] input').on('keyup', function (e) {
    if (e.keyCode === 13) {
      passLogin()
    }
  })
  $('#submit').on('click', submitRegistration)
  $('#subForgot').on('click', forgotPass)
  if (window.location.pathname === '/logout') {
    history.pushState({
      loaded: true
    }, 'Tire-HQ', '/')
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleOnLoad)
} else {
  handleOnLoad()
}