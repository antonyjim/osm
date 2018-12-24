import React, { Component } from 'react'
import { fetchLogin } from './loginProcess/getNavigation';
import { Admin } from './admin/NavigationRoles.jsx'

// React-Router
import { Route, Link } from 'react-router-dom'

class NavigationLink extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Link className="dropdown-item" to={this.props.href}>{this.props.innerText}</Link>
        )
    }
}

class NavigationHeading extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let links = []
        let key = 0
        for (let navLink of this.props.links) {
            links.push(<NavigationLink href={navLink.href} innerText={navLink.innerText} key={'l' + key} />)
            key++
        }
        return (
            <div className="col">
                <div className="dropdown-header">{this.props.header}</div>
                {links}
            </div>
        )
    }
}

class NavigationDropdown extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let randId = 'dropDown' + Math.floor(Math.random() * 1000000)
        let subHeadings = []
        let key = 0
        
        Object.keys(this.props.navHeading).map(heading => {
            subHeadings.push(<NavigationHeading header={heading} links={this.props.navHeading[heading]} key={'m' + key} />)
            key++
        })
        return (
            <li className="nav-item dropdown">
                <a className="nav-link text-light dropdown-toggle pl-3" href="#" id={randId} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><h5>{this.props.navTitle}</h5></a>
                <div className="dropdown-menu" aria-labelledby={randId}>
                    <div className="row flex-lg-nowrap">
                            {subHeadings}
                    </div>
                </div>
            </li>
        )
    }
}

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nav: null
        }
        this.getNav()
    }

    getNav() {
        fetchLogin(this.props.token)
        .then(navigation => {
            this.setState({nav: navigation})
        })
        .catch(err => {
            console.log('Error occurred')
            console.error(err)
            this.setState({nav: 'Error'})
        })
    }

    render() {
        if (this.state.nav === null) {
            return null
        } else {
            let menus = []
            let key = 0
            Object.keys(this.state.nav).map(menu => {
                console.log('Trying ', this.state.nav[menu])
                menus.push(<NavigationDropdown navHeading={this.state.nav[menu]} navTitle={menu} key={key} />)
                key++
            })
            return (
                <nav className="navbar navbar-expand-lg bg-goodyear">
                    <a className="navbar-brand" href="/">
                        <img src="/public/images/logo.png" height="60px"></img>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse" id="mainNav">
                            <ul className="mr-auto navbar-nav" id="menuContainer">
                                    {menus}
                            </ul>

                            <a className="btn btn-info ml-auto">
                                <span className="glyphicon glyphicon-print"></span>Print Queued
                            </a>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="dropdown-toggle pl-3 nav-item ml-auto" data-toggle="dropdown" id="account" aria-haspopup="true" aria-expanded="false"><img className="rounded-circle img" src="/public/images/account.png"/></a>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="account">
                                            <a className="dropdown-item" href="#">Change Customer</a>
                                            <a className="dropdown-item" href="#">User Admin</a>
                                            <a className="dropdown-item" href="#">Change Password</a>
                                            <a className="dropdown-item" href="#">French</a>
                                        </div>
                                </li>
                            </ul>

                    </div>
                </nav>
            )
        }
    }
}

export { Navigation }