import React, { Component } from 'react';
import Users from './Users.jsx';
import Pills from './../common/PillLayout.jsx'
import {Field} from './../common/forms.jsx'
import API from '../lib/API.js';

export default class Customer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            errorMessage: '',
            loaded: false,
            fields: {
                nsNonsig: '',
                nsTradestyle: ''
            },
            modifiedFields: [],
            customer: props.match.params.customer
        }
        this.getCustomer()
    }

    getCustomer() {
        API.GET({path: '/api/q/sys_customer/' + this.state.customer, query: {
            fields: 'nsNonsig,nsTradeStyle,nsAddr1,nsAddr2,nsState,nsCity,nsPostalCode,nsCountry'
        }})
        .then(response => {
            if (response.errors.length > 0) {
                this.setState({error: true, errorMessage: response.errors[0].message, loaded: true})
            } else {
                this.setState({fields: response.data['sys_customer'], loaded: true})
            }
        })
        .catch(e => {
            this.setState({error: true, errorMessage: e.message, loaded: true})
        })
    }

    handleChange(e) {
        let state = {...this.state}
        state.fields[e.target.id] = e.target.value
        this.setState(state)
    }

    render() {
        const pills = {
            general: {
                id: 'general',
                label: 'General',
                body: (
                    <>
                        <h4>General Information</h4>
                        <hr/>
                        <form className="form-row" name="generalInformation">
                            <Field id="nsNonsig" value={this.state.fields.nsNonsig} label="Nonsig" className="col-lg-6 col-md-12" onChange={this.handleChange.bind(this)} attributes={{readOnly: 'readonly'}} />
                            <Field id="nsNonsig" value={this.state.fields.nsTradeStyle} label="Tradestyle" className="col-lg-6 col-md-12" onChange={this.handleChange.bind(this)} attributes={{readOnly: 'readonly'}} />
                            <Field id="nsNonsig" value={this.state.fields.nsAddr1} label="Address" className="col-lg-6 col-md-12" onChange={this.handleChange.bind(this)} attributes={{readOnly: 'readonly'}} />
                            <Field id="nsNonsig" value={this.state.fields.nsAddr2} label="Address (2)" className="col-lg-6 col-md-12" onChange={this.handleChange.bind(this)} attributes={{readOnly: 'readonly'}} />
                            <Field id="nsNonsig" value={this.state.fields.nsCity} label="City" className="col-lg-6 col-md-12" onChange={this.handleChange.bind(this)} attributes={{readOnly: 'readonly'}} />
                            <Field id="nsNonsig" value={this.state.fields.nsState} label="State" className="col-lg-6 col-md-12" onChange={this.handleChange.bind(this)} attributes={{readOnly: 'readonly'}} />
                            <Field id="nsNonsig" value={this.state.fields.nsPostalCode} label="Postal Code" className="col-lg-6 col-md-12" onChange={this.handleChange.bind(this)} attributes={{readOnly: 'readonly'}} />
                            <Field id="nsNonsig" value={this.state.fields.nsCountry} label="Country" className="col-lg-6 col-md-12" onChange={this.handleChange.bind(this)} attributes={{readOnly: 'readonly'}} />
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
                        <hr/>
                        <p> View users associated with this customer. </p>
                        <Users customer={this.props.match.params.customer} />
                    </>
                )
            },
            brands: {
                id: 'brands',
                label: 'Brands',
                body: (
                    <>
                        <h4>Brands</h4>
                        <hr/>
                    </>
                )
            },
            logs: {
                id: 'logs',
                label: 'History',
                body: (
                    <>
                        <h4>History</h4>
                        <hr/>
                        <p>View actions that have been taken on this customer</p>
                    </>
                )
            }
        }
        return (
            <>
                {this.state.loaded && <Pills pills={pills} {...this.state} />}
            </>
        )
    }
}