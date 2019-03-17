import * as React from 'react'
import { Component } from 'react'
import API from '../lib/API'
import Table from '../common/Table'
import Pills from '../common/PillLayout'
import $ from 'jquery'
import { UserProfileInfo } from './UserProfileInfo'
import { SelectField } from '../common/FormControls'

// interface IUserProfileProps {}

interface IUserProfileState {
  modifiedFields: string[]
  fields: any
  error?: boolean
  errorMessage?: string
  mesage?: string
}

class UserProfile extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      errorMessage: '',
      loaded: false,
      fields: {
        sys_id: '',
        username: '',
        email: '',
        notificationNonsig: '',
        userFirstName: '',
        userLastName: '',
        phone: '',
        userDefaultNonsig: '',
        userPass: 'thisisnotanactualpassword',
        userPassConfirmation: 'thisisnotanactualpassword'
      },
      modifiedFields: [],
      sys_id: props.id || false,
      logs: [],
      logCols: {
        Time: {
          boundTo: 'log_time',
          type: 'Date'
        },
        Action: {
          boundTo: 'log_message',
          type: 'string'
        }
      },
      customers: []
    }
    this.getUser()
  }

  private handleChange(e) {
    const fields = { ...this.state.fields }
    const modifiedFields = this.state.modifiedFields
    fields[e.target.id] = e.target.value
    if (modifiedFields.indexOf(e.target.id) === -1) {
      modifiedFields.push(e.target.id)
    }
    this.setState({ fields, modifiedFields })
  }

  private handleFocus(e) {
    e.target.select()
  }

  private getUser() {
    let apiQ
    if (this.state.sys_id) {
      apiQ = API.get({
        path: '/api/users/profile',
        query: {
          sys_id: this.state.sys_id
        }
      })
    } else {
      apiQ = API.get({ path: '/api/users/me' })
    }
    apiQ
      .then((response) => {
        if (response.errors) throw response.errors
        const state = { ...this.state.fields }
        const customers = []
        if (response && response.data && response.data.customers) {
          response.data.customers.map((customer) => {
            customers.push(customer.nsaNonsig)
          })
        }
        if (response.data && response.data.user) {
          Object.keys(response.data.user).map((field) => {
            state[field] = response.data.user[field]
          })
          state.notificationNonsig = response.data.user.userDefaultNonsig
        }

        this.setState({
          fields: state,
          logs: response.data.logs,
          loaded: true,
          customers
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  private handleSubmit(e) {
    const formName = e.target.getAttribute('data-form') || 'profile'
    const selector = '#' + this.state.modifiedFields.join(', #')
    const formContext = 'form[name=' + formName + ']'
    const body = {
      sys_id: $('#sys_id').val()
    }
    $(selector, $(formContext)).each(function(index) {
      if (this instanceof HTMLInputElement) {
        body[this.id] = this.value
      }
    })
    API.patch(
      {
        path: '/api/q/sys_user/' + body.sys_id,
        body: JSON.stringify(body)
      },
      (err, data) => {
        console.log(err)
        if (err) this.setState({ error: true, errorMessage: err })
      }
    )
  }

  public render() {
    const pills = {
      profile: {
        id: 'profile',
        label: 'Profile',
        body: (
          <UserProfileInfo
            onChange={this.handleChange.bind(this)}
            fields={{ ...this.state.fields }}
            customers={this.state.customers}
          />
        )
      },
      notifications: {
        id: 'notifications',
        label: 'Notifications',
        body: (
          <>
            <h4>Notifications For</h4>
            {this.state.loaded && (
              <>
                <SelectField
                  id='notificationNonsig'
                  value={this.state.fields.notificationNonsig}
                  onChange={this.handleChange.bind(this)}
                  opts={this.state.customers}
                />
                <hr />
                <form name='notificationPreferences' className='form-row'>
                  <div className='col-lg-6 col-sm-12 form-group'>
                    <label htmlFor='invoice'>When I receive an invoice: </label>
                    <select id='invoice' className='form-control'>
                      <option>Send an email</option>
                      <option>Do not email me</option>
                    </select>
                  </div>
                  <div className='col-lg-6 col-sm-12 form-group'>
                    <label htmlFor='chgbck'>
                      When I receive a chargeback:{' '}
                    </label>
                    <select id='chgbck' className='form-control'>
                      <option>Send an email</option>
                      <option>Do not email me</option>
                    </select>
                  </div>
                  <div className='col-lg-6 col-sm-12 form-group'>
                    <label htmlFor='g86'>When I receive a G86: </label>
                    <select id='g86' className='form-control'>
                      <option>Send an email</option>
                      <option>Do not email me</option>
                    </select>
                  </div>
                  <div className='col-lg-6 col-sm-12 form-group'>
                    <label htmlFor='fhq'>When I receive a FleetHQ Call: </label>
                    <select id='fhq' className='form-control'>
                      <option>Send an email</option>
                      <option>Do not email me</option>
                    </select>
                  </div>
                  <div className='col-lg-6 col-sm-12 form-group'>
                    <label htmlFor='doh'>Documents on hold older than </label>
                    <select id='doh' className='form-control'>
                      <option>Do not email me</option>
                      <option>1 Day</option>
                      <option>5 Days</option>
                      <option>14 Days</option>
                      <option>1 Month</option>
                      <option>3 Months</option>
                    </select>
                  </div>
                  <div className='col-lg-6 col-sm-12 form-group'>
                    <label htmlFor='news'>When news is released</label>
                    <select id='news' className='form-control'>
                      <option>Send an email</option>
                      <option>Do not email me</option>
                    </select>
                  </div>
                  <button
                    className='btn btn-primary btn-block submit'
                    data-form='notificationPreferences'
                    type='button'
                  >
                    Save
                  </button>
                </form>
              </>
            )}
          </>
        )
      },
      logs: {
        id: 'logs',
        label: 'History',
        body: (
          <>
            <h4> History </h4>
            <hr />
            <p> View actions that have been taken on your account </p>
            {this.state.loaded && (
              <Table
                cols={this.state.logCols}
                rows={this.state.logs}
                hideActions={true}
              />
            )}
          </>
        )
      }
    }
    return <>{this.state.loaded && <Pills pills={pills} />}</>
  }
}

export default UserProfile
