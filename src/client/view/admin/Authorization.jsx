import React, { Component } from 'react'
import { TowelRecord } from '../lib/API.js'
import { Field, Checkbox } from '../common/forms.jsx'

export default class Authorization extends Component {
  constructor(props) {
    super(props)
    this.state = {
      table: 'sys_authorization',
      fields: {},
      modifiedFields: [],
      sys_id: props.id
    }
    if (props.id !== 'new') this.getRows()
  }

  getRows() {
    new TowelRecord(this.state.table)
      .get({
        fields:
          'sys_id,auth_table,auth_priv,auth_table_display,auth_priv_display,auth_can_edit,auth_can_edit_own,auth_can_read,auth_can_read_own,auth_can_delete,auth_can_delete_own',
        id: this.state.sys_id
      })
      .then((res) => {
        console.log(res)
        this.setState({ fields: res.data[this.state.table] })
      })
      .catch((err) => {
        console.error(err)
      })
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
    e.preventDefault()
    if (this.state.sys_id === 'new') {
      new TowelRecord(this.state.table)
        .create(this.state.fields, Object.keys(this.state.fields))
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
    } else {
      new TowelRecord(this.state.table)
        .update(this.state.sys_id, this.state.fields)
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
    }
  }

  render() {
    return (
      <>
        <form id='auth'>
          <input
            id='sys_id'
            name='sys_id'
            type='hidden'
            value={this.state.fields.sys_id}
            onChange={this.handleChange.bind(this)}
          />
          <Field
            id='auth_table'
            name='auth_table'
            label='Table'
            value={this.state.fields.auth_table}
            display={this.state.fields.auth_table_display}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
            type='text'
            references='sys_db_object'
          />
          <Field
            id='auth_priv'
            name='auth_priv'
            label='Role'
            className='col-lg-6 col-md-12'
            value={this.state.fields.auth_priv}
            display={this.state.fields.auth_priv_display}
            onChange={this.handleChange.bind(this)}
            references='sys_priv'
            type='text'
          />
          <Checkbox
            id='auth_can_edit'
            label='Can Edit'
            value={this.state.fields.auth_can_edit}
            onChange={this.handleChange.bind(this)}
            checked={!!this.state.fields.auth_can_edit}
            className='col-lg-6 col-md-12'
          />
          <Checkbox
            id='auth_can_edit_own'
            label='Can Edit Own'
            value={this.state.fields.auth_can_edit_own}
            onChange={this.handleChange.bind(this)}
            checked={!!this.state.fields.auth_can_edit_own}
            className='col-lg-6 col-md-12'
          />
          <Checkbox
            id='auth_can_read'
            label='Can Read'
            value={this.state.fields.auth_can_read}
            onChange={this.handleChange.bind(this)}
            checked={!!this.state.fields.auth_can_read}
            className='col-lg-6 col-md-12'
          />
          <Checkbox
            id='auth_can_read_own'
            label='Can Read Own'
            value={this.state.fields.auth_can_read_own}
            onChange={this.handleChange.bind(this)}
            checked={!!this.state.fields.auth_can_read_own}
            className='col-lg-6 col-md-12'
          />
          <Checkbox
            id='auth_can_delete'
            label='Can Delete'
            value={this.state.fields.auth_can_delete}
            onChange={this.handleChange.bind(this)}
            checked={!!this.state.fields.auth_can_delete}
            className='col-lg-6 col-md-12'
          />
          <Checkbox
            id='auth_can_delete_own'
            label='Can Delete Own'
            value={this.state.fields.auth_can_delete_own}
            onChange={this.handleChange.bind(this)}
            checked={!!this.state.fields.auth_can_delete_own}
            className='col-lg-6 col-md-12'
          />

          <button
            className='btn btn-primary btn-block'
            onClick={this.handleSubmit.bind(this)}
            role='button'
          >
            Save
          </button>
        </form>
      </>
    )
  }
}
