import { Interface } from 'readline'

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
    u?: string // UserId of logged in or impersonated user
    iA?: boolean // Boolean indicated if the user is authorized
    r?: string // Role of the currently selected user
    t?: string // Token of the request, not included in the payload
    c: string // Currently selected customer
  }

  interface ICredentials {
    userId?: string
    username?: string
    password?: string
  }
}
