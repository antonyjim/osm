import React, { Component } from 'react';
import Pills from './../common/PillLayout.jsx'
import { Field } from '../common/forms.jsx';
import API from '../lib/API.js';
import Table from '../common/Table.jsx'

class TableGeneralInformation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: {
                name: null
            },
            sys_id: props.sys_id,
            loaded: false
        }
        if (props.sys_id === 'new') {
            this.state.loaded = true
        } else {
            this.fetchTableInformation()
        }
    }

    fetchTableInformation() {
        API.get({path: '/api/q/sys_db_object/' + this.state.sys_id})
        .then(response => {
            this.setState({fields: response.data.sys_db_object || {}, loaded: true})
        })
        .catch(e => {
            throw e
        })
    }

    handleChange(e) {
        let state = {...this.state}
        state.fields[e.target.id] = e.target.value
        this.setState(state)
    }

    submitChange(e) {
        let apiRoute = '/api/q/sys_db_object'
        let apiQuery;
        if (this.state.sys_id === 'new') {
            apiQuery = API.post({path: apiRoute, body: {...this.state.fields}})
        } else {
            apiQuery = API.put({path: apiRoute + '/' + this.state.sys_id, body: {...this.state.fields}})
        }
        apiQuery.then(response => {
            console.log(response)
        })
        .catch(err => {
            console.error(err)
        })
    }

    render() {
        return (
            <>
                {
                    this.state.loaded &&
                    <>
                        <Field label="Label" value={this.state.fields.label} id="label" onChange={this.handleChange.bind(this)} />
                        <Field label="Name" value={this.state.fields.name} id="name" onChange={this.handleChange.bind(this)} readOnly="readonly"/>
                        <button className="btn btn-primary btn-block" onClick={this.submitChange.bind(this)}>Save</button>
                    </>
                }
            </>
        )
    }
}

export class TableModifier extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sys_id: props.id
        }
    }

    render() {
        const pills = {
            /**            roles: {
                id: 'roles',
                label: 'Roles',
                body: <Roles/>
            }, */
            generalInformation: {
                id: 'general',
                label: 'General Info',
                body: <TableGeneralInformation sys_id={this.state.sys_id}/>
            },
            relatedFields: {
                id: 'related',
                label: 'Fields',
                body: <Table table="sys_db_dictionary_list" args={{table_name: this.state.sys_id}} />
            }
        }
        return (
            <Pills pills={pills} />
        )
    }
}

class Column extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cols
        }
    }

    render() {
        const pills = {
            
        }
        return (
            <Pills />
        )
    }
}