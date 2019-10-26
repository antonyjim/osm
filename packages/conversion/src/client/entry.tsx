// This file is the entry point for webpack to bundle your
// solution into something that can be required by the core.
// It is expected that there will be one default export
// which contains your app's entry component along with routing.

import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default function Module(props: any) {
  return (
    <Switch>
      <Route path='/convert' component={ConvertModule} />
    </Switch>
  )
}

function ConvertModule() {}
