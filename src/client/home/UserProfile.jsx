import React, { Component } from 'react';
import { Field } from '../common/forms.jsx';
import API from '../lib/API.js';
import Alert from '../common/alerts.jsx';

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            errorMessage: '',
            fields: {
                userId: '',
                userName: '',
                userEmail: '',
                userFirstName: '',
                userLastName: '',
                userPhone: '',
                userDefaultNonsig: '',
                userPass: 'thisisnotanactualpassword',
                userPassConfirmation: 'thisisnotanactualpassword'
            },
            modifiedFields: [],
            userId: this.props.match.params.userId || false
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
        API.post({
            path: '/api/q/user',
            body: JSON.stringify({
                query: `
                    query SingleUser ($userId: ID!) {
                        user (userId: $userId) {
                            userId
                            userName
                            userEmail
                            userFirstName
                            userLastName
                            userDefaultNonsig
                            userPhone
                        }
                    }
                `,
                variables: {
                    userId: this.state.userId || null
                }
            })
        })
        .then(response => {
            if (response.errors) throw response.errors
            let state = {...this.state.fields}
            Object.keys(response.data.user).map(field => {
                state[field] = response.data.user[field]
            })
            this.setState({fields: state})
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
            userId: $('#userId').val()
        }
        $(selector, formContext).each(function(index) {
            body[this.id] = this.value
        })
        API.post({
            path: '/api/q/update_user',
            body: JSON.stringify({
                query: `
                    mutation (
                        $userId: ID!,
                        $userEmail: String,
                        $userFirstName: String,
                        $userLastName: String,
                        $userPhone: String,
                        $userPass: String,
                        $userPassConfirmation: String,
                        $userDefaultNonsig: String
                     ){
                        update_user(
                            userId: $userId, 
                            userEmail: $userEmail, 
                            userFirstName: $userFirstName, 
                            userLastName: $userLastName, 
                            userPhone: $userPhone, 
                            userPass: $userPass, 
                            userPassConfirmation: $userPassConfirmation, 
                            userDefaultNonsig: $userDefaultNonsig) {
                                userId
                                userName
                                userEmail
                                userFirstName
                                userLastName
                                userDefaultNonsig
                                userPhone
                            }
                    }
                `,
                variables: body
            })
        }, (err, data) => {
            console.log(err)
            if (err) this.setState({error: true, errorMessage: err})
        })
    }

    render() {
        return (
        <div className="container-fluid">
            <div className="row mt-4">
                <div className="col-md-3 col-sm-12">
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link active" id="profile-tab" data-toggle="pill" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Profile</a>
                    <a className="nav-link" id="notify-tab" data-toggle="pill" href="#notify" role="tab" aria-controls="notify" aria-selected="false">Notifications</a>
                    <a className="nav-link" id="history-tab" data-toggle="pill" href="#history" role="tab" aria-controls="history" aria-selected="false">History</a>
                </div>
                </div>
                <div className="col-md-9 col-sm-12 mb-5">
                <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-lg-8 col-md-10 col-sm-12 pt-4">
                        {this.state.error && <Alert message={this.state.errorMessage} alertType="danger" />}
                        {this.state.message && <Alert message={this.state.message} alertType="success" />}
                        <h4> User Information </h4>
                        <hr/>
                        <form className="form-row" name="profile">
                            <input type="hidden" id="userId" value={this.state.fields.userId}/>
                            <Field id="userName" label="Username" value={this.state.fields.userName} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" attributes={{readOnly: 'readonly'}} />
                            <Field id="userEmail" label="Email" value={this.state.fields.userEmail} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" />
                            <Field id="userFirstName" label="First Name" value={this.state.fields.userFirstName} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" />
                            <Field id="userLastName" label="Last Name" value={this.state.fields.userLastName} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" />
                            <Field id="userPhone" label="Phone Number" value={this.state.fields.userPhone} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" />
                            <Field id="userDefaultNonsig" label="Home Nonsig" value={this.state.fields.userDefaultNonsig} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" />
                            <Field id="userPass" label="Password" value={this.state.fields.userPass} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" type="password" attributes={{onFocus: this.handleFocus}}/>
                            <Field id="userPassConfirmation" label="Confirm Password" value={this.state.fields.userPassConfirmation} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" type="password" attributes={{onFocus: this.handleFocus}}/>
                            <button className="btn btn-primary btn-block submit" onClick={this.handleSubmit.bind(this)} data-form="profile" type="button">Save</button>
                        </form>
                        </div>
                        <div className="col"></div>
                    </div>
                    </div>
                    <div className="tab-pane fade" id="notify" role="tabpanel" aria-labelledby="notify-tab">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-lg-8 col-md-10 col-sm-12 pt-4">
                        <h4>Notifications For</h4>
                        <select id="nonsig" className="form-control">
                            <option>51618563</option>
                            <option>56156432</option>
                        </select>
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
                        </div>
                        <div className="col"></div>
                    </div>
                    </div>
                    <div className="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-lg-8 col-md-10 col-sm-12 pt-4">
                        <h4> History </h4>
                        <hr/>
                        <p> View actions that have been taken on your account </p>
                        <table className="table">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Time</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Tue Jan 08 2019</td>
                                <td>Login</td>
                            </tr>
                            <tr>
                                <td>Tue Jan 08 2019</td>
                                <td>Invalid Login</td>
                            </tr>
                            <tr>
                                <td>Tue Jan 08 2019</td>
                                <td>Password Change</td>
                            </tr>
                            <tr>
                                <td>Tue Jan 08 2019</td>
                                <td>Submitted document 15435</td>
                            </tr>
                            <tr>
                                <td>Tue Jan 08 2019</td>
                                <td>Created document 15435</td>
                            </tr>
                            <tr>
                                <td>Tue Jan 08 2019</td>
                                <td>Login</td>
                            </tr>
                            <tr>
                                <td>Tue Jan 08 2019</td>
                                <td>Submitted claim C975432</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                        <div className="col"></div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        )
    }
}

export default UserProfile