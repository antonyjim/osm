import React, { Component } from 'react'
import { Tabs } from '../common/tabs.jsx';
import { Field, SelectField } from './../common/forms.jsx'
import { submitForm } from '../lib/formSubmission.js';
import Alert from '../common/alerts.jsx';

class Routes extends Component {
    constructor(props) {
        super(props)
        this.getRoles()
        this.state = {
            hideNav: true,
            roles: [
                {
                    value: '',
                    text: '-- None --'
                }
            ],
            message: null
        }
    }

    getRoles() {
        fetch('/api/admin/getPrivs')
        .then(res => {
            return res.json()
        })
        .then(roles => {
            if (roles.error) {
                console.error(roles.message)
                return 1
            }
            let roleOpts = []
            roles.details.forEach(role => {
                roleOpts.push({
                    value: role.rpPriv,
                    text: role.rpPriv
                })
            })
            this.setState({roles: roleOpts})
        })
        .catch(err => {
            console.error(err)
        })
    }

    handleOnTypeChange(e) {
        if (e.target.value === 'true') {
            this.setState({hideNav: false})
        } else {
            this.setState({hideNav: true})
        }
    }

    submitAdd() {
        let fields = document.getElementById('navLinkForm').querySelectorAll('input, select, textarea')
        let body;
        body = {}
        fields.forEach(field => {
            let fieldName = field.getAttribute('name') || field.id
            let fieldValue = field.value
            if (fieldValue === 'true') {
                fieldValue = true
            } else if (fieldValue === 'false') {
                fieldValue = false
            }
            body[fieldName] = fieldValue
        })

        submitForm({
            body: [body],
            action: '/api/admin/addRoute',
            method: 'POST', 
            cb: (err, response) => {
            if (err) {alert(err)}
            if (response.error) {
                this.setState({message: {
                    type: 'danger',
                    message: response.error
                }})
            } else {
                if (response.details.navLinksEntered === 1) {
                    this.setState({message: {
                        type: 'success',
                        message: response.message
                    }})
                } else {
                    this.setState({message: {
                        type: 'danger',
                        message: response.message
                    }})
                }
            }
        }})
    }

    render() {
        return (
            <div id="navLinkForm" className={this.props.className + " m-3"}>
                {this.message && <Alert message={this.state.message.message} alertType={this.state.message.type}/>}
                <Field id="navInnerText" type="text" label="Inner Text of <a> tag"></Field>
                <Field id="navHref" type="text" label="Full Path"></Field>
                <SelectField id="navMethod" label="Method" opts={
                    [
                        {
                            value: 'GET',
                            text: 'GET'
                        },
                        {
                            value: 'POST',
                            text: 'POST'
                        }
                    ]
                }
                ></SelectField>
                <SelectField 
                    id="navIsNotApi" 
                    label="Link Type" 
                    opts={
                        [
                            {
                                value: 'false',
                                text: 'API'
                            },
                            {
                                value: 'true',
                                text: 'Navigation'
                            }
  
                        ]
                    } 
                    otherField={false}
                    onChange={(e) => {this.handleOnTypeChange(e)}}
                ></SelectField>
                <Field isHidden={this.state.hideNav} id="navMenu" label="Root Menu" type="text"></Field>
                <Field isHidden={this.state.hideNav} id="navHeader" label="SubHeading" type="text"></Field>
                <SelectField id="navPriv" label="Privilege" opts={this.state.roles} otherField={true}
                ></SelectField>
                <button className="btn btn-primary" onClick={() => {this.submitAdd()}}>Submit</button>
            </div>
        )
    }
}

class Roles extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={this.props.className + " m-3"}>
                
            </div>
        )
    }
}


class AdminWireFrame extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let comps = [
            {
                title: 'Routes',
                component: Routes
            },
            {
                title: 'Roles',
                component: Roles
            }
        ]
        return (
            <Tabs tabs={comps}/>
        )
    }
}

export { AdminWireFrame }