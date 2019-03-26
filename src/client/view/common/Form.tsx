import * as React from 'react'
import { useState, useEffect } from 'react'
import API, { TowelRecord } from '../lib/API'

import { Checkbox, Field, Reference } from './FormControls'
import Pills, { IPillProps } from './PillLayout'
import { IFormDetails, ITableField } from '../../../types/forms'
import { Loading } from './Loading'

const Hook = React.lazy(() => import('../admin/Hook'))
const UserProfile = React.lazy(() => import('../home/UserProfile'))
const Column = React.lazy(() => import('../admin/Column'))

interface ISerializedFormControl {
  component: any
  props: {
    label: string
    id?: string
    name: string
    onChange: React.ChangeEventHandler
    value: string | boolean | number
    display?: string
    className?: string
    references?: string
    checked?: boolean | string
    maxLength?: number
  }
}

// Store tsx forms in this object
const specialForms = {
  sys_user: UserProfile,
  sys_db_dictionary: Column,
  // sys_db_object: TableModifier,
  sys_db_hook: Hook
}

export default function Form(props) {
  // Define the state variables

  // Hold the serialized form here
  const [form, setForm] = useState(null)
  // Hold all of the field data here
  const [formFieldData, setFormFieldData] = useState({})
  // Store the pill bodies
  const [pills, setPills]: [IPillProps, React.ComponentState] = useState(null)
  // Store a list of modified fields
  const [modifiedFields, setModifiedFields]: [
    string[],
    React.ComponentState
  ] = useState([])

  // Define helper functions

  /**
   * Fetch the layout of the form to be rendered
   */
  const fetchFormDetails = () => {
    API.get({
      path: `/api/describe/form/${props.match.params.table}`
    })
      .then((res: IFormDetails) => {
        if (res && res.tabs) {
          setForm({ ...res })
        } else {
          throw new Error('No form found')
        }
      })
      .catch((err) => {
        console.error(err)
        throw err
      })
  }

  const getData = (table: string, id: string, fields: string[]) => {
    new TowelRecord(table)
      .get({ fields, id })
      .then((fetchedFields: any) => {
        setFormFieldData({ ...fetchedFields.data[table] })
      })
      .catch((err) => {
        console.error(err)
        throw err
      })
  }

  const handleSubmit = (e) => {
    const id = props.match.params.id
    const table = props.match.params.table
    if (id === 'new') {
      new TowelRecord(table).create({ ...formFieldData })
    } else {
      const body = { sys_id: id }
      modifiedFields.forEach((field) => {
        body[field] = formFieldData[field]
      })
      new TowelRecord(table)
        .update(id, body)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  const handleDelete = (e) => {
    const id = props.match.params.id
    new TowelRecord(props.match.params.table).delete(id).then((res: any) => {
      if (res.status === 204) {
        props.history.goBack()
      }
    })
  }

  const handleChange: React.ChangeEventHandler = (e: React.ChangeEvent) => {
    if (e.target instanceof HTMLInputElement) {
      const currState = { ...formFieldData }
      if (modifiedFields.indexOf(e.target.name) === -1) {
        setModifiedFields(modifiedFields.concat([e.target.name]))
      }
      if (e.target.type === 'checkbox') {
        currState[e.target.name] = e.target.checked
      } else {
        currState[e.target.name] = e.target.value
      }
      setFormFieldData(currState)
    }
  }

  const formControlFromJson = (fieldName: string): ISerializedFormControl => {
    const jsonData: ITableField = {
      ...form.tabs['General Information'].fields[fieldName]
    }
    switch (jsonData.type) {
      case 'string': {
        if (jsonData.refTable) {
          return {
            component: Reference,
            props: {
              label: jsonData.label,
              id: fieldName,
              name: fieldName,
              onChange: handleChange,
              value: formFieldData[fieldName],
              display: formFieldData[fieldName + '_display'],
              className: 'col-lg-6 col-md-12',
              references: jsonData.refTable
            }
          }
        } else {
          return {
            component: Field,
            props: {
              label: jsonData.label,
              name: fieldName,
              onChange: handleChange,
              value: formFieldData[fieldName],
              maxLength: jsonData.maxLength || 40,
              className: 'col-lg-6 col-md-12'
            }
          }
        }
      }
      case 'boolean': {
        return {
          component: Checkbox,
          props: {
            label: jsonData.label,
            name: fieldName,
            onChange: handleChange,
            value: formFieldData[fieldName],
            checked: formFieldData[fieldName],
            className: 'col-lg-6 col-md-12'
          }
        }
      }
      default: {
        return {
          component: Field,
          props: {
            label: jsonData.label,
            name: fieldName,
            onChange: handleChange,
            value: formFieldData[fieldName],
            className: 'col-lg-6 col-md-12'
          }
        }
      }
    }
  }

  const jsxFromJson = () => {
    const newPills: IPillProps = {}
    for (const tabName of Object.keys(form.tabs)) {
      /* If the tab has a fields property, map out the form control boxes */
      const name = tabName
      const tab = form.tabs[tabName]
      const displayFields: JSX.Element[] = []
      if (tab.fields) {
        Object.keys(tab.fields).map((fieldName) => {
          if (fieldName === tab.primaryKey) {
            // Push the primary key into a hidden field
            return displayFields.push(
              <input
                type='hidden'
                id={fieldName}
                name={fieldName}
                value={formFieldData[fieldName]}
                onChange={handleChange}
                key={`form-field-${fieldName}`}
              />
            )
          }
          const thisField = formControlFromJson(fieldName)
          const FormField = thisField.component
          displayFields.push(
            <FormField
              {...thisField.props}
              key={`form-field-${thisField.props.name}`}
            />
          )
        })
        newPills[name] = {
          id: name,
          label: name,
          body: (
            <>
              <button
                className='btn btn-danger float-right'
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className='btn btn-primary float-right'
                onClick={handleSubmit}
              >
                Save
              </button>
              <h4>{tab.title || 'General Information'}</h4>
              <hr />
              <form className='form-row' name='generalInformation'>
                {displayFields}
              </form>
            </>
          )
        }
      }
    }
    setPills(newPills)
  }

  // Fetch the form
  useEffect(() => {
    if (props.match.params.table && !specialForms[props.match.params.table]) {
      fetchFormDetails()
    }
  }, [props.match.params.table])

  useEffect(() => {
    if (props.match.params.id !== 'new' && form) {
      getData(
        props.match.params.table,
        props.match.params.id,
        Object.keys(form.tabs['General Information'].fields)
      )
    } else {
      console.log('New form or loading')
    }
  }, [props.match.params.id, props.match.params.table, form])

  useEffect(() => {
    if (form !== null) {
      jsxFromJson()
    }
  }, [form, formFieldData])

  // First check for a special form
  if (specialForms[props.match.params.table]) {
    const ThisForm = specialForms[props.match.params.table]
    return <ThisForm />
  } else if (form && pills) {
    // If forms have been initialized, render the form contained in the form state
    return <Pills pills={pills} />
  } else {
    // Duh
    return <Loading />
  }
}
