import React, { Component } from 'react'
import { Tabs } from '../common/tabs.jsx';
import { Field, SelectField } from './../common/forms.jsx'
import { submitForm } from '../lib/formSubmission.js';
import Alert from '../common/alerts.jsx';
import { E401 } from '../common/errors.jsx'
import API from '../lib/API.js'
import Table from '../common/Table.jsx'
import TableViews from './TableViews.jsx';
import Pills from '../common/PillLayout.jsx'

class ExistingRoute extends Component {
    constructor(props) {
        super(props)
    }

    setNav(e) {
        document.getElementById('updateButton').style.display = 'inline-block'
        document.getElementById('submitButton').style.display = 'none'
        $('#existinglinks').modal('toggle')
    }

    render() {
        return (
            <tr>
                <th scope="col"><a href="#" onClick={(e) => {this.props.onChoice(e, this.props); this.setNav()}}>{this.props.navInnerText}</a></th>
                <th scope="col">{this.props.navMethod}</th>
                <th scope="col">{this.props.navHref}</th>
                <th scope="col">{this.props.navPriv}</th>
                <th scope="col">{this.props.navMenu}</th>
                <th scope="col">{this.props.navHeader}</th>
                <th scope="col">{this.props.navActive}</th>
                <th scope="col">{this.props.navIsNotApi}</th>
            </tr>
        )
    }
}

class ExistingRoutes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            links: [null],
            unAuthorized: false
        }
        this.getLinks()
    }

    getLinks() {
        $.ajax('/api/admin/getAllRoutes?token=' + window.THQ.token, {
            method: 'GET',
            success: (links) => {
                if (links.error) {
                    console.error(links.message)
                } else {
                    this.setState({links})
                }
            },
            error: (err) => {
                throw err
            }
        })
        /*
        fetch('/api/admin/getAllRoutes?token=' + window.THQ.token)
        .then(res => {
            return res.json()
        })
        .then(links => {
            if (links.error) {
                console.error(links.message)
            } else {
                this.setState({links})
            }
        })
        .catch(err => {
            console.error(err)
        })
        */
    }

    render() {
        return (
            <div id="existinglinks" className="modal fade" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Navigation</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Inner Text</th>
                                        <th scope="col">Method</th>
                                        <th scope="col">Href</th>
                                        <th scope="col">Privilege</th>
                                        <th scope="col">Menu</th>
                                        <th scope="col">Heading</th>
                                        <th scope="col">Active</th>
                                        <th scope="col">UI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.links.map((link, i) => {
                                        return (<ExistingRoute onChoice={this.props.onChoice} key={i} {...link}/>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

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
            message: null,
            link: {
                navActive: '',
                navIsNotApi: '',
                navMethod: '',
                navHref: '',
                navHeader: '',
                navMenu: '',
                navPriv: '',
                navInnerText: '',
                navId: ''
            }
        }
    }

    getRoles() {
        $.ajax('/api/admin/getPrivs?token=' + window.THQ.token, {
            method: 'GET',
            success: (roles) => {
                if (roles.error) {
                    console.error(roles.message)
                    this.setState({unAuthorized: true})
                }
                let roleOpts = []
                roles.details.forEach(role => {
                    roleOpts.push({
                        value: role.rpPriv,
                        text: role.rpPriv
                    })
                })
                this.setState({roles: roleOpts})
            },
            error: (err) => {
                throw err
            }
        })
        /*
        fetch('/api/admin/getPrivs?token=' + window.THQ.token)
        .then(res => {
            return res.json()
        })
        .then(roles => {
            if (roles.error) {
                console.error(roles.message)
                this.setState({unAuthorized: true})
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
        */
    }

    handleOnTypeChange(e) {
        if (e.target.value === '1') {
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
            if (fieldValue === '1') {
                fieldValue = true
            } else if (fieldValue === '0') {
                fieldValue = false
            }
            body[fieldName] = fieldValue
        })

        submitForm({
            body: [body],
            action: '/api/admin/addRoute?token=' + window.THQ.token,
            method: 'POST', 
            cb: (err, response) => {
            if (err) {console.error(err)}
            if (response.error) {
                this.setState({message: {
                    type: 'danger',
                    message: response.error
                }})
            } else {
                if (response.details.navLinksEntered.length === 1) {
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

    submitUpdate() {
        let fields = document.getElementById('navLinkForm').querySelectorAll('input, select, textarea')
        let body;
        body = {}
        fields.forEach(field => {
            let fieldName = field.getAttribute('name') || field.id
            let fieldValue = field.value
            if (fieldValue === '1') {
                fieldValue = true
            } else if (fieldValue === '0') {
                fieldValue = false
            }
            body[fieldName] = fieldValue
        })

        submitForm({
            body: body,
            action: '/api/admin/updateRoute?token=' + window.THQ.token,
            method: 'POST',
            cb: (err, response) => {
            if (err) {alert(err)}
            if (response.error) {
                this.setState({message: {
                    type: 'danger',
                    message: response.error
                }})
            } else {
                if (response.details) {
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

    handleChange(e) {
        const value = e.target.value
        const name = e.target.id
        let link = {...this.state.link} // Clone the existing link
        link[name] = value // Insert the changed value
        this.setState({link}) // Set the state
    }

    setLink(e, link) {
        this.setState({link})
        if (link.navIsNotApi) {
            this.setState({hideNav: false})
        } else {
            this.setState({hideNav: true})
        }
    }

    render() {
        if (this.state.unAuthorized) {
            
            return (
                <div id="navLinkForm" className={this.props.className + " m-3"}>
                    <E401/>
                </div>
            )
        } else {
            return (
                <div id="navLinkForm" className={this.props.className + " m-3"}>
                <ExistingRoutes onChoice={this.setLink.bind(this)}/>
                {this.state.message && <Alert message={this.state.message.message} alertType={this.state.message.type}/>}
                <input type="hidden" id="navId" value={this.state.link.navId}/>
                <Field id="navInnerText" type="text" label="Inner Text of <a> tag" value={this.state.link.navInnerText} onChange={this.handleChange.bind(this)}></Field>
                <Field id="navHref" type="text" label="Full Path" value={this.state.link.navHref} onChange={this.handleChange.bind(this)}></Field>
                <SelectField 
                    id="navMethod" 
                    label="Method" 
                    value={this.state.link.navMethod} 
                    onChange={this.handleChange.bind(this)}
                    opts={
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
                }/>
                <SelectField 
                    id="navIsNotApi" 
                    label="Link Type" 
                    value={this.state.link.navIsNotApi}
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
                    onChange={(e) => {this.handleOnTypeChange(e); this.handleChange(e)}}
                ></SelectField>
                <Field isHidden={this.state.hideNav} id="navMenu" label="Root Menu" type="text" value={this.state.link.navMenu} onChange={this.handleChange.bind(this)}></Field>
                <Field isHidden={this.state.hideNav} id="navHeader" label="SubHeading" type="text" value={this.state.link.navHeader} onChange={this.handleChange.bind(this)}></Field>
                <SelectField 
                    id="navPriv" 
                    label="Privilege" 
                    opts={this.state.roles} 
                    otherField={true}
                    value={this.state.link.navPriv}
                    onChange={this.handleChange.bind(this)}
                ></SelectField>
                <SelectField 
                    id="navActive" 
                    value="true" 
                    label="Active" 
                    value={this.state.link.navActive}
                    onChange={this.handleChange.bind(this)}
                    opts={
                        [
                            {
                                value: '1',
                                text: 'Active'
                            },
                            {
                                value: '0',
                                text: 'Inactive'
                            }
                        ]
                } />
                <button id="updateButton" className="btn btn-primary" style={{display: 'none'}} onClick={() => {this.submitUpdate()}}>Update</button>
                <button id="submitButton" className="btn btn-primary" onClick={() => {this.submitAdd()}}>Submit</button>
                <button className="btn btn-secondary ml-2" data-toggle="modal" data-target="#existinglinks">Existing</button>
            </div>
            )
        }

    }
}

class PrivTable extends Component {
    constructor(props) {
        super(props)
        let allPrivs = [{
            text: '-- None --',
            value: ''
        }]
        if (props.allPrivs) {
            props.allPrivs.map(priv => {
                allPrivs.push(priv.rpPriv)
            })
        }
        this.state = {
            allPrivs
        }
    }

    render() {
        let rows = []
        const unUsed = this.props.allPrivs.filter(privilege => this.props.privs.indexOf(privilege) === -1)
        this.props.privs[0] !== null &&  this.props.privs.map((priv) => {
            rows.push(<tr scope="row" key={Math.floor(Math.random() * 10000)}>
                <td>{this.props.rpId}</td>
                <td>{priv}</td>
                <td><a href="javascript:void(0)" onClick={this.props.onDelete} data-target={priv}>Delete</a></td>
            </tr>)
        })
        return (
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Role</th>
                        <th scope="col">Priv</th>
                        <th scope="col">Mod</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                    <tr scope="row">
                        <td>
                            {this.props.rpId}
                        </td>
                        <td className="p-0">
                            <SelectField opts={unUsed} id="newPriv" onChange={this.props.onChange} value={this.props.newPrivValue} />
                        </td>
                        <td>
                            <a href="javascript:void(0)" onClick={this.props.onAdd} data-for={this.props.rpId}>Add</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

class Roles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            status: null,
            roles: [{
                text: '-- None --',
                value: ''
            }],
            privs: [null],
            allPrivs: [null],
            rpId: '',
            newPriv: ''
        }
        this.getRoles()
        this.getPrivs(true)
    }

    getRoles() {
        $.ajax('/api/admin/getRoles?token=' + window.THQ.token, {
            success: (response) => {
                if (response.error) {
                    this.setState({
                        error: true,
                        status: response.message
                    })
                } else {
                    let rolesFormatted = [{
                        text: '-- None --',
                        value: 'none'
                    }]
                    response.details.map(role => {
                        rolesFormatted.push({
                            value: role.rpId,
                            text: role.rpId
                        })
                    })
                    console.log(rolesFormatted)
                    this.setState({
                        error: false,
                        roles: rolesFormatted
                    })
                }
            }
        })
    }

    getPrivs(all, specificRole) {
        let url = ''
        if (all) {
            url = `/api/admin/getPrivs?token=${window.THQ.token}`
        } else if(specificRole) {
            url = `/api/admin/getPrivs?role=${specificRole}&token=${window.THQ.token}`
        } else {
            url = `/api/admin/getPrivs?role=${this.state.rpId}&token=${window.THQ.token}`
        }
        $.ajax(url, {
            success: (response) => {
                if (!response.error) {
                    let receivedPrivs = []
                    response.details.map(priv => {
                        receivedPrivs.push(priv.rpPriv)
                    })
                    if (all) {
                        this.setState({
                            error: false,
                            allPrivs: receivedPrivs
                        })
                    } else {
                        this.setState({
                            error: false,
                            privs: receivedPrivs
                        })
                    }
                } else {
                    this.setState({
                        error: true,
                        status: response.message
                    })
                }
            },
            error: (err) => {
                this.setState({
                    error: true,
                    status: err
                })
            }
        })
    }

    handleDelete(e) {
        let rpPriv = e.target.getAttribute('data-target')
        $.ajax(`/api/admin/roles/remove?rpId=${this.state.rpId}&rpPriv=${rpPriv}&token=${window.THQ.token}`, {
            method: 'POST',
            success: (response) => {
                if (response.error) {
                    this.setState({error: true, status: response.message})
                } else {
                    let newPrivs = []
                    for (let priv of this.state.roles) {
                        if (priv.rpPriv == rpPriv) {
                            continue
                        } else {
                            newPrivs.push(priv)
                        }
                    }
                    this.setState({error: false, status: response.message, privs: newPrivs})
                }
            },
            error: (err) => {
                this.setState({error: true, status: 'Could not remove link. Please try again later'})
            }
        })
    }

    handleAdd(e) {
        let rpId = e.target.getAttribute('data-for')
        let rpPriv = this.state.newPriv
        if (rpId && rpPriv) {
            $.ajax(`/api/admin/roles/add?rpId=${rpId}&rpPriv=${rpPriv}&token=${window.THQ.token}`, {
                method: 'POST',
                success: (response) => {
                    if (response.error) { 
                        this.setState({
                            error: true,
                            status: response.message
                        })
                    } else {
                        let privs = this.state.privs
                        privs.push(rpPriv)
                        this.setState({
                            error: false,
                            status: response.message,
                            privs
                        })
                    }
                }
            })
        } else {
            this.setState({
                error: true,
                status: 'Missing role or priv'
            })
        }
    }

    handleChange(e) {
        const name = e.target.id
        const value = e.target.value
        this.setState({[name]: value})
        if (name === 'rpId' && value !== 'none') {
            console.log('Fetching privs for ', value)
            this.getPrivs(false, value)
        }
    }

    render() {
        return (
            <div className={this.props.className + " m-3"}>
                {this.state.status && <Alert message={this.state.status} alertType={this.state.error ? 'danger' : 'success'} />}
                <input type="hidden" id="oldrpId" value={this.state.oldrpId}/>
                <SelectField id="rpId" opts={this.state.roles} value={this.state.rpId} onChange={this.handleChange.bind(this)} otherField={true}/>
                {this.state.privs[0] !== null && 
                    <PrivTable 
                        privs={this.state.privs} 
                        allPrivs={this.state.allPrivs} 
                        onDelete={this.handleDelete.bind(this)} 
                        onAdd={this.handleAdd.bind(this)}
                        rpId={this.state.rpId} 
                        onChange={this.handleChange.bind(this)}
                        newPrivValue={this.state.newPriv}
                    />}
            </div>
        )
    }
}

class Tables extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cols: {
              'Table Name': {
                boundTo: 'name',
                type: 'string',
                id: true
              },
              'Label': {
                boundTo: 'label',
                type: 'string'
              },
              'Description': {
                boundTo: 'description',
                type: 'string'
              }
            },
            tables: []
        }
    }

    render () {
        return <Table table="sys_db_object_list" hideActions={true} />
    }
}


class AdminWireFrame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: this.props.fields
        }
    }

    handleChange(e) {
        let fields = {...this.state.fields}
        let modifiedFields = this.state.modifiedFields
        fields[e.target.id] = e.target.value
        if (modifiedFields.indexOf(e.target.id) === -1) {
            modifiedFields.push(e.target.id)
        }
        this.setState({fields, modifiedFields})
    }

    render() {
        let comps = {
            routes: {
                id: 'routes',
                label: 'Routes',
                body: <Routes/>
            },
            roles: {
                id: 'roles',
                label: 'Roles',
                body: <Roles/>
            },
            tables: {
                id: 'tables',
                label: 'Tables',
                body: <Tables/>
            },
            views: {
                id: 'views',
                label: 'Columns',
                body: <TableViews/>
            }
        }
        return (
            <>
                <Pills pills={comps} handleChange={this.handleChange.bind(this)} {...this.state} />
            </>
        )
    }
}

export { AdminWireFrame }
