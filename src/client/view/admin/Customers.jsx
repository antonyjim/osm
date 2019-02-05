import React, { Component } from 'react';
import Table from './../common/Table.jsx'
import API from '../lib/API.js';
import Alert from '../common/alerts.jsx';

class Customers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            error: false,
            message: '',
            id: 'nsNonsig',
            cols: {
                'Nonsig': {
                    boundTo: 'nsNonsig',
                    type: 'string',
                    id: true
                },
                'Tradestyle': {
                    boundTo: 'nsTradeStyle',
                    type: 'string'
                },
                'Address': {
                    boundTo: 'nsAddr1',
                    type: 'string'
                },
                'City': {
                    boundTo: 'nsCity',
                    type: 'string'
                },
                'State': {
                    boundTo: 'nsState',
                    type: 'string'
                }
            },
            customers: []
        }
        this.getCustomers()
    }

    getCustomers() {
        API.GET({path: '/api/q/sys_customer_list'})
        .then(response => {
            if (response.errors.length !== 0) {
                this.setState({error: true, message: response.errors[0].message})
            }
            let state = {...this.state}
            state['customers'] = response.data.sys_customer_list
            state['loaded'] = true
            this.setState(state)
        })
        .catch(err => {
            this.setState({error: true, message: err.message})
        })
    }

    handleClick(e) {
        e.preventDefault()
    }

    render() { 
        return (
            <>
                {this.state.error && <Alert message={this.state.message} alertType="danger" />}
                {this.state.loaded && <Table cols={this.state.cols} rows={this.state.customers} id={this.state.id} onClick={this.handleClick.bind(this)} baseURL="/customer/" /> }
            </>
        )
    }
}
 
/**
 * queries will be set up as /api/q/:table?{query}
 * query should be formatted as query string like so:
 * columnName={eq|ne|gt|lt|gte|lte|lk|nlk}^value
 * 
 * The /api/q routes should return an object with the following metadata:
 * {
 *  error: boolean,
 *  message: 'Retrieved',
 *  route: '/api/q/{table}',
 *  result: [
 *      {results}
 * ]
 * }
 */

export default Customers