import { Interface } from "readline";

export namespace UserTypes {
    interface LoginInfo {
        userId?: string;
        userName?: string;
        userPass?: string;
        userEmail?: string;
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
        userId?: string;
        userLastLogin?: Date;
        userLastPasswordChange?: Date;
        userFirstName?: string;
        userLastName?: string;
        userType?: number;
        userPhone: string;
    }

    interface All {
        userId?: string;
        userName?: string;
        userPass?: string;
        userEmail?: string;
        userNonsig?: string;
        userIsLocked?: string;
        userIsAdmin?: string;
        userIsSuperAdmin?: string;
        userAdministrator?: string;
        userLastLogin?: Date;
        userLastPasswordChange?: Date;
        userFirstName?: string;
        userLastName?: string;
        userType?: number;
        userPhone?: string;
        userView?: string;
        userIsConfirmed?: boolean;
    }

    interface AuthToken {
        userId?: string;
        userIsAuthenticated?: boolean;
        userRole?: string;
        token?: string;
    }

    interface Credentials {
        userId?: string;
        username?: string;
        plaintextPassword?: string;
    }
}