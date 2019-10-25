import React from 'react'
import { UserDetails } from '../lib/authentication'
export { IOSMWindowNamespace }

interface IOSMWindowNamespace {
  session: {
    user: UserDetails
    scope: string
    token: string | null
  }
  currentComponent: any
  menus: any
  loadingInterval?: number
  pageLoad?: number
}
