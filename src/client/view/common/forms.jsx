import React, { Component } from 'react';

class Field extends Component {
    constructor(props) {
        super(props)
    }
    render() { 
        return !this.props.isHidden && (
            <div className={'form-group ' + this.props.className}  id={'cont' + this.props.id}>
                <label htmlFor={this.props.id}>
                    {this.props.label}
                </label>
                <input {...this.props.attributes} type={this.props.type} className="form-control" id={this.props.id} value={this.props.value} onChange={this.props.onChange} />
            </div>
        )
    }
}


class SelectField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            otherField: false,
            selectId: this.props.id
        }
    }

    handleOnChange(e) {
        if (e.target.value === 'otherSelection') {
            this.setState({otherField: true, id: e.target.id, selectId: ''})
            e.target.setAttribute('oldId', e.target.id)
            e.target.removeAttribute('id')
        } else {
            let oldId = e.target.getAttribute('oldId')
            if (oldId) {
                this.setState({otherField: false, id: null, selectId: oldId})
                e.target.removeAttribute('oldId')
            } else {
                this.setState({otherField: false, id: null, selectId: e.target.id})
            }
        } 
    }

    render() {
        let options = []
        if (Array.isArray(this.props.opts)) {
            this.props.opts.forEach(opt => {
                if (typeof opt === 'string') {
                    options.push(<option value={opt} key={Math.floor(Math.random() * 1000000)}>{opt}</option>)
                } else {
                    options.push(<option value={opt.value} key={Math.floor(Math.random() * 1000000)}>{opt.text}</option>)
                }
            })
        }

        if (this.props.otherField) {
            options.push(<option value="otherSelection" key={Math.floor(Math.random() * 1000000)}>Other</option>)
        }
        return !this.props.isHidden && (
            <div className="form-group">
                <label htmlFor={this.props.id}>
                    {this.props.label}
                </label>
                <select className="form-control" id={this.state.selectId} onChange={(e) => {this.handleOnChange(e); this.props.onChange(e)}} value={this.state.otherField?  'otherSelection' : this.props.value}>
                    {options}
                </select>
                {this.state.otherField && <input id={this.state.id} type="text" className="form-control mt-3" onChange={this.props.onChange}></input>}
            </div>
        )
    }
}

export { Field, SelectField }