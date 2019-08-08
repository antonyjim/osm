function fetchLogin() {
  return new Promise((resolve, reject) => {
    const token = window.THQ.token || ''
    const details = JSON.parse(atob(token.split('.')[1]))
    window.THQ.user = details
    if (
      details.userId === window.localStorage.getItem('userId') &&
      window.localStorage.navigation &&
      (window.THQ.user.privs && window.THQ.user.privs.length > 0)
    ) {
      let event
      if (typeof Event === 'function') {
        event = new Event('thq.receivedNav')
      } else {
        event = document.createEvent('Event')
        event.initEvent('thq.receivedNav', true, true)
      }
      document.dispatchEvent(event)
      resolve(JSON.parse(window.localStorage.navigation))
    } else {
      window.localStorage.setItem('userId', details.userId)
      $.ajax('/api/navigation?token=' + token, {
        xhrFields: {
          withCredentials: true
        },
        success: (response) => {
          if (!response.error) {
            const menus = formatNavigation(response.details.navigation)
            window.THQ.user.privs = response.details.roles
            window.localStorage.setItem('navigation', JSON.stringify(menus))
            let event
            if (typeof Event === 'function') {
              event = new Event('thq.receivedNav')
            } else {
              event = document.createEvent('Event')
              event.initEvent('thq.receivedNav', true, true)
            }
            document.dispatchEvent(event)
            resolve(menus)
          } else {
            throw new Error(response.error)
          }
        },
        error: (err) => {
          alert(err)
          throw err
        }
      })
    }
  })
}

function formatNavigation(navigationLinks) {
  const menus = {}
  for (const link of navigationLinks) {
    if (!menus[link.menu]) {
      menus[link.menu] = {}
    }
    if (!Array.isArray(menus[link.menu][link.header])) {
      menus[link.menu][link.header] = []
    }
    menus[link.menu][link.header].push({
      href: link.href,
      innerText: link.inner_text
    })
  }
  window.THQ.menus = Object.keys(menus)
  return menus
}

export { fetchLogin }
