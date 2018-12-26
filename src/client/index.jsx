import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Navigation } from './navigation.jsx'
import { Footer } from './common/footer.jsx'
import { Dashboard } from './common/dashboard.jsx'
import { AdminWireFrame } from './admin/NavigationRoles.jsx'
import E404 from './common/errors.jsx';
const TokenContext = React.createContext()


class App extends Component {
    constructor(props) {
        super(props)
        let token = new URLSearchParams(window.location.href.split('?')[1]).get('token')
        this.state = {
            token
        }
        if (token) {
            history.pushState({loaded: true}, 'Tire-HQ', '/')
        }
    }

    render() {
        return (
            <>
                <Router>
                    <div>
                        <Navigation token={this.state.token}/>
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