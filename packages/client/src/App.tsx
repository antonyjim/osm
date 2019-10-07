import React, { Suspense } from 'react'
import { render } from 'react-dom'
// import '@babel/polyfill'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Footer } from './common/Footer'
import { E404, ErrorBoundary } from './common/Errors'
import Customer from './admin/Customer'
import Navigation from './home/Navigation'
import Dashboard from './home/Dashboard'
import { TableList } from './common/ListView'
import Form from './forms/Form'
// import $ from 'jquery'
import { IOSMWindowNamespace } from './types/global'
import { Workspace } from './customComponents/Workspace'
import { UserDetails } from './lib/authentication'

const Admin = React.lazy(() => import('./admin/Admin'))
const UserProfile = React.lazy(() => import('./home/UserProfile'))

// Handle pesky window types
declare global {
  interface Window {
    MonacoEnvironment: any
    $: JQuery
    OSM: IOSMWindowNamespace
    monaco: any
    require: any
  }
}

// Define helper functions/ components

const SuspenseLoader = (
  <div className='jumbotron'>
    <h1 className='display-4'>Loading...</h1>
  </div>
)

// Get a new token from the server when the old one is less than 3 minutes from expiring
const refreshToken = () => {
  const token = window.OSM.session.token
  if (!token) {
    window.location.href = '/auth/logout'
  } else {
    const details = JSON.parse(atob(token.split('.')[1]))
    const diff = details.exp * 1000 - new Date().getTime()
    if (diff < 300000) {
      $.ajax('/api/refresh?token=' + token, {
        success: (response) => {
          if (response.token && !response.error) {
            window.OSM.session.token = response.token
            sessionStorage.setItem('token', response.token)
          } else {
            console.log(response)
          }
        },
        error: (err) => {
          window.location.href = '/auth/logout'
        }
      })
    }
  }
}

// Extract key / value pairs from query string
const qs = (key: string) => {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, '\\$&') // escape RegEx meta chars
  const match = location.search.match(
    new RegExp('[?&]' + key + '=([^&]+)(&|$)')
  )
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

let parsedAt: number = 0

export default function App() {
  // Expect that a token will be in the query string
  const token = qs('token')
  const user: UserDetails = new UserDetails('')
  user.privs = []

  window.OSM = { ...window.OSM, session: { token, user, scope: 'SYS' } }
  if (token) {
    // Remove the token from the query string
    if (window.localStorage) {
      window.localStorage.setItem('token', token)
      window.history.pushState(
        { loaded: true },
        'Open Service Management',
        window.location.pathname
      )
    }
  } else {
    if (window.localStorage) {
      // Default to looking for the token in session storage
      window.OSM.session.token = localStorage.getItem('token')
      // window.history.pushState({ loaded: true }, 'Tire-HQ', '/')
      if (!window.OSM.session.token) {
        window.location.href = '/auth/logout'
      }
    }
  }
  setInterval(refreshToken, 300000)
  if (window.THQ.loadingInterval) {
    clearInterval(window.THQ.loadingInterval)
    const container = document.getElementById('loading-container')
    const loadingContainer = document.getElementById('loading-container')
    if (container && container.parentElement && loadingContainer) {
      container.parentElement.removeChild(loadingContainer)
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
                    component={(props: any) => <Admin {...props} />}
                  />
                  <Route path='/customer/:customer' component={Customer} />
                  <Route path='/t/:table' component={TableList} />
                  <Route path='/f/:table/:id' component={Form} />
                  <Route path='/c/:componentTitle' component={Workspace} />
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

parsedAt = performance.now()
console.log(
  'Calling render DOM %s milliseconds after pageload',
  parsedAt - (window.THQ.pageLoad || performance.now())
)

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/public/sw.js', { scope: '/public/' })
//     .then((reg) => {
//       console.log('Registration succeeded with scope ' + reg.scope)
//     })
//     .catch((err) => {
//       console.error('Serviceworker registration failed with error ' + err)
//     })
// }
render(<App />, document.querySelector('#root'))
