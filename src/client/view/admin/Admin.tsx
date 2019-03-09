import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { AdminWireFrame } from './NavigationRoles'
import { E404 } from '../common/errors'
import Wetty from './Wetty'
import Stats from './Stats'

export default class Admin extends Component {
  constructor(props) {
    super(props)
  }

  public render() {
    return (
      <Switch>
        <Route path='/admin/navroles' component={AdminWireFrame} />
        <Route path='/admin/wetty' component={Wetty} />
        <Route path='/admin/stats' component={Stats} />
        <Route component={E404} />
      </Switch>
    )
  }
}
