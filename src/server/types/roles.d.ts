export namespace NavigationSettings {
    // Reference `navigation` table
    interface Links {
        navId?: string;
        navInnerText?: string;
        navHref?: string;
        navPathName?: string;
        navQueryString?: string;
        navHeader?: string;
        navMenu?: string;
        navActive?: string;
        navPriv?: string;
        navIsNotApi?: boolean;
        navMethod?: string;
    }

    // Reference `navigationRoles` table
    interface UserLinks {
        nrRoleId: string;
        nrLink: string;
    }

    // Output from SELECT DISTINCT navigation.navMenu FROM navigation;
    interface Menus {
        navMenu: string;
        navHeaders: Array<string>;
    }

    interface GUI {
        menus: Array<Menus>;
        links: Array<Links>
    }
}

export interface RolePermissions {
    rpId?: string;
    rpPriv?: string;
}