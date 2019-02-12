import React, { Component, Suspense } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Footer } from './common/footer.jsx'
import { E404, ErrorBoundary } from './common/errors.jsx';
import UserProfile from './home/UserProfile.jsx';
import Customers from './admin/Customers.jsx'
import Customer from './admin/Customer.jsx'
import Users from './admin/Users.jsx'
import Navigation from './navigation.jsx'
import "@babel/polyfill"
import SuspenseLoader from './common/Suspense.jsx';
import Dashboard from './home/dashboard.jsx'

const Admin = React.lazy(() => import('./admin/Admin.jsx'))

class App extends Component {
    constructor(props) {
        super(props)
        let token = this.qs('token')
        let user = {
            userId: null,
            privs: []
        }
        window.THQ = {
            token,
            user
        }
        if (token) {
            if (window.sessionStorage) {
                window.sessionStorage.setItem('token', token)
                window.history.pushState({loaded: true}, 'Tire-HQ', '/')
            }
        } else {
            if (window.sessionStorage) {
                window.THQ.token = sessionStorage.getItem('token')
                window.history.pushState({loaded: true}, 'Tire-HQ', '/')
                if (!window.THQ.token) {
                    this.logout()
                }
            }
        }
        setInterval(this.refreshToken, 300000)
    }

    qs(key) {
        key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
        var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
        return match && decodeURIComponent(match[1].replace(/\+/g, " "));
    }

    logout() {
        window.location.href = '/logout'
    }

    refreshToken() {
        let token = window.THQ.token
        if (!token) {
            window.location.href = '/logout'
        } else {
            const details = JSON.parse(atob(token.split('.')[1]))
            const diff = (details.exp * 1000) - new Date().getTime()
            if (diff < 300000) {
                $.ajax('/api/refresh?token=' + token, {
                    success: function(response) {
                        if (response.token && !response.error) {
                            window.THQ.token = response.token
                            sessionStorage.setItem('token', response.token)
                        } else {
                            console.log(response)
                        }
                    },
                    error: function(err) {
                        window.location.href = '/logout'
                    }
                })
            }
        }
    }

    render() {
        if (loadingInterval) {
            clearInterval(loadingInterval)
            document.getElementById('loading-container').parentElement.removeChild(document.getElementById('loading-container'))
        }
        return (
            <ErrorBoundary>
                <Router>
                    <>
                        <div className="fill">
                            <Navigation/>
                            <ErrorBoundary>
                                <Suspense fallback={SuspenseLoader}>
                                    <Switch>
                                        <Route exact path="/" component={Dashboard} />
                                        <Route path="/profile" component={UserProfile} />
                                        <Route path="/admin/" component={Admin} />
                                        <Route path="/customer/:customer" component={Customer} />
                                        <Route path="/changeCustomer" component={Customers} />
                                        <Route path="/userAdministration" component={Users} />
                                        <Route component={E404}/>
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

render(<App/> , document.querySelector('#root'))
