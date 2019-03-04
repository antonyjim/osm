import React, { Component } from 'react'
import { fetchLogin } from './lib/getNavigation'

// React-Router
import { Route, Link } from 'react-router-dom'
import { pathMatcher } from './router/history'

class NavigationHeading extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let links = []
    let key = 0
    for (let navLink of this.props.links) {
      links.push(
        <Link
          className="dropdown-item"
          to={navLink.href}
          key={'nav-link' + key}
        >
          {navLink.innerText}
        </Link>
      )
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

    Object.keys(this.props.navHeading).map((heading) => {
      subHeadings.push(
        <NavigationHeading
          header={heading}
          links={this.props.navHeading[heading]}
          key={'nav-header' + key}
        />
      )
      key++
    })
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link text-light dropdown-toggle pl-3"
          href="#"
          id={randId}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <h5>{this.props.navTitle}</h5>
        </a>
        <div className="dropdown-menu" aria-labelledby={randId}>
          <div className="row flex-lg-nowrap">{subHeadings}</div>
        </div>
      </li>
    )
  }
}

export default class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nav: null,
      loaded: false
    }
    this.getNav()
  }

  getNav() {
    fetchLogin()
      .then((navigation) => {
        if (navigation.error) {
          console.error(err)
        }
        this.setState({ nav: navigation, loaded: true })
      })
      .catch((err) => {
        console.log('Error occurred')
        console.error(err)
        this.setState({ nav: 'Error', loaded: true })
      })
  }

  render() {
    if (
      this.state.nav === null ||
      this.state.nav === undefined ||
      this.state.loaded !== true
    ) {
      return null
    } else {
      let menus = []
      let key = 0
      Object.keys(this.state.nav).map((menu) => {
        menus.push(
          <NavigationDropdown
            navHeading={this.state.nav[menu]}
            navTitle={menu}
            key={key}
          />
        )
        key++
      })
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-goodyear">
          <Link className="navbar-brand" to="/">
            <img src="/public/images/logo.png" height="60px" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mainNav"
            aria-controls="main-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="mr-auto navbar-nav" id="menuContainer">
              {menus}
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="dropdown-toggle pl-3 nav-item ml-auto"
                  data-toggle="dropdown"
                  id="account"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    className="rounded-circle img"
                    src="/public/images/account.png"
                  />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="account"
                >
                  <Link className="dropdown-item" to="/changeCustomer">
                    Change Customer
                  </Link>
                  <Link className="dropdown-item" to="/userAdministration">
                    User Administration
                  </Link>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                  <a className="dropdown-item" href="#">
                    French
                  </a>
                  <a className="dropdown-item" href="/logout">
                    Logout
                  </a>
                  <button
                    onClick={pathMatcher}
                    className="dropdown-item"
                    value="/foo/:bar"
                  >
                    Match
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      )
    }
  }
}
