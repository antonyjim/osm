export namespace NavigationSettings {
  // Reference `navigation` table
  interface ILinks {
    navId?: string
    navInnerText?: string
    navHref?: string
    navPathName?: string
    navQueryString?: string
    navHeader?: string
    navMenu?: string
    navActive?: any
    navPriv?: string
    navIsNotApi?: any
    navMethod?: string
  }

  // Reference `navigationRoles` table
  interface IUserLinks {
    nrRoleId: string
    nrLink: string
  }

  // Output from SELECT DISTINCT navigation.navMenu FROM navigation;
  interface IMenus {
    navMenu: string
    navHeaders: string[]
  }

  interface IGUI {
    menus: IMenus[]
    links: ILinks[]
  }
}

export interface IRolePermissions {
  rpId?: string
  role_priv?: string
  authed?: boolean
}
