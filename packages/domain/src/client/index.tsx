;`
Export a default function to be promise-required by the
'client' package. Upon enabling this package, the client
will be rebuilt to load the /route into the bundle sent
to the client at page load.
`

import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

// Load local components
import EntryPage from './pages/EntryPage'

export default function MyRoutes(): JSX.Element {
  return (
    <Switch>
      <Route path='/domain' component={EntryPage} />
    </Switch>
  )
}
