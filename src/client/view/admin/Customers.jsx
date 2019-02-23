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
            cols: [
                'sys_id',
                'nsNonsig',
                'nsTradeStyle',
                'nsAddr1',
                'nsCity',
                'nsState'
            ],
            customers: []
        }
    }

    handleClick(e) {
        e.preventDefault()
    }

    render() { 
        return (
            <div className="m-3">
                {this.state.error && <Alert message={this.state.message} alertType="danger" />}
                <Table table="sys_customer_list" cols={this.state.cols} hideActions={true} showSearch={true} />
            </div>
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