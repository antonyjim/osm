function fetchLogin(token) {
    return new Promise((resolve, reject) => {
        let token = window.THQ.token
        let details = JSON.parse(atob(token.split('.')[1]))
        window.THQ.user = details
        if (details.userId === window.localStorage.getItem('userId') 
        && window.localStorage.getItem('navigation') 
        && (window.THQ.privs && window.THQ.user.privs.length > 0)) {
            console.log('New user userId = ', details.userId, ' Existing userId = ', localStorage.userId)
            document.dispatchEvent(new Event('thq.receivedNav'))
            resolve(JSON.parse(window.localStorage.getItem('navigation')))
        } else {
            window.localStorage.setItem('userId', details.userId)
            $.ajax('/api/accounts/navigation?token=' + token, {
                xhrFields: {
                    withCredentials: true
                },
                success: function(response) {
                    if (!response.errror) {
                        let menus = formatNavigation(response.details.navs)
                        window.THQ.user.privs = response.details.privs
                        window.localStorage.setItem('navigation', JSON.stringify(menus))
                        document.dispatchEvent(new Event('thq.receivedNav'))
                        resolve(menus)
                    } else {
                        throw err
                    }
                },
                error: function(err) {
                    alert(err)
                    throw err
                }
            })
        }
    })
}

function formatNavigation(navigationLinks) {
    let menus = {}
    for (let link of navigationLinks) {
        if (!menus[link.navMenu]) {
            menus[link.navMenu] = {}
        }
        if (!Array.isArray(menus[link.navMenu][link.navHeader])) {
            menus[link.navMenu][link.navHeader] = []
        }
        menus[link.navMenu][link.navHeader].push({
            href: link.navHref,
            innerText: link.navInnerText
        })
    }
    window.THQ.menus = Object.keys(menus)
    return menus
}

export { fetchLogin }