import { Interface } from "readline";

export namespace UserTypes {
    interface LoginInfo {
        sys_id?: string;
        username?: string;
        userPass?: string;
        email?: string;
        userNonsig?: string;
        userIsLocked?: string;
        userIsAdmin?: string;
        userIsConfirmed?: boolean;
        userIsSuperAdmin?: string;
        userAdministrator?: string;
        userInvalidLoginAttempts?: number;
        userRole?: string;
        nsId?: string;
        nsIsActive?: boolean;
        nsType?: string;
    }

    interface Information {
        sys_id?: string;
        userLastLogin?: Date;
        userLastPasswordChange?: Date;
        userFirstName?: string;
        userLastName?: string;
        userType?: number;
        phone: string;
    }

    interface All {
        sys_id?: string;
        username?: string;
        userPass?: string;
        email?: string;
        userDefaultNonsig?: string;
        userIsLocked?: any;
        userLastLogin?: Date;
        userLastPasswordChange?: Date;
        userFirstName?: string;
        userLastName?: string;
        phone?: string;
        userIsConfirmed?: any;
        userConfirmation?: string;
    }

    interface AuthToken {
        u?: string;
        iA?: boolean;
        r?: string;
        t?: string;
        c: string;
    }

    interface Credentials {
        userId?: string;
        username?: string;
        password?: string;
    }
}