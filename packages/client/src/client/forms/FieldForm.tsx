import * as React from 'react'
import { Reference, Field, Checkbox } from '../common/FormControls'
import {
  ISerializedFormControl,
  ITableField,
  IFormDetails,
  FormValue,
  IFormTab
} from '../types/forms'
import { IPillProps } from '../common/Pills'
import { IDataModel } from './Form'
import { IDictionary } from '../types/server'
import { useState, useEffect } from 'react'
import { TowelRecord } from '../lib/API'
import * as H from 'history'
import { generateKeyHash } from '../lib/util'
import { IRefUpdate } from '../common/FormControls/Reference'

/**
 * Renders a form populated with fields from a "fields" argument
 * @param props
 */

const formControlFromJson = (
  fieldName: string,
  field: ITableField,
  changeHandler: React.ChangeEventHandler,
  model: IDataModel,
  displayVal?: string
): ISerializedFormControl => {
  switch (field.type) {
    case 'string': {
      if (field.refTable) {
        return {
          component: Reference,
          props: {
            label: field.label,
            id: fieldName,
            name: fieldName,
            onChange: changeHandler,
            value: model[fieldName],
            display: displayVal,
            className: 'col-lg-6 col-md-12',
            references: field.refTable
          }
        }
      } else {
        return {
          component: Field,
          props: {
            label: field.label,
            name: fieldName,
            onChange: changeHandler,
            value: model[fieldName],
            maxLength: field.maxLength || 40,
            className: 'col-lg-6 col-md-12'
          }
        }
      }
    }
    case 'boolean': {
      return {
        component: Checkbox,
        props: {
          label: field.label,
          name: fieldName,
          onChange: changeHandler,
          value: model[fieldName],
          checked: !!model[fieldName],
          className: 'col-lg-6 col-md-12'
        }
      }
    }
    default: {
      return {
        component: Field,
        props: {
          label: field.label,
          name: fieldName,
          onChange: changeHandler,
          value: model[fieldName],
          className: 'col-lg-6 col-md-12'
        }
      }
    }
  }
}

/**
 *
 * @param form Columns being passed to render
 * @param model Data model to pull values from
 * @param primaryKey String containing primary key for table
 * @param param3 Object containing change, submit and delete handlers
 */

// {
//   id: string
//   label: string
//   body: JSX.Element
// }
export default function FieldForm(props: {
  form: IFormTab
  table: string
  id: string
  primaryKey: string
  history: H.History
}) {
  // Lets initialize all of the fields with empty strings to prevent undefined
  // values being passed to form controls
  const initialDataModel: { values: IDictionary<FormValue> } = { values: {} }
  Object.keys(props.form.fields).forEach((fieldName) => {
    initialDataModel.values[fieldName] = ''
  })

  // Hold all of the field data here
  const [dataModel, setDataModel]: [
    IDataModel,
    React.Dispatch<IDataModel>
  ] = useState({
    ...initialDataModel,
    fields: [] as string[]
  })

  // @ts-ignore
  window.dm = dataModel

  // Store a list of modified fields
  const [modifiedFields, setModifiedFields]: [
    string[],
    React.ComponentState
  ] = useState([])

  // @ts-ignore
  const [errors, setErrors]: [
    JSX.Element[],
    React.Dispatch<JSX.Element[]>
  ] = useState([])

  // @ts-ignore
  window.dm = dataModel

  // Define helper functions
  const getData = (table: string, id: string, fields: string[]) => {
    return new Promise((resolve, reject) => {
      new TowelRecord(table)
        .get({ fields, id })
        .then((fetchedFields) => {
          if (fetchedFields.errors) {
            const allErrors = fetchedFields.errors.map((err) => {
              return (
                <div className='alert alert-danger' role='alert'>
                  {err.message}
                </div>
              )
            })
            setErrors(allErrors)
          }
          setDataModel({
            values: {
              ...dataModel.values,
              ...(fetchedFields.data[table] as IDictionary<FormValue>)
            },
            fields: dataModel.fields
          })
          // reloadForm()
          resolve()
        })
        .catch(reject)
    })
  }

  const handleSubmit = () => {
    const id = props.id
    const table = props.table
    if (id === 'new') {
      new TowelRecord(table).create({ ...dataModel.values })
    } else {
      const body: any = { ...dataModel.values, sys_id: id }
      // for (const field in dataModel) {
      //   if (modifiedFields.indexOf(field) > -1) {
      //     body[field] = dataModel[field]
      //   }
      // }

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

  const handleDelete = () => {
    new TowelRecord(props.table).delete(props.id).then((res: any) => {
      if (res.status === 204) {
        props.history.goBack()
      }
    })
  }

  const handleChange: React.ChangeEventHandler = (e: React.ChangeEvent) => {
    if (e.target instanceof HTMLInputElement) {
      const newValues = {}

      if (e.target.type === 'checkbox') {
        newValues[e.target.name] = e.target.checked
      } else {
        newValues[e.target.name] = e.target.value
      }
      setDataModel({
        values: {
          ...dataModel.values,
          ...newValues
        },
        fields: dataModel.fields
      })
    }
  }

  const setReference = (updatedRef: IRefUpdate): void => {
    const newValues = {
      [updatedRef.field]: updatedRef.newValue
    }
    setDataModel({
      values: {
        ...dataModel.values,
        ...newValues
      },
      fields: dataModel.fields
    })
  }

  useEffect(() => {
    if (props.id !== 'new') {
      getData(props.table, props.id, Object.keys(props.form.fields))
    }
  }, [])

  const displayFields: (JSX.Element | null)[] = Object.keys(
    props.form.fields
  ).map((fieldName: string, key: number) => {
    const thisFieldInfo: ITableField = props.form.fields[fieldName]
    if (fieldName === props.primaryKey) {
      /*
        It really is superfluous to push the primary key
        into a hidden field, but it makes sense for me.
      */
      return (
        <input
          type='hidden'
          id={fieldName}
          name={fieldName}
          value={dataModel.values[fieldName]}
          onChange={handleChange}
          key={generateKeyHash()}
        />
      )
    }

    /*
      Decide which kind of field to render
    */
    const field = props.form.fields[fieldName]
    switch (field.type) {
      case 'string': {
        if (field.refTable) {
          return (
            <Reference
              label={field.label}
              id={fieldName}
              name={fieldName}
              setReference={setReference}
              value={dataModel.values[fieldName]}
              display={dataModel.values[fieldName + '_display']}
              className={'col-lg-6 col-md-12'}
              references={field.refTable}
              key={generateKeyHash()}
              readOnly={
                thisFieldInfo.readonly && !(props.id === 'new') ? true : false
              }
            />
          )
        } else {
          return (
            <Field
              type={'text'}
              label={field.label}
              name={fieldName}
              onChange={handleChange}
              value={dataModel.values[fieldName]}
              maxLength={field.maxLength || 40}
              className={'col-lg-6 col-md-12'}
              readOnly={
                thisFieldInfo.readonly && !(props.id === 'new') ? true : false
              }
              key={generateKeyHash()}
            />
          )
        }
      }
      case 'boolean': {
        return (
          <Checkbox
            label={field.label}
            name={fieldName}
            onChange={handleChange}
            value={dataModel.values[fieldName]}
            checked={!!dataModel.values[fieldName]}
            className={'col-lg-6 col-md-12'}
            readOnly={
              thisFieldInfo.readonly && !(props.id === 'new') ? true : false
            }
            key={generateKeyHash()}
          />
        )
      }
      default: {
        return (
          <Field
            type={'text'}
            label={field.label}
            name={fieldName}
            onChange={handleChange}
            value={dataModel.values[fieldName]}
            className={'col-lg-6 col-md-12'}
            readOnly={
              thisFieldInfo.readonly && !(props.id === 'new') ? true : false
            }
            key={generateKeyHash()}
          />
        )
      }
    }
  })

  return (
    <div>
      {errors}
      <button
        className='btn btn-danger float-right ml-1'
        onClick={handleDelete}
      >
        Delete
      </button>
      <button className='btn btn-primary float-right' onClick={handleSubmit}>
        {props.id === 'new' ? 'Create' : 'Save'}
      </button>
      <h4>{'General Information'}</h4>
      <hr />
      <form className='form-row' name='generalInformation'>
        {displayFields}
      </form>
    </div>
  )
}
