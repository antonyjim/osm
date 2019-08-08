import { Interface } from 'readline'
import { jwtKeys } from '../routes/middleware/authentication'

export namespace UserTypes {
  interface ILoginInfo {
    sys_id?: string
    username?: string
    userPass?: string
    email?: string
    userNonsig?: string
    userIsLocked?: string
    userIsAdmin?: string
    userIsConfirmed?: boolean
    userIsSuperAdmin?: string
    userAdministrator?: string
    userInvalidLoginAttempts?: number
    userRole?: string
    nsId?: string
    active?: boolean
    nsType?: string
  }

  interface IInformation {
    sys_id?: string
    userLastLogin?: Date
    userLastPasswordChange?: Date
    userFirstName?: string
    userLastName?: string
    userType?: number
    phone: string
  }

  interface IAll {
    sys_id?: string
    username?: string
    userPass?: string
    email?: string
    userDefaultNonsig?: string
    userIsLocked?: any
    userLastLogin?: Date
    userLastPasswordChange?: Date
    userFirstName?: string
    userLastName?: string
    phone?: string
    userIsConfirmed?: any
    userConfirmation?: string
  }

  interface IAuthToken {
    [jwtKeys.isAuthenticated]?: boolean
    [jwtKeys.isAuthorized]?: boolean
    [jwtKeys.user]?: string
    [jwtKeys.claimLevel]?: string
    [jwtKeys.claim]?: string
    [jwtKeys.scope]?: string
    [jwtKeys.token]?: string
  }

  interface ICredentials {
    userId?: string
    username?: string
    password?: string
  }
}
