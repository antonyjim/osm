;`
Use this file to display the /basePath ui route in the core ui.
The component below will be rendered in the main display area
under the nav bar and above the footer
`

import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import Button from '../components/Button'
import PillLayout from '@components/Pills'

export default function EntryPage(
  routeProps: RouteComponentProps
): JSX.Element {
  return (
    <div className='row'>
      <Button />
    </div>
  )
}
