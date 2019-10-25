import { IDictionary } from '../types/common'

export class UserDetails extends String {
  public id: string
  public privs: string[]

  constructor(...args: any) {
    super(args)
    this.id = ''
    this.privs = []
  }
}

/**
 * Fetch the following details folowing login:
 *  - Menu navigation from /api/navigation
 */
function fetchLogin(): Promise<INavigationMenu> {
  return new Promise((resolve, reject) => {
    const token = window.OSM.session.token || ''
    const details = JSON.parse(atob(token.split('.')[1]))
    window.OSM.session.user = details
    if (
      details.userId === window.localStorage.getItem('userId') &&
      window.localStorage.navigation &&
      (window.OSM.session.user.privs &&
        window.OSM.session.user.privs.length > 0)
    ) {
      let event
      if (typeof Event === 'function') {
        event = new Event('osm.receivedNav')
      } else {
        event = document.createEvent('Event')
        event.initEvent('osm.receivedNav', true, true)
      }
      document.dispatchEvent(event)
      resolve(JSON.parse(window.localStorage.navigation))
    } else {
      window.localStorage.setItem('userId', details.userId)
      $.ajax('/api/navigation', {
        xhrFields: {
          withCredentials: true
        },
        success: (response) => {
          if (!response.error) {
            const menus: INavigationMenu = formatNavigation(
              response.details.navigation
            )
            window.OSM.session.user.privs = response.details.roles
            window.localStorage.setItem('navigation', JSON.stringify(menus))
            let event
            if (typeof Event === 'function') {
              event = new Event('osm.receivedNav')
            } else {
              event = document.createEvent('Event')
              event.initEvent('osm.receivedNav', true, true)
            }
            document.dispatchEvent(event)
            window.OSM.menus = menus
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

export interface INavigationMenu {
  [headMenu: string]: IDictionary<
    {
      href: string
      innerText: string
    }[]
  >
}

function formatNavigation(navigationLinks): INavigationMenu {
  const menus: INavigationMenu = {}
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

  return menus
}

export { fetchLogin }
