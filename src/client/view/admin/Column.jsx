import React, { Component } from 'react';
import Pills from '../common/PillLayout.jsx';
import Table from '../common/Table.jsx'
import { Field, SelectField } from '../common/forms.jsx'
import API from '../lib/API.js';

export class ColumnGeneralInformation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sys_id: props.sys_id,
            fields: {...props.info},
            modifiedFields: [],
            saveDisabled: {disabled: 'disabled'}
        }
    }

    handleChange(e) {
        let state = {...this.state}
        state.fields[e.target.id] = e.target.value
        if (!state.modifiedFields.includes(e.target.id)) state.modifiedFields.push(e.target.id)
        state.saveDisabled = {}
        this.setState(state)
    }

    handleSubmit(e) {
        console.log(e)
    }

    render() {
        const dataTypes = [
            'CHAR',
            'VARCHAR',
            'INT',
            'FLOAT',
            'TEXT',
            'BOOLEAN'
        ]
        let length = {}
        if (this.state.type in ['CHAR', 'VARCHAR']) length = {readOnly: 'readonly'}
        return (
            <>
                <h4> General Information </h4>
                <hr/>
                <form className="form-row" name="info">
                    <input type="hidden" id="sys_id" value={this.state.sys_id}/>
                    <Field id="column_name" label="Column Name" value={this.state.fields.column_name} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" attributes={{readOnly: 'readonly'}} />
                    <Field id="label" label="Label" value={this.state.fields.label} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" />
                    <Field id="table_name" label="Table" value={this.state.fields.table_name} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" type="text"/>
                    <Field id="hint" label="Hint" value={this.state.fields.hint} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" type="text"/>
                    <SelectField id="type" label="Data Type" value={this.state.fields.type} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-12" opts={dataTypes}/>
                    <Field id="length" label="Length" value={this.state.fields.length} onChange={this.handleChange.bind(this)} attributes={length} className="col-lg-6 col-md-12" type="number" />
                    <button className="btn btn-primary btn-block submit" onClick={this.handleSubmit.bind(this)} data-form="info" type="button" {...this.state.saveDisabled}>Save</button>
                </form>
            </>
        )
    }
}

class ColumnTables extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sys_id: props.sys_id
        }
    }

    handleChange(e) {
        let state = {...this.state}
        state.fields[e.target.id] = e.target.value
        if (!state.modifiedFields.includes(e.target.id)) state.modifiedFields.push(e.target.id)
        state.saveDisabled = {}
        this.setState(state)
    }

    render() {
        return (
            <Table table="sys_db_dictionary_list" args={{reference_id: this.state.sys_id}}/>
        )
    }
}

export default class Column extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            loaded: false,
            sys_id: props.match.params.sys_id,
            generalInfo: {},
            fields: {
                column_name: '',
                label: '',
                hint: '',
                table: '',
                type: '',
                length: 0
            },
            modifiedFields: {},
            disableSubmit: {
                disabled: 'disabled'
            }
        }

        this.getInfo()
    }

    getInfo() {
        API.GET({
            path: '/api/q/sys_db_dictionary/' + this.state.sys_id,
            query: {
                fields: 'sys_id,column_name,label,table_name,hint,type,length'
            }
        })
        .then(data => {
            let state = {...this.state}
            state.generalInfo = data.data.sys_db_dictionary
            state.loaded = true
            this.setState(state)
        })
        .catch(e => {
            this.setState({error: e.message, loaded: true})
            console.error(e)
        })
    }

    handleChange(e) {
        let state = {...this.state}
        state.disableSubmit = {}
        state.modifiedFields[e.target.id] = e.target.value
        state.fields[e.target.id] = e.target.value
        this.setState(state)
    }

    handleSubmit(e) {
        console.log('submitted')
    }

    render() {
        const pills = {
            general: {
                id: 'general',
                label: 'General',
                body: <ColumnGeneralInformation info={this.state.generalInfo} sys_id={this.state.sys_id} />
            },
            ref: {
                id: 'references',
                label: 'References',
                body: <ColumnTables sys_id={this.state.sys_id} />
            }
        }
        return (
            <>
                {this.state.loaded && <Pills pills={pills} handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit} {...this.state} />}
            </>
        )
    }
}