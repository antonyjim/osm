import React, { Component } from 'react';
import Table from '../common/Table.jsx';
import API from '../lib/API.js';
import Alert from '../common/alerts.jsx';

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 'sys_id',
            cols: {
                'Username': {
                  boundTo: 'username',
                  type: 'string',
                  id: true
                },
                'First Name': {
                  boundTo: 'userFirstName',
                  type: 'string'
                },
                'Last Name': {
                  boundTo: 'userLastName',
                  type: 'string'
                },
                'Default Customer': {
                  boundTo: 'userDefaultNonsig',
                  type: 'string'
                },
                'Email': {
                  boundTo: 'email',
                  type: 'string'
                },
                'Last Login': {
                  boundTo: 'userLastLogin',
                  type: 'date'
                },
                'Locked': {
                  boundTo: 'userIsLocked',
                  type: 'boolean'
                }
            },
            users: [],
            error: false,
            loaded: false
        }
        this.getUsers(props.customer)
    }

    getUsers(customer) {
        if (customer) {
            const altCols = {
                'Username': {
                    boundTo: 'username',
                    type: 'string',
                    id: true
                },
                'First Name': {
                    boundTo: 'userFirstName',
                    type: 'string'
                },
                'Last Name': {
                    boundTo: 'userLastName',
                    type: 'string'
                },
                'Customer': {
                    boundTo: 'nsNonsig',
                    type: 'string'
                },
                'Admin': {
                    boundTo: 'nsaIsAdmin',
                    type: 'boolean'
                }
            }
            API.GET({
                path: '/api/q/sys_user_nsacl_list',
                query: {
                    fields: 'sys_id,username,nsNonsig,userFirstName,userLastName,nsaIsAdmin',
                    args: 'nsNonsig=eq|' + customer
                }
            }, (err, response) => {
                if (err) {
                    this.setState({error: err.message, loaded: true, cols: altCols})
                    return 1
                }
                if (response && response.data && response.data.sys_user_nsacl_list) {
                    this.setState({users: response.data.sys_user_nsacl_list, error: false, loaded: true, cols: altCols})
                } else {
                    this.setState({error: 'No data found', loaded: true, cols: altCols})
                }
            })
        } else {
            API.GET({
                path: '/api/q/sys_user_list',
                query: {
                    fields: 'userId,username,email,userDefaultNonsig,userLastLogin,userDefaultNonsig,userFirstName,userLastName,userIsLocked'
                }
            }, (err, response) => {
                if (err) {
                    this.setState({error: err.message, loaded: true})
                    return 1
                }
                if (response && response.data && response.data.sys_user_list) {
                    this.setState({users: response.data.sys_user_list, error: false, loaded: true})
                } else {
                    this.setState({error: 'No data found', loaded: true})
                }
            })
        }
    }

    handleClick(e) {
        e.preventDefault()
        console.log(e)
    }

    render() {
        return (
            <>
                {this.state.error && <Alert message={this.state.error} alertType="danger" />}
                {this.state.loaded && <Table cols={this.state.cols} rows={this.state.users} id={this.state.id} onClick={this.handleClick.bind(this)} baseURL="/admin/user/" /> }
            </>
        )
    }
}

export default Users
