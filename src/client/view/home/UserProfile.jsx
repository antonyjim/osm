import React, { Component } from 'react';
import { Field, SelectField } from '../common/forms.jsx';
import API from '../lib/API.js';
import Alert from '../common/alerts.jsx';
import Table from '../common/Table.jsx'
import Pills from '../common/PillLayout.jsx';

export class UserProfileInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {...props}
        this.state.modifiedFields = []
    }

    handleChange(e) {
        let fields = {...this.state.fields}
        let modifiedFields = this.state.modifiedFields
        fields[e.target.id] = e.target.value
        if (modifiedFields.indexOf(e.target.id) === -1) {
            modifiedFields.push(e.target.id)
        }
        this.setState({fields, modifiedFields})
    }

    handleSubmit(e) {
        const formName = e.target.getAttribute('data-form') || 'profile'
        const selector = '#' + this.state.modifiedFields.join(', #')
        const formContext = 'form[name=' + formName + ']'
        let body = {
            sys_id: $('#sys_id').val()
        }
        $(selector, formContext).each(function(index) {
            body[this.id] = this.value
        })
        API.put({
            path: '/api/q/sys_user/' + body.sys_id,
            body: body
        }, (err, data) => {
            console.log(err)
            if (err) this.setState({error: true, errorMessage: err})
        })
    }

    render() {
        return (
            <>
                {this.state.error && <Alert message={this.state.errorMessage} alertType="danger" />}
                {this.state.message && <Alert message={this.state.message} alertType="success" />}
                <h4> User Information </h4>
                <hr/>
                <form className="form-row" name="profile">
                    <input type="hidden" id="sys_id" value={this.state.fields.sys_id}/>
                    <Field id="username" label="Username" value={this.state.fields.username} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" attributes={{readOnly: 'readonly'}} />
                    <Field id="email" label="Email" value={this.state.fields.email} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" />
                    <Field id="userFirstName" label="First Name" value={this.state.fields.userFirstName} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" />
                    <Field id="userLastName" label="Last Name" value={this.state.fields.userLastName} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" />
                    <Field id="phone" label="Phone Number" value={this.state.fields.phone} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" />
                    <SelectField id="userDefaultNonsig" label="Home Nonsig" value={this.state.fields.userDefaultNonsig} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" opts={this.state.customers}/>
                    <Field id="userPass" label="Password" value={this.state.fields.userPass} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" type="password" attributes={{onFocus: this.handleFocus}}/>
                    <Field id="userPassConfirmation" label="Confirm Password" value={this.state.fields.userPassConfirmation} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" type="password" attributes={{onFocus: this.handleFocus}}/>
                    <button className="btn btn-primary btn-block submit" onClick={this.handleSubmit.bind(this)} data-form="profile" type="button">Save</button>
                </form>
            </>
        )
    }
}

class UserProfile extends Component {
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
            sys_id: props.match.params.id || false,
            logs: [],
            logCols: {
                'Time': {
                    boundTo: 'log_time',
                    type: 'Date'
                },
                'Action': {
                    boundTo: 'log_message',
                    type: 'string'
                }
            },
            customers: []
        }
        this.getUser()
    }

    handleChange(e) {
        let fields = {...this.state.fields}
        let modifiedFields = this.state.modifiedFields
        fields[e.target.id] = e.target.value
        if (modifiedFields.indexOf(e.target.id) === -1) {
            modifiedFields.push(e.target.id)
        }
        this.setState({fields, modifiedFields})
    }

    handleFocus(e) {
        e.target.select()
    }

    getUser() {
        let apiQ;
        if (this.state.sys_id) {
            apiQ = API.get({
                path: '/api/users/profile',
                query: {
                    sys_id: this.state.sys_id
                }
            })
        } else {
            apiQ = API.get({path: '/api/users/me'})
        }
        apiQ.then(response => {
            if (response.errors) throw response.errors
            let state = {...this.state.fields}
            let customers = []
            if (response.data.customers) {
                response.data.customers.map(customer => {
                    customers.push(customer.nsaNonsig)
                })
            }
            Object.keys(response.data.user).map(field => {
                state[field] = response.data.user[field]
            })
            state['notificationNonsig'] = response.data.user.userDefaultNonsig
            this.setState({
                fields: state,
                logs: response.data.logs,
                loaded: true,
                customers
            })
        })
        .catch(err => {
            console.error(err)
        })
    }

    handleSubmit(e) {
        const formName = e.target.getAttribute('data-form') || 'profile'
        const selector = '#' + this.state.modifiedFields.join(', #')
        const formContext = 'form[name=' + formName + ']'
        let body = {
            sys_id: $('#sys_id').val()
        }
        $(selector, formContext).each(function(index) {
            body[this.id] = this.value
        })
        API.put({
            path: '/api/q/sys_user/' + body.sys_id,
            body: JSON.stringify(body)
        }, (err, data) => {
            console.log(err)
            if (err) this.setState({error: true, errorMessage: err})
        })
    }

    render() {
        const pills = {
            profile: {
                id: 'profile',
                label: 'Profile',
                body: <UserProfileInfo onChange={this.handleChange.bind(this)} fields={{...this.state.fields}} customers={this.state.customers} />
            },
            notifications: {
                id: 'notifications',
                label: 'Notifications',
                body: (
                    <>
                        <h4>Notifications For</h4>
                        {this.state.loaded && 
                            <>
                                <SelectField id="notificationNonsig" value={this.state.fields.notificationNonsig} onChange={this.handleChange.bind(this)} opts={this.state.customers}/>
                                <hr />
                                <form name="notificationPreferences" className="form-row">
                                    <div className="col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="invoice">When I receive an invoice: </label>
                                    <select id="invoice" className="form-control">
                                        <option>Send an email</option>
                                        <option>Do not email me</option>
                                    </select>
                                    </div>
                                    <div className="col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="chgbck">When I receive a chargeback: </label>
                                    <select id="chgbck" className="form-control">
                                        <option>Send an email</option>
                                        <option>Do not email me</option>
                                    </select>
                                    </div>
                                    <div className="col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="g86">When I receive a G86: </label>
                                    <select id="g86" className="form-control">
                                        <option>Send an email</option>
                                        <option>Do not email me</option>
                                    </select>
                                    </div>
                                    <div className="col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="fhq">When I receive a FleetHQ Call: </label>
                                    <select id="fhq" className="form-control">
                                        <option>Send an email</option>
                                        <option>Do not email me</option>
                                    </select>
                                    </div>
                                    <div className="col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="doh">Documents on hold older than </label>
                                    <select id="doh" className="form-control">
                                        <option>Do not email me</option>
                                        <option>1 Day</option>
                                        <option>5 Days</option>
                                        <option>14 Days</option>
                                        <option>1 Month</option>
                                        <option>3 Months</option>
                                    </select>
                                    </div>
                                    <div className="col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="news">When news is released</label>
                                    <select id="news" className="form-control">
                                        <option>Send an email</option>
                                        <option>Do not email me</option>
                                    </select>
                                    </div>
                                    <button className="btn btn-primary btn-block submit" data-form="notificationPreferences" type="button">Save</button>
                                </form>
                            </>
                        }
                    </>
                )
            },
            logs: {
                id: 'logs',
                label: 'History',
                body: (
                    <>
                        <h4> History </h4>
                        <hr/>
                        <p> View actions that have been taken on your account </p>
                        {this.state.loaded && <Table cols={this.state.logCols} rows={this.state.logs} hideActions={true} /> }
                    </>
                )
            }
        }
        return (
            <>
                {this.state.loaded && <Pills pills={pills} handleFocus={this.handleFocus.bind(this)} handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit} {...this.state} /> }
            </>
        )
    }
}

export default UserProfile
