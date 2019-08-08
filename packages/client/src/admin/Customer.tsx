import * as React from 'react'
import { Component } from 'react'
import Pills from '../common/PillLayout'
import API from '../lib/API'
import Table from '../common/Table'
import { Checkbox, Field } from '../common/FormControls'

export default class Customer extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      error: false,
      errorMessage: '',
      loaded: false,
      fields: {},
      modifiedFields: [],
      customer: props.id
    }
    if (this.props.id !== 'new') this.getCustomer()
  }

  private getCustomer() {
    API.get({
      path: '/api/q/sys_customer/' + this.state.customer,
      query: {
        fields:
          'nonsig,nsTradeStyle,nsAddr1,nsAddr2,nsState,nsCity,nsPostalCode,nsCountry,active,active_thq,nsType'
      }
    })
      .then((response: any) => {
        if (response.errors.length > 0) {
          this.setState({
            error: true,
            errorMessage: response.errors[0].message,
            loaded: true
          })
        } else {
          this.setState({ fields: response.data.sys_customer, loaded: true })
        }
      })
      .catch((e: Error) => {
        this.setState({ error: true, errorMessage: e.message, loaded: true })
      })
  }

  private handleChange(e: React.ChangeEvent) {
    if (e.target instanceof HTMLInputElement) {
      const state = { ...this.state }
      state.fields[e.target.id] = e.target.value
      this.setState(state)
    }
  }

  private handleSubmit() {
    console.log('Submitted')
  }

  public render() {
    const pills = {
      general: {
        id: 'general',
        label: 'General',
        body: (
          <>
            <button
              className='btn btn-primary float-right'
              onClick={this.handleSubmit}
            >
              Save
            </button>
            <h4>General Information</h4>
            <hr />
            <form className='form-row' name='generalInformation'>
              <Field
                id='nonsig'
                name='nonsig'
                type='text'
                value={this.state.fields.nonsig}
                label='Nonsig'
                className='col-lg-6 col-md-12'
                onChange={this.handleChange.bind(this)}
              />
              <Field
                id='nsTradeStyle'
                name='nsTradeStyle'
                type='text'
                value={this.state.fields.nsTradeStyle}
                label='Tradestyle'
                className='col-lg-6 col-md-12'
                onChange={this.handleChange.bind(this)}
              />
              <Field
                id='nsAddr1'
                name='nsAddr1'
                type='text'
                value={this.state.fields.nsAddr1}
                label='Address'
                className='col-lg-6 col-md-12'
                onChange={this.handleChange.bind(this)}
              />
              <Field
                id='nsAddr2'
                name='nsAddr2'
                type='text'
                value={this.state.fields.nsAddr2}
                label='Address (2)'
                className='col-lg-6 col-md-12'
                onChange={this.handleChange.bind(this)}
              />
              <Field
                id='nsCity'
                name='nsCity'
                type='text'
                value={this.state.fields.nsCity}
                label='City'
                className='col-lg-6 col-md-12'
                onChange={this.handleChange.bind(this)}
              />
              <Field
                id='nsState'
                name='nsState'
                type='text'
                value={this.state.fields.nsState}
                label='State'
                className='col-lg-6 col-md-12'
                onChange={this.handleChange.bind(this)}
              />
              <Field
                id='nsPostalCode'
                name='nsPostalCode'
                type='text'
                value={this.state.fields.nsPostalCode}
                label='Postal Code'
                className='col-lg-6 col-md-12'
                onChange={this.handleChange.bind(this)}
              />
              <Field
                id='nsCountry'
                name='nsPostalCode'
                type='text'
                value={this.state.fields.nsCountry}
                label='Country'
                className='col-lg-6 col-md-12'
                onChange={this.handleChange.bind(this)}
              />
              <Field
                id='nsType'
                name='nsType'
                type='text'
                value={this.state.fields.nsType}
                label='Type'
                className='col-lg-6 col-md-12'
                onChange={this.handleChange.bind(this)}
              />
              <Checkbox
                id='nsIsActive'
                name='nsIsActive'
                checked={this.state.fields.nsIsActive}
                label='Active'
                onChange={this.handleChange.bind(this)}
              />
              <Checkbox
                id='nsIsActiveTHQ'
                name='nsIsActiveTHQ'
                checked={this.state.fields.nsIsActiveTHQ}
                label='Active in Tire-HQ'
                onChange={this.handleChange.bind(this)}
              />
            </form>
          </>
        )
      },
      users: {
        id: 'users',
        label: 'Users',
        body: (
          <>
            <h4>Users</h4>
            <hr />
            <p> View users associated with this customer. </p>
            <Table
              table='sys_user_list'
              args={{ userDefaultNonsig: this.state.customer }}
              cols={[
                'sys_id',
                'userFirstName',
                'userLastName',
                'userLastLogin',
                'userDefaultNonsig',
                'email'
              ]}
            />
          </>
        )
      },
      brands: {
        id: 'brands',
        label: 'Brands',
        body: (
          <>
            <h4>Brands</h4>
            <hr />
          </>
        )
      },
      logs: {
        id: 'logs',
        label: 'History',
        body: (
          <>
            <h4>History</h4>
            <hr />
            <p>View actions that have been taken on this customer</p>
          </>
        )
      }
    }
    return (
      <>
        {this.state.loaded ||
          (this.state.customer === 'new' && (
            <Pills pills={pills} {...this.state} />
          ))}
      </>
    )
  }
}
