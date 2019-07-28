import React from 'react'
export { ITablePermissions, ITHQWindowNamespace }

interface ITablePermissions {
  edit: boolean
  create: boolean
  read: boolean
  delete: boolean
}

interface ITHQWindowNamespace {
  user: {
    privs: string[]
  }
  currentComponent: any

  menus: string[]
  loadingInterval?: number
  pageLoad?: number
  token: string | null
}
