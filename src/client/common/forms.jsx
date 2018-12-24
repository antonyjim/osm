import React, { Component } from 'react';

class Field extends Component {
    constructor(props) {
        super(props)
    }
    render() { 
        if (this.props.isHidden) {
            return (
                <div className="form-group" id={'cont' + this.props.id} style={{display: 'none' }}>
                    <label htmlFor={this.props.id}>
                        {this.props.label}
                    </label>
                    <input type={this.props.type} className="form-control" id={this.props.id}></input>
                </div>
            )
        } else {
            return (
                <div className="form-group"  id={'cont' + this.props.id}>
                    <label htmlFor={this.props.id}>
                        {this.props.label}
                    </label>
                    <input type={this.props.type} className="form-control" id={this.props.id}></input>
                </div>
            )
        }
    }
}

class SelectField extends Component {
    constructor(props) {
        super(props)
    }

    handleOnChange(e) {
        let input = document.getElementById(e.target.id + 'other')
        if (e.target.value === 'otherSelection') {
            input.style.display = 'block'
            input.id = e.target.id
            e.target.removeAttribute('id')
            e.target.setAttribute('oldId', input.id)
        } else {
            let oldId = e.target.getAttribute('oldId')
            if (oldId) {
                document.getElementById(oldId).style.display = 'none'
                document.getElementById(oldId).id = oldId + 'other'
                e.target.id = oldId
                e.target.removeAttribute('oldId')
            }
        }
    }

    render() {
        let options = []
        this.props.opts.forEach(opt => {
            options.push(<option value={opt.value} key={Math.floor(Math.random() * 1000000)}>{opt.text}</option>)
        })
        if (this.props.otherField) {
            options.push(<option value="otherSelection" key={Math.floor(Math.random() * 1000000)}>Other</option>)
        }
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>
                    {this.props.label}
                </label>
                <select className="form-control" id={this.props.id} onChange={this.handleOnChange}>
                    {options}
                </select>
                <input id={this.props.id + 'other'} type="text" style={{display: 'none' }} className="form-control"></input>
            </div>
        )
    }
}

export { Field, SelectField }