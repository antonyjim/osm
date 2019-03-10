import * as React from 'react'
import { Component, Suspense } from 'react'
import { render } from 'react-dom'
import '@babel/polyfill'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Footer } from './common/footer'
import { E404, ErrorBoundary } from './common/errors'
import UserProfile from './home/UserProfile'
import Customer from './admin/Customer'
import Navigation from './common/Navigation'
import Dashboard from './home/dashboard'
import { TableList } from './common/ListView'
import Form from './common/Form'
import $ from 'jquery'

const Admin = React.lazy(() => import('./admin/Admin'))

const SuspenseLoader = (
  <div className='jumbotron'>
    <h1 className='display-4'>Loading...</h1>
  </div>
)

declare global {
  interface Window {
    MonacoEnvironment: any
    $: JQuery
    THQ: {
      user: {
        privs: string[]
      }

      menus: string[]
      loadingInterval?: number
      token: string
    }
  }
}

class App extends Component<{}, {}> {
  constructor(props) {
    super(props)
    const token = this.qs('token')
    const user = {
      userId: null,
      privs: []
    }
    window.THQ = { ...window.THQ, token, user }
    if (token) {
      if (window.sessionStorage) {
        window.sessionStorage.setItem('token', token)
        window.history.pushState({ loaded: true }, 'Tire-HQ', '/')
      }
    } else {
      if (window.sessionStorage) {
        window.THQ.token = sessionStorage.getItem('token')
        window.history.pushState({ loaded: true }, 'Tire-HQ', '/')
        if (!window.THQ.token) {
          this.logout()
        }
      }
    }
    setInterval(this.refreshToken, 300000)
    console.log('Constructed App')
  }

  private qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, '\\$&') // escape RegEx meta chars
    const match = location.search.match(
      new RegExp('[?&]' + key + '=([^&]+)(&|$)')
    )
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
  }

  private logout() {
    window.location.href = '/logout'
  }

  private refreshToken() {
    const token = window.THQ.token
    if (!token) {
      window.location.href = '/logout'
    } else {
      const details = JSON.parse(atob(token.split('.')[1]))
      const diff = details.exp * 1000 - new Date().getTime()
      if (diff < 300000) {
        $.ajax('/api/refresh?token=' + token, {
          success: (response) => {
            if (response.token && !response.error) {
              window.THQ.token = response.token
              sessionStorage.setItem('token', response.token)
            } else {
              console.log(response)
            }
          },
          error: (err) => {
            window.location.href = '/logout'
          }
        })
      }
    }
  }

  public render() {
    console.log('Calling render')
    if (window.THQ.loadingInterval) {
      clearInterval(window.THQ.loadingInterval)
      const container = document.getElementById('loading-container')
      if (container) {
        container.parentElement.removeChild(
          document.getElementById('loading-container')
        )
      }
    }
    return (
      <ErrorBoundary>
        <Router>
          <>
            <div className='fill'>
              <Navigation />
              <ErrorBoundary>
                <Suspense fallback={SuspenseLoader}>
                  <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route path='/profile' component={UserProfile} />
                    <Route
                      path='/admin/'
                      component={(props) => <Admin {...props} />}
                    />
                    <Route path='/customer/:customer' component={Customer} />
                    <Route path='/t/:table' component={TableList} />
                    <Route path='/f/:table/:id' component={Form} />
                    <Route component={E404} />
                  </Switch>
                </Suspense>
              </ErrorBoundary>
            </div>
            <Footer />
          </>
        </Router>
      </ErrorBoundary>
    )
  }
}

console.log('Calling render DOM')
render(<App />, document.querySelector('#root'))
