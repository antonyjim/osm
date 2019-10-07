import * as React from 'react'
import { useState, useEffect } from 'react'

import { TowelRecord } from '../lib/API'
import Pills, { IPillProps, IPillBody } from '../common/Pills'
import { IFormDetails, FormValue } from '../types/forms'
import { Loading } from '../common/Loading'
import { getFormDetails } from '../lib/formLoader'
import FieldForm from './FieldForm'
import { IDictionary } from '../types/server'
import { RouteComponentProps } from 'react-router'

export interface IDataModel {
  values: IDictionary<any>
  fields: string[]
}

// Used for special forms
type ICustomForm = React.LazyExoticComponent<
  React.ComponentType<any>
  // (props: any) => JSX.Element
>

export default function Form(
  props: RouteComponentProps<{ table: string; id: string }>
) {
  // @ts-ignore
  window.Form = Form

  // Define the state variables
  // let CustomForm: React.LazyExoticComponent<
  //   // React.FunctionComponent<any>
  //   (props: any) => JSX.Element
  // > | null = null

  const [CustomForm, setCustomForm]: [any, React.Dispatch<any>] = useState(null)

  // Store the pill bodies
  const [pills, setPills]: [IPillProps, React.Dispatch<IPillProps>] = useState(
    {}
  )

  const reloadForm = () => {
    const tableName = props.match.params.table
    if (tableName) {
      getFormDetails(tableName).then(
        ([formDetails, parsedForm]: [
          IFormDetails?,
          Promise<{ default: React.ComponentType<any> }>?
        ]) => {
          console.log(formDetails)
          if (!formDetails && parsedForm) {
            // These forms all return default exports, but it needs to
            // be explicitly cast that way for TS to know
            // CustomForm = React.lazy(() => parsedForm)
            setCustomForm(React.lazy(() => parsedForm))
            // CustomForm = parsedForm
            return
          }

          if (formDetails && Object.keys(formDetails.tabs).length > 0) {
            // Form tabs come in 3 varieties:
            // - Form Control
            // - Table
            // - CustomComponent
            const allFormTabs: IPillProps = {}

            Object.keys(formDetails.tabs).forEach((tabId) => {
              const thisTab = formDetails.tabs[tabId]
              if (thisTab.fields) {
                // CustomForm = null
                setCustomForm(null)
                allFormTabs[tabId] = {
                  id: thisTab.name,
                  label: thisTab.title,
                  body: (
                    <FieldForm
                      primaryKey={thisTab.primaryKey}
                      id={props.match.params.id}
                      table={props.match.params.table}
                      history={props.history}
                      form={thisTab}
                    />
                  )
                }
              }
            })

            setPills(allFormTabs)
          }
        }
      )
    }
  }

  // Fetch the form
  useEffect(reloadForm, [props.match.params.table, props.match.params.id])

  // Refresh data when the id changes
  // useEffect(() => {
  //   reloadForm
  // }, [props.match.params.id])

  // if (pills) {
  // If forms have been initialized, render the form contained in the form state
  if (CustomForm !== null) {
    return <CustomForm match={props.match} />
  } else if (Object.keys(pills).length > 0) {
    return <Pills pills={pills} />
  } else {
    return <Loading />
  }
  //   return (
  //     <div>
  //       CustomForm !== null ?  : (
  //       <h3>{form.title || 'd'}</h3>
  //       {Object.keys(pills).length > 0 && <Pills pills={pills} />})
  //     </div>
  //   )
  // } else {
  //   // Duh
  //   return <Loading />
  // }
}
