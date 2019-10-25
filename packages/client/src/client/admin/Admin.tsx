import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
// import { AdminWireFrame } from './NavigationRoles'
import { E404 } from '../common/Errors'
import Wetty from './Wetty'
import Stats from './Stats'

export default function Admin() {
  return (
    <Switch>
      {/* <Route path='/admin/navroles' component={AdminWireFrame} /> */}
      <Route path='/admin/wetty' component={Wetty} />
      <Route path='/admin/stats' component={Stats} />
      <Route component={E404} />
    </Switch>
  )
}
