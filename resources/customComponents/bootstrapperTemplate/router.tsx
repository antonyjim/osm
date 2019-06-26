/**
 * {{ componentTitle }}
 */

import * as React from 'react'
import { Router, Link, Switch, RouteComponentProps } from 'react-router-dom'

// This will be imported by the <Route /> prop in the <App /> component
export default function ComponentEntry(props: RouteComponentProps<any>) {
  return <div className='container'>{'Hello world!'}</div>
}
