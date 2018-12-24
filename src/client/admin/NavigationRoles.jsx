import React, { Component } from 'react'
import { Tabs } from '../common/tabs.jsx';
import { Field, SelectField } from './../common/forms.jsx'

class Routes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roles: [
                {
                    value: '',
                    text: '-- None --'
                }
            ]
        }
    }

    getRoles() {
        fetch('/api/admin/getRoles?token=' + document.cookie)
        .then(res => {
            return res.json()
        })
        .then(roles => {
            if (roles.error) {
                console.error(roles.message)
            }
            let roleOpts = []
            roles.forEach(role => {
                roleOpts.push({
                    value: role.pdPriv,
                    text: role.pdDesc
                })
            })
            this.setState({roles: roles})
        })
        .catch(err => {
            console.error(err)
        })
    }

    handleOnTypeChange(e) {
        console.log(e.target)
        if (e.target.value === '1') {
            document.getElementById('navMenu').style.display = 'block'
            document.getElementById('navHeader').style.display = 'block'
        } else {
            document.getElementById('navMenu').style.display = 'block'
            document.getElementById('navHeader').style.display = 'block'
        }
    }

    render() {
        this.getRoles()
        return (
            <div className="m-4">
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
                                value: '0',
                                text: 'API'
                            },
                            {
                                value: '1',
                                text: 'Navigation'
                            }
  
                        ]
                    } 
                    otherField={false}
                    onChange={() => {this.handleOnTypeChange()}}
                ></SelectField>
                <Field isHidden={true} id="navMenu" label="Root Menu" type="text"></Field>
                <Field isHidden={true} id="navHeader" label="SubHeading" type="text"></Field>
                <SelectField id="navPriv" label="Privilege" opts={this.state.roles} otherField={true}
                ></SelectField>
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
            <div>
                
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