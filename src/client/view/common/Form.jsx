import React, { Component } from 'react';
import API from './../lib/API.js'

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: {...props.values},
            title: props.title,
            table: props.table
        }
    }

    handleChange(e) {
        let _state = {...this.state}
        _state.fields[e.target.id] = e.target.value
        if (e.target.type === 'checkbox') _state.fields[e.target.id] = e.target.checked 
        if (!_state.modifiedFields.includes(e.target.id)) _state.modifiedFields.push(e.target.id)
        _state.saveDisabled = {}
        this.setState(_state)
    }

    handleSubmit(e) {
        if (this.props.sys_id === 'new') {
            createNew()
        } else {
            let body = {sys_id: this.state.sys_id}
            this.state.modifiedFields.forEach(field => {
                body[field] = this.state.fields[field]
            })
            API.put({
                path: `${API.TABLE}${this.state.table}/${this.state.sys_id}`, 
                body: body, 
                query: {fields: this.props.fields.join(',')}
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                this.props.handleErrorMessage(err)
            })
        }

    }

    createNew(e) {
        API.post({
            path: `${API.TABLE}${this.state.table}`,
            query: {
                fields: this.props.fields.join(',')
            },
            body: this.state.fields
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.error(err)
        })
    }

    render() {
        let displayFields = []
        this.props.fields.map(field => {
            const WrappedComponent = React.addons.cloneWithProps(field, {
                onChange: this.handleChange.bind(this)
            })
            field.prototype.onChange = this.handleChange.bind(this)
            displayFields.push(field)
        })
        return (
            <>
                <h4>{this.state.title}</h4>
                <hr/>
                <form className="form-row" name={'form' + ~~(Math.random() * 1000)}>
                    {this.props.fields}
                    <button className="btn btn-primary btn-block submit" onClick={this.handleSubmit.bind(this)} data-form="info" type="button" {...this.state.saveDisabled}>Save</button>
                </form>
            </>
        )
    }
}