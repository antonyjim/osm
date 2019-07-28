import * as React from 'react'

import API from './API'
import { IFormDetails } from '../types/forms'
import { IAPIGETResponse } from '../types/api'
import { IDictionary } from '../types/server'

// const Hook = React.lazy(() => import('../admin/Hook'))
// const UserProfile = React.lazy(() => import('../home/UserProfile'))
// const Column = React.lazy(() => import('../admin/Column'))

// Retrieve the form details for a specific table

export function getFormDetails(
  formName
): Promise<[IFormDetails?, Promise<{ default: any }>?]> {
  return new Promise((resolveFormDetails, rejectFormDetails) => {
    // Store tsx forms in this object
    // const specialForms: {[formName: string]: React.LazyExoticComponent} = {
    //   sys_user: UserProfile,
    //   sys_db_dictionary: Column,
    //   // sys_db_object: TableModifier,
    //   sys_db_hook: Hook
    // }

    const specialForms: IDictionary<string> = {
      // sys_user: '../admin/Hook',
      sys_db_dictionary: '../admin/Column',
      // sys_db_object: TableModifier,
      sys_db_hook: '../admin/Hook'
    }

    const specialFormLoader = (specialFormName: string): Promise<any> => {
      switch (specialFormName) {
        // case 'sys_user': {
        //   return import('../home/UserProfile')
        // }
        case 'sys_db_dictionary': {
          return import('../admin/Column')
        }

        case 'sys_db_hook': {
          return import('../admin/Hook')
        }
        default: {
          // This should never happen
          return import('../common/Errors')
        }
      }
    }
    // Dynamically load special forms
    if (formName in specialForms) {
      return resolveFormDetails([undefined, specialFormLoader(formName)])
      // specialForms[formName]
      //   .then((form: { default: React.FunctionComponentFactory<any> }) => {
      //     return resolveFormDetails(React.lazy)
      //   })
      //   .catch(rejectFormDetails)
      // return resolveFormDetails([undefined, specialForms[formName]])
    } else {
      API.get({ path: '/api/describe/form/' + formName })
        .then((formDetails: IAPIGETResponse<IFormDetails>) => {
          return resolveFormDetails([formDetails.data])
        })
        .catch(rejectFormDetails)
    }
  })
}
