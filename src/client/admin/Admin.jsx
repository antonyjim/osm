import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AdminWireFrame } from './NavigationRoles.jsx';
import { Customers } from './Customers.jsx'
import { E404 } from './../common/errors.jsx'
import Wetty from './Wetty.jsx';
import UserList from './Users.jsx';
import UserProfile from '../home/UserProfile.jsx';

class Admin extends Component {
    constructor(props) {
        super(props)
    }

    render() { 
        return (
            <Switch>
                <Route path="/admin/customers" component={Customers} />
                <Route path="/admin/users" component={UserList} />
                <Route path="/admin/user/:userId" component={UserProfile} />
                <Route path="/admin/navroles" component={AdminWireFrame} />
                <Route path="/admin/wetty" component={Wetty} />
                <Route component={E404} />
            </Switch>
        )
    }
}
 
export { Admin };