import React, { Component } from 'react'
import Pills from '../common/PillLayout'
import Table from '../common/Table/Table'
import API from '../lib/API'
import { ColumnGeneralInformation } from './ColumnInfo'

function ColumnTables(props: { sys_id: string }) {
  const handleChange = (e) => {
    const state = { ...this.state }
    state.fields[e.target.id] = e.target.value
    if (!state.modifiedFields.includes(e.target.id)) {
      state.modifiedFields.push(e.target.id)
    }
    state.saveDisabled = {}
    this.setState(state)
  }

  return (
    <Table
      table='sys_db_dictionary_list'
      args={{ reference_id: props.sys_id }}
    />
  )
}

export default class Column extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      sys_id: props.id,
      generalInfo: {},
      modifiedFields: {},
      disableSubmit: {
        disabled: 'disabled'
      },
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
      loaded: this.state.sys_id !== 'new' ? false : true
    }

    if (this.state.sys_id !== 'new') {
      this.getInfo()
    }
  }

  private getInfo() {
    API.get({
      path: '/api/q/sys_db_dictionary/' + this.state.sys_id,
      query: {
        fields: this.state.fields.join(',')
      }
    })
      .then((data: any) => {
        const state = { ...this.state }
        state.generalInfo = data.data.sys_db_dictionary
        state.loaded = true
        this.setState(state)
      })
      .catch((e) => {
        this.setState({ error: e.message, loaded: true })
        console.error(e)
      })
  }

  private handleChange(e) {
    const state = { ...this.state }
    state.disableSubmit = {}
    state.modifiedFields[e.target.id] = e.target.value
    state.fields[e.target.id] = e.target.value
    this.setState(state)
  }

  private handleSubmit(e) {
    console.log('submitted')
  }

  public render() {
    const pills = {
      general: {
        id: 'general',
        label: 'General',
        body: (
          <ColumnGeneralInformation
            info={this.state.generalInfo}
            sys_id={this.state.sys_id}
            fields={this.state.fields}
          />
        )
      },
      ref: {
        id: 'references',
        label: 'References',
        body: <ColumnTables sys_id={this.state.sys_id} />
      }
    }
    return (
      <>
        {this.state.loaded && (
          <Pills
            pills={pills}
            handleChange={this.handleChange.bind(this)}
            handleSubmit={this.handleSubmit}
            {...this.state}
          />
        )}
      </>
    )
  }
}
