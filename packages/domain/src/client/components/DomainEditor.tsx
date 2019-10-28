;`
List items with popup modal to edit DomainInfo
`

import * as React from 'react'

interface IDomainEditorProps {}

export default function DomainEditor(domainEditorProps: IDomainEditorProps) {
  const [domains, setDomains] = React.useState()
  let domainList = []

  React.useEffect(() => {}, [domains])

  return (
    <div className='row'>
      <div className='col-4'>
        <div className='list-group' id='list-tab' role='tablist'>
          <a
            className='list-group-item list-group-item-action active'
            id='list-home-list'
            data-toggle='list'
            href='#list-home'
            role='tab'
            aria-controls='home'
          >
            Home
          </a>
          <a
            className='list-group-item list-group-item-action'
            id='list-profile-list'
            data-toggle='list'
            href='#list-profile'
            role='tab'
            aria-controls='profile'
          >
            Profile
          </a>
          <a
            className='list-group-item list-group-item-action'
            id='list-messages-list'
            data-toggle='list'
            href='#list-messages'
            role='tab'
            aria-controls='messages'
          >
            Messages
          </a>
          <a
            className='list-group-item list-group-item-action'
            id='list-settings-list'
            data-toggle='list'
            href='#list-settings'
            role='tab'
            aria-controls='settings'
          >
            Settings
          </a>
        </div>
      </div>
      <div className='col-8'>
        <div className='tab-content' id='nav-tabContent'>
          <div
            className='tab-pane fade show active'
            id='list-home'
            role='tabpanel'
            aria-labelledby='list-home-list'
          >
            ...
          </div>
          <div
            className='tab-pane fade'
            id='list-profile'
            role='tabpanel'
            aria-labelledby='list-profile-list'
          >
            ...
          </div>
          <div
            className='tab-pane fade'
            id='list-messages'
            role='tabpanel'
            aria-labelledby='list-messages-list'
          >
            ...
          </div>
          <div
            className='tab-pane fade'
            id='list-settings'
            role='tabpanel'
            aria-labelledby='list-settings-list'
          >
            ...
          </div>
        </div>
      </div>
    </div>
  )
}
