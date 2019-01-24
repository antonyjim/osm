import React, { Component } from 'react';
import Table from '../common/Table.jsx';
import API from '../lib/API.js';
import Alert from '../common/alerts.jsx';

class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 'userId',
            cols: {
                'Username': {
                  boundTo: 'userName',
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
                  boundTo: 'userEmail',
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
        this.getUsers()
    }

    getUsers() {
        API.post({
            path: '/api/q/user_list',
            body: JSON.stringify({
                query: `
                    query {
                        user_list {
                            userId
			    count
                            userName
                            userEmail
                            userDefaultNonsig
                            userLastLogin
                            userDefaultNonsig
                            userFirstName
                            userLastName
                            userIsLocked
                        }
                    }
                `
            })
        }, (err, response) => {
            if (err) {this.setState({error: err, loaded: true})}
            this.setState({users: response.data.user_list, loaded: true})
        })
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

export default UserList
