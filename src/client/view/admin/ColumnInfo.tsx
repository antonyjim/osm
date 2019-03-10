import * as React from 'react'
import { Component } from 'react'
import API from '../lib/API'
import { Field, Reference, SelectField, Checkbox } from '../common/FormControls'

interface IColumnGeneralInformationProps {
  sys_id: string
  fields: string[]
  handleErrorMessage: (err: Error) => void
}

interface IColumnGeneralInformationState {
  fields: any
  sys_id: string
  modifiedFields: string[]
  saveDisabled?: { disabled?: string }
  type?: string
}

export class ColumnGeneralInformation extends Component<
  // IColumnGeneralInformationProps,
  // IColumnGeneralInformationState
  any,
  any
> {
  constructor(props) {
    super(props)
    this.state = {
      sys_id: props.sys_id,
      fields: { ...props.info },
      modifiedFields: [],
      saveDisabled: { disabled: 'disabled' }
    }
  }

  private handleChange(e) {
    const prevState = { ...this.state }
    prevState.fields[e.target.id] = e.target.value
    if (e.target.type === 'checkbox') {
      prevState.fields[e.target.id] = e.target.checked
    }
    if (!prevState.modifiedFields.includes(e.target.id)) {
      prevState.modifiedFields.push(e.target.id)
    }
    prevState.saveDisabled = {}
    this.setState(prevState)
  }

  private handleSubmit(e) {
    if (this.props.sys_id === 'new') {
      this.createNew(e)
    } else {
      const body = { sys_id: this.state.sys_id }
      this.state.modifiedFields.forEach((field) => {
        body[field] = this.state.fields[field]
      })
      API.patch({
        path: '/api/q/sys_db_dictionary/' + this.state.sys_id,
        body,
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

  private createNew(e) {
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

  public render() {
    const dataTypes = ['CHAR', 'VARCHAR', 'INT', 'FLOAT', 'TEXT', 'BOOLEAN']
    let length = {}
    let colNameReadonly = {}
    if (!(this.state.type in ['CHAR', 'VARCHAR'])) {
      length = { readOnly: 'readonly' }
    }
    if (this.props.sys_id !== 'new') colNameReadonly = { readOnly: 'readonly' }
    return (
      <>
        <h4> General Information </h4>
        <hr />
        <form className='form-row' name='info'>
          <input type='hidden' id='sys_id' value={this.state.sys_id} />
          <Field
            id='column_name'
            name='column_name'
            label='Column Name'
            value={this.state.fields.column_name}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
            attributes={colNameReadonly}
            type='text'
          />
          <Field
            id='label'
            name='label'
            label='Label'
            value={this.state.fields.label}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
            type='text'
          />
          <Reference
            id='table_name'
            name='table_name'
            label='Table'
            value={this.state.fields.table_name}
            display={this.state.fields.table_name_display}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
            type='text'
            references='sys_db_object'
          />
          <Field
            id='hint'
            name='hint'
            label='Hint'
            value={this.state.fields.hint}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
            type='text'
          />
          <SelectField
            id='type'
            label='Data Type'
            value={this.state.fields.type}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
            opts={dataTypes}
          />
          <Field
            id='len'
            name='len'
            label='Length'
            value={this.state.fields.len}
            onChange={this.handleChange.bind(this)}
            attributes={length}
            className='col-lg-6 col-md-12'
            type='number'
          />
          <Reference
            id='reference_id'
            name='reference_id'
            label='References'
            value={this.state.fields.reference_id}
            display={this.state.fields.reference_id_display}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
            type='text'
            references='sys_db_dictionary'
          />
          <Field
            id='enum'
            name='enum'
            label='Enum'
            value={this.state.fields.enum}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
            type='text'
          />
          <Field
            id='col_order'
            name='col_order'
            label='Col Order'
            value={this.state.fields.col_order}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
            type='number'
          />
          <Checkbox
            id='readonly'
            name='readonly'
            label='Readonly'
            checked={this.state.fields.readonly}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
          />
          <Checkbox
            id='nullable'
            name='nullable'
            label='Nullable'
            checked={this.state.fields.nullable}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
          />
          <Checkbox
            id='update_key'
            name='update_key'
            label='Primary Key'
            checked={this.state.fields.update_key}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
          />
          <Checkbox
            id='default_view'
            name='default_view'
            label='Show as Default'
            checked={this.state.fields.default_view}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
          />
          <Checkbox
            id='visible'
            name='visible'
            label='Show On Forms'
            checked={this.state.fields.visible}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
          />
          <Checkbox
            id='required_on_create'
            name='required_on_create'
            label='Require For Creation'
            checked={this.state.fields.required_on_create}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
          />
          <Checkbox
            id='required_on_update'
            name='required_on_update'
            label='Require For Update'
            checked={this.state.fields.required_on_update}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
          />
          <Checkbox
            id='display_field'
            name='display_field'
            label='Display As Link'
            value={this.state.fields.display_field}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
            checked={this.state.fields.display_field}
          />
          <button
            className='btn btn-primary btn-block submit'
            onClick={this.handleSubmit.bind(this)}
            data-form='info'
            type='button'
            {...this.state.saveDisabled}
          >
            Save
          </button>
        </form>
      </>
    )
  }
}
