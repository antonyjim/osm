import React, { Component } from 'react'
import Pills from '../common/PillLayout'
import { Field } from '../common/FormControls'
import API from '../lib/API'
import Table from '../common/Table/Table'

class TableGeneralInformation extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      fields: {
        name: null
      },
      sys_id: props.sys_id,
      loaded: props.sys_id === 'new' ? true : false
    }
    if (props.sys_id !== 'new') {
      this.fetchTableInformation()
    }
  }

  private fetchTableInformation() {
    API.get({ path: '/api/q/sys_db_object/' + this.state.sys_id })
      .then((response: any) => {
        this.setState({
          fields: response.data.sys_db_object || {},
          loaded: true
        })
      })
      .catch((e) => {
        throw e
      })
  }

  private handleChange(e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  private submitChange(e) {
    e.preventDefault()
    const apiRoute = '/api/q/sys_db_object'
    let apiQuery
    if (this.state.sys_id === 'new') {
      apiQuery = API.post({ path: apiRoute, body: { ...this.state.fields } })
    } else {
      apiQuery = API.patch({
        path: apiRoute + '/' + this.state.sys_id,
        body: { ...this.state.fields }
      })
    }
    apiQuery
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  public render() {
    return (
      <>
        {this.state.loaded && (
          <>
            <h4> General Information </h4>
            <hr />
            <form className='form-row' name='info'>
              <Field
                label='Label'
                value={this.state.fields.label}
                id='label'
                name='label'
                type='text'
                onChange={this.handleChange.bind(this)}
                className='col-lg-6 col-md-12'
              />
              <Field
                label='Name'
                value={this.state.fields.name}
                id='name'
                name='name'
                onChange={this.handleChange.bind(this)}
                readOnly='readonly'
                className='col-lg-6 col-md-12'
                type='text'
              />
              <Field
                label='Description'
                value={this.state.fields.description}
                id='description'
                name='description'
                type='text'
                onChange={this.handleChange.bind(this)}
                className='col-lg-12'
              />
              <button
                className='btn btn-primary btn-block'
                onClick={this.submitChange.bind(this)}
              >
                Save
              </button>
            </form>
          </>
        )}
      </>
    )
  }
}

export function TableModifier(props) {
  const pills = {
    generalInformation: {
      id: 'general',
      label: 'General Info',
      body: <TableGeneralInformation sys_id={props.id} />
    },
    relatedFields: {
      id: 'related',
      label: 'Fields',
      body: (
        <Table
          table='sys_db_dictionary_list'
          args={{ table_name: props.id }}
          showSearch={true}
        />
      )
    }
  }
  return <Pills pills={pills} />
}
