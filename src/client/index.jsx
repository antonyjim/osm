import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Navigation } from './navigation.jsx'
import { Footer } from './common/footer.jsx'
import { Dashboard } from './common/dashboard.jsx'
import { AdminWireFrame } from './admin/NavigationRoles.jsx'
import E404 from './common/errors.jsx';
const TokenContext = React.createContext()


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: new URLSearchParams(window.location.href.split('?')[1]).get('token')
        }
        document.cookie = new URLSearchParams(window.location.href.split('?')[1]).get('token')
    }

    render() {
        return (
            <>
                <Router>
                    <div>
                        <Navigation token={this.state.token}/>
                        <Route exact path="/" component={Dashboard}></Route>
                        <Route exact path="/admin/navroles/" component={AdminWireFrame} />
                        <Footer />
                    </div>
                </Router>
            </>
        )
    }
}

render(<App/> , document.querySelector('#root'))