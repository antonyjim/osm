function fetchLogin(token) {
    return new Promise((resolve, reject) => {
        let token = window.THQ.token
        let details = JSON.parse(atob(token.split('.')[1]))
        window.THQ.user = details
        if (details.userId === window.localStorage.getItem('userId') && window.localStorage.getItem('navigation')) {
            resolve(JSON.parse(window.localStorage.getItem('navigation')))
        } else {
            window.localStorage.setItem('userId', details.userId)
            $.ajax('/api/accounts/navigation?token=' + token, {
                xhrFields: {
                    withCredentials: true
                },
                success: function(response) {
                    console.log(response)
                    if (!response.errror) {
                        let menus = formatNavigation(response.details)
                        window.localStorage.setItem('navigation', JSON.stringify(menus))
                        resolve(menus)
                    } else {
                        throw err
                    }
                },
                error: function(err) {
                    throw err
                }
            })
        }
        /*
        fetch('/account/navigation?token=' + token)
        .then(res => {
            return res.json()
        })
        .then(navigation => {
            resolve(formatNavigation(navigation.details))
        })
        .catch(err => {
            throw err
        })
        */
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
    return menus
}

export { fetchLogin }