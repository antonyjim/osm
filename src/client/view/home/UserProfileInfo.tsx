import * as React from 'react'
import { Component } from 'react'
import { Field, SelectField } from '../common/FormControls'
import * as $ from 'jquery'
import { Alert } from '../common/Alerts'
import API from '../lib/API'

export class UserProfileInfo extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { ...props, modifiedFields: [] }
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
        body
      },
      (err, data) => {
        console.log(err)
        if (err) this.setState({ error: true, errorMessage: err })
      }
    )
  }

  public render() {
    return (
      <>
        {this.state.error && (
          <Alert message={this.state.errorMessage} alertType='danger' />
        )}
        {this.state.message && (
          <Alert message={this.state.message} alertType='success' />
        )}
        <h4> User Information </h4>
        <hr />
        <form className='form-row' name='profile'>
          <input type='hidden' id='sys_id' value={this.state.fields.sys_id} />
          <Field
            id='username'
            name='username'
            type='text'
            label='Username'
            value={this.state.fields.username}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
            attributes={{ readOnly: 'readonly' }}
          />
          <Field
            id='email'
            name='email'
            type='text'
            label='Email'
            value={this.state.fields.email}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
          />
          <Field
            id='userFirstName'
            label='First Name'
            name='userFirstName'
            type='text'
            value={this.state.fields.userFirstName}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
          />
          <Field
            id='userLastName'
            label='Last Name'
            name='userLastName'
            type='text'
            value={this.state.fields.userLastName}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
          />
          <Field
            id='phone'
            name='phone'
            type='text'
            label='Phone Number'
            value={this.state.fields.phone}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
          />
          <SelectField
            id='userDefaultNonsig'
            label='Home Nonsig'
            value={this.state.fields.userDefaultNonsig}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
            opts={this.state.customers}
          />
          <Field
            id='userPass'
            name='userPass'
            label='Password'
            value={this.state.fields.userPass}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
            type='password'
            attributes={{
              onFocus: (e) => {
                e.target.select()
              }
            }}
          />
          <Field
            id='userPassConfirmation'
            name='userPassConfirmation'
            label='Confirm Password'
            value={this.state.fields.userPassConfirmation}
            onChange={this.handleChange.bind(this)}
            className='col-lg-6 col-md-12'
            type='password'
            attributes={{
              onFocus: (e) => {
                e.target.select()
              }
            }}
          />
          <button
            className='btn btn-primary btn-block submit'
            onClick={this.handleSubmit.bind(this)}
            data-form='profile'
            type='button'
          >
            Save
          </button>
        </form>
      </>
    )
  }
}
