import React, { Component } from 'react';
import { Table } from './../common/tables.jsx'

class Customers extends Component {
    constructor(props) {
        super(props)
    }

    render() { 
        return (
            <Table 
                columns={
                    {
                        'Username': {
                            labels: 'userName',
                            as: 'text'
                        },
                        'Email': 'userEmail'
                    }
                }
            />
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

export { Customers };