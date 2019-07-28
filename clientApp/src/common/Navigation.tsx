import * as React from 'react'
import { Component } from 'react'
import { fetchLogin } from '../lib/getNavigation'
import { Can } from './Can'
import { Link } from 'react-router-dom'

interface INavigationLink {
  href: string
  innerText: string
}

interface INavigationHeadingProps {
  links: INavigationLink[]
  header: string
}

function NavigationHeading(props: INavigationHeadingProps) {
  const links: JSX.Element[] = []
  let key = 0
  for (const navLink of props.links) {
    const uniqueKey = key + 10 * Date.now()
    links.push(
      <Link
        className='dropdown-item'
        to={navLink.href}
        key={'nav-link-unique-' + uniqueKey.toString()}
      >
        {navLink.innerText}
      </Link>
    )
    key++
  }
  return (
    <div className='col'>
      <div className='dropdown-header'>{props.header}</div>
      {links}
    </div>
  )
}

function NavigationDropdown(props: any) {
  const randId = 'drop_down_' + ~~(Math.random() * Date.now())
  const subHeadings: JSX.Element[] = []
  let key = 0

  Object.keys(props.navHeading).map((heading) => {
    subHeadings.push(
      <NavigationHeading
        header={heading}
        links={props.navHeading[heading]}
        key={'nav-header' + (key + 10 * Date.now())}
      />
    )
    key++
  })
  return (
    <li className='nav-item dropdown'>
      <a
        className='nav-link text-light dropdown-toggle pl-3'
        href='#'
        id={randId}
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
        role='button'
      >
        <h5>{props.navTitle}</h5>
      </a>
      <div className='dropdown-menu' aria-labelledby={randId}>
        <div className='row flex-lg-nowrap'>{subHeadings}</div>
      </div>
    </li>
  )
}

export default class Navigation extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      nav: null,
      loaded: false
    }
    this.getNav()
  }

  private getNav() {
    fetchLogin()
      .then((navigation: any) => {
        if (navigation.error) {
          console.error(navigation.error)
        }
        this.setState({ nav: navigation, loaded: true })
      })
      .catch((err) => {
        console.error(err)
        this.setState({ nav: 'Error', loaded: true })
      })
  }

  public render() {
    if (
      this.state.nav === null ||
      this.state.nav === undefined ||
      this.state.loaded !== true
    ) {
      return null
    } else {
      const menus: JSX.Element[] = []
      Object.keys(this.state.nav).map((menu, key) => {
        menus.push(
          <NavigationDropdown
            navHeading={this.state.nav[menu]}
            navTitle={menu}
            key={'nav-dropdown-' + key}
          />
        )
      })
      return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-goodyear'>
          <Link className='navbar-brand' to='/'>
            <img src='/public/images/logo.png' height='60px' />
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#mainNav'
            aria-controls='main-nav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>

          <div className='collapse navbar-collapse' id='mainNav'>
            <ul className='mr-auto navbar-nav' id='menuContainer'>
              {menus}
            </ul>
            <ul className='navbar-nav'>
              <li className='nav-item dropdown' key='user-menu'>
                <a
                  className='dropdown-toggle pl-3 nav-item ml-auto'
                  data-toggle='dropdown'
                  id='account'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  <img
                    className='rounded-circle img'
                    src='/public/images/account.png'
                  />
                </a>
                <div
                  className='dropdown-menu dropdown-menu-right'
                  aria-labelledby='account'
                >
                  <Link className='dropdown-item' to='/changeCustomer'>
                    {'Change Customer'}
                  </Link>
                  <Can role={'User-Admin'}>
                    <Link className='dropdown-item' to='/userAdministration'>
                      {'User Administration'}
                    </Link>
                  </Can>
                  <Link className='dropdown-item' to='/profile'>
                    {'Profile'}
                  </Link>
                  <a className='dropdown-item' href='#'>
                    {'French'}
                  </a>
                  <a className='dropdown-item' href='/auth/logout'>
                    {'Logout'}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      )
    }
  }
}
