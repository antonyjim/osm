import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Navigation } from './navigation.jsx'
import { Footer } from './common/footer.jsx'
import { Dashboard } from './common/dashboard.jsx'
import { AdminWireFrame } from './admin/NavigationRoles.jsx'
import { E404 } from './common/errors.jsx';

class App extends Component {
    constructor(props) {
        super(props)
        let token = new URLSearchParams(window.location.href.split('?')[1]).get('token')
        window.THQ = {
            token
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
        setInterval(this.refreshToken, 30000)
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
                console.log('Refreshing token.')
                $.ajax('/api/refresh?token=' + token, {
                    success: function(response) {
                        if (response.token && !response.error) {
                            window.THQ.token = response.token
                            sessionStorage.setItem('token', response.token)
                            console.log('Token successfully refreshed')
                        } else {
                            console.log('Something happening in the response.')
                            console.log(response)
                        }
                    }
                })
            } else {
                console.log('Token is okay for %s more minutes.', diff / 60000)
            }
        }
    }

    render() {
        return (
            <>
                <Router>
                    <div>
                        <Navigation/>
                        <Switch>
                            <Route exact path="/" component={Dashboard}></Route>
                            <Route path="/admin/navroles/" component={AdminWireFrame} />
                            <Route component={E404}/>
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </>
        )
    }
}

render(<App/> , document.querySelector('#root'))