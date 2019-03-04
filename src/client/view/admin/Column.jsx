import React, { Component } from 'react'
import Pills from '../common/PillLayout.jsx'
import Table from '../common/Table.jsx'
import { Field, SelectField, Checkbox } from '../common/forms.jsx'
import API from '../lib/API.js'

export class ColumnGeneralInformation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sys_id: props.sys_id,
      fields: { ...props.info },
      modifiedFields: [],
      saveDisabled: { disabled: 'disabled' }
    }
  }

  handleChange(e) {
    let _state = { ...this.state }
    _state.fields[e.target.id] = e.target.value
    if (e.target.type === 'checkbox')
      _state.fields[e.target.id] = e.target.checked
    if (!_state.modifiedFields.includes(e.target.id))
      _state.modifiedFields.push(e.target.id)
    _state.saveDisabled = {}
    this.setState(_state)
  }

  handleSubmit(e) {
    if (this.props.sys_id === 'new') {
      this.createNew()
    } else {
      let body = { sys_id: this.state.sys_id }
      this.state.modifiedFields.forEach((field) => {
        body[field] = this.state.fields[field]
      })
      API.put({
        path: '/api/q/sys_db_dictionary/' + this.state.sys_id,
        body: body,
        query: { fields: this.props.fields.join(',') }
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          this.props.handleErrorMessage(err)
        })
    }
  }

  createNew(e) {
    API.post({
      path: '/api/q/sys_db_dictionary',
      query: {
        fields: this.props.fields.join(',')
      },
      body: this.state.fields
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {
    const dataTypes = ['CHAR', 'VARCHAR', 'INT', 'FLOAT', 'TEXT', 'BOOLEAN']
    let length = {}
    let colNameReadonly = {}
    if (!this.state.type in ['CHAR', 'VARCHAR'])
      length = { readOnly: 'readonly' }
    if (!this.props.sys_id === 'new') colNameReadonly = { readOnly: 'readonly' }
    return (
      <>
        <h4> General Information </h4>
        <hr />
        <form className="form-row" name="info">
          <input type="hidden" id="sys_id" value={this.state.sys_id} />
          <Field
            id="column_name"
            label="Column Name"
            value={this.state.fields.column_name}
            onChange={this.handleChange.bind(this)}
            className="col-lg-6 col-md-12"
            attributes={colNameReadonly}
          />
          <Field
            id="label"
            label="Label"
            value={this.state.fields.label}
            onChange={this.handleChange.bind(this)}
            className="col-lg-6 col-md-12"
          />
          <Field
            id="table_name"
            label="Table"
            value={this.state.fields.table_name}
            display={this.state.fields.table_name_display}
            onChange={this.handleChange.bind(this)}
            className="col-lg-6 col-md-12"
            type="text"
            references="sys_db_object"
          />
          <Field
            id="hint"
            label="Hint"
            value={this.state.fields.hint}
            onChange={this.handleChange.bind(this)}
            className="col-lg-6 col-md-12"
            type="text"
          />
          <SelectField
            id="type"
            label="Data Type"
            value={this.state.fields.type}
            onChange={this.handleChange.bind(this)}
            className="col-lg-6 col-md-12"
            opts={dataTypes}
          />
          <Field
            id="len"
            label="Length"
            value={this.state.fields.len}
            onChange={this.handleChange.bind(this)}
            attributes={length}
            className="col-lg-6 col-md-12"
            type="number"
          />
          <Field
            id="base_url"
            label="Base URL"
            value={this.state.fields.base_url}
            onChange={this.handleChange.bind(this)}
            className="col-lg-6 col-md-12"
            type="text"
          />
          <Field
            id="reference_id"
            label="References"
            value={this.state.fields.reference_id}
            display={this.state.fields.reference_id_display}
            onChange={this.handleChange.bind(this)}
            className="col-lg-6 col-md-12"
            type="text"
            references="sys_db_dictionary"
          />
          <Field
            id="enum"
            label="Enum"
            value={this.state.fields.enum}
            onChange={this.handleChange.bind(this)}
            className="col-lg-6 col-md-12"
            type="text"
          />
          <Field
            id="col_order"
            label="Col Order"
            value={this.state.fields.col_order}
            onChange={this.handleChange.bind(this)}
            className="col-lg-6 col-md-12"
            type="number"
          />
          <Checkbox
            id="readonly"
            label="Readonly"
            checked={this.state.fields.readonly}
            onChange={this.handleChange.bind(this)}
          />
          <Checkbox
            id="nullable"
            label="Nullable"
            checked={this.state.fields.nullable}
            onChange={this.handleChange.bind(this)}
          />
          <Checkbox
            id="update_key"
            label="Primary Key"
            checked={this.state.fields.update_key}
            onChange={this.handleChange.bind(this)}
          />
          <Checkbox
            id="default_view"
            label="Show as Default"
            checked={this.state.fields.default_view}
            onChange={this.handleChange.bind(this)}
          />
          <Checkbox
            id="admin_view"
            label="View as Admin"
            checked={this.state.fields.admin_view}
            onChange={this.handleChange.bind(this)}
          />
          <button
            className="btn btn-primary btn-block submit"
            onClick={this.handleSubmit.bind(this)}
            data-form="info"
            type="button"
            {...this.state.saveDisabled}
          >
            Save
          </button>
        </form>
      </>
    )
  }
}

class ColumnTables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sys_id: props.sys_id
    }
  }

  handleChange(e) {
    let state = { ...this.state }
    state.fields[e.target.id] = e.target.value
    if (!state.modifiedFields.includes(e.target.id))
      state.modifiedFields.push(e.target.id)
    state.saveDisabled = {}
    this.setState(state)
  }

  render() {
    return (
      <Table
        table="sys_db_dictionary_list"
        args={{ reference_id: this.state.sys_id }}
      />
    )
  }
}

export default class Column extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      loaded: false,
      sys_id: props.id,
      generalInfo: {},
      fields: {
        column_name: '',
        label: '',
        hint: '',
        table: '',
        type: '',
        length: 0
      },
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
        'base_url',
        'default_view',
        'selectable',
        'nullable',
        'reference_id',
        'table_name_display',
        'reference_id_display'
      ]
    }

    if (this.state.sys_id !== 'new') {
      this.getInfo()
    } else {
      this.state.loaded = true
    }
  }

  getInfo() {
    API.get({
      path: '/api/q/sys_db_dictionary/' + this.state.sys_id,
      query: {
        fields: this.state.fields.join(',')
      }
    })
      .then((data) => {
        let state = { ...this.state }
        state.generalInfo = data.data.sys_db_dictionary
        state.loaded = true
        this.setState(state)
      })
      .catch((e) => {
        this.setState({ error: e.message, loaded: true })
        console.error(e)
      })
  }

  handleChange(e) {
    let state = { ...this.state }
    state.disableSubmit = {}
    state.modifiedFields[e.target.id] = e.target.value
    state.fields[e.target.id] = e.target.value
    this.setState(state)
  }

  handleSubmit(e) {
    console.log('submitted')
  }

  render() {
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
