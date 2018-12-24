import { $ } from 'jquery'

function fetchLogin(token) {
    return new Promise((resolve, reject) => {
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