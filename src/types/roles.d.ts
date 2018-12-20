export namespace NavigationSettings {
    // Reference `navigation` table
    interface Links {
        navId?: string;
        navInnerText?: string;
        navHref?: string;
        navHeader?: string;
        navMenu?: string;
        navActive?: string;
        navRole?: string;
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
}

export namespace RoleSettings {
    interface RolePermissions {
        rpId?: string;
        rpName?: string;
        rpLink?: string;
    }
}