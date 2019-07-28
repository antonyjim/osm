import * as React from 'react'
import { Component } from 'react'
import Pills from '../common/PillLayout'
import { Table } from '../common/Table'
import API from '../lib/API'
import { ColumnGeneralInformation } from './ColumnInfo'
import { IDictionary } from '../types/server'

interface IColumnInfoState {
  error: string
  sys_id: string
  generalInfo: IDictionary<string | boolean | number>
  modifiedFields: IDictionary<string | boolean | number>
  disableSubmit: boolean
  fields: string[]
  loaded: boolean
}

function ColumnTables(props: { sys_id: string }) {
  return (
    <Table
      table='sys_db_dictionary_list'
      args={{ reference_id: props.sys_id }}
    />
  )
}

export default function Column(props) {
  // @ts-ignore
  const [state, setState]: [
    IColumnInfoState,
    React.Dispatch<IColumnInfoState>
  ] = React.useState({
    error: '',
    sys_id: props.match.params.id,
    generalInfo: {},
    modifiedFields: {},
    disableSubmit: true,
    fields: [
      'sys_id',
      'column_name',
      'label',
      'table_name',
      'hint',
      'type',
      'len',
      'readonly',
      'default_view',
      'nullable',
      'reference_id',
      'table_name_display',
      'reference_id_display',
      'required_on_update',
      'required_on_create'
    ],
    loaded: props.match.params.id !== 'new' ? false : true
  })

  function getInfo() {
    API.get({
      path: '/api/q/sys_db_dictionary/' + state.sys_id,
      query: {
        fields: state.fields.join(',')
      }
    })
      .then((data: any) => {
        const newState = { ...state }
        newState.generalInfo = data.data.sys_db_dictionary
        newState.loaded = true
        setState(newState)
      })
      .catch((e: Error) => {
        setState({ ...state, error: e.message, loaded: true })
        console.error(e)
      })
  }

  function handleChange(e: React.ChangeEvent) {
    if (e.target instanceof HTMLInputElement) {
      const newState = { ...state }
      newState.disableSubmit = false
      newState.modifiedFields[e.target.id] = e.target.value
      newState.fields[e.target.id] = e.target.value
      setState(newState)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    console.log('submitted')
  }

  const pills = {
    general: {
      id: 'general',
      label: 'General',
      body: (
        <ColumnGeneralInformation
          info={state.generalInfo}
          sys_id={state.sys_id}
          fields={state.fields}
        />
      )
    },
    ref: {
      id: 'references',
      label: 'References',
      body: <ColumnTables sys_id={state.sys_id} />
    }
  }

  React.useEffect(() => {
    if (props.match.params.id !== 'new') {
      getInfo()
    }
  }, [props.match.params.id])
  return <>{state.loaded && <Pills pills={pills} {...state} />}</>
}
