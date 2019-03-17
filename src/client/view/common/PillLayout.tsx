import * as React from 'react'
import { Alert } from './Alerts'
import $ from 'jquery'
import { ContextMenu, IContextMenuProps } from './ContextMenu'

interface IPillProps {
  pills: {
    [name: string]: {
      id: string
      label: string
      body: JSX.Element
    }
  }
}

interface IMessages {
  info?: [{ message: string }]
  warnings?: [{ message: string }]
  errors?: [{ message: string }]
}

function InlineModifier(props: { val: string }) {
  // const handleOkay = (e) => {}
  return true
}

export default function Pills(props: IPillProps) {
  const pillAs = []
  const pillBodies = []
  const [messages, setMessages]: [
    IMessages,
    React.ComponentState
  ] = React.useState({})

  const [showContext, setContextShown]: [
    IContextMenuProps,
    React.ComponentState
  ] = React.useState({
    show: false,
    location: { x: 0, y: 0 }
  })

  const handleRename = (e) => {
    setContextShown({ show: false })
    console.log(showContext.originalTarget)
  }

  const handleAuxClick = (e: React.MouseEvent) => {
    console.log('Right clicked')
    console.log(e)
    e.persist()
    e.preventDefault()
    setContextShown({
      show: true,
      location: {
        x: e.pageX,
        y: e.pageY
      },
      originalTarget: e.target
    })
  }

  const handleDblClick = (e) => {
    console.log('Double clicked')
    e.target.children = <div>{e.target.innerText}</div>

    $(document).on('click', handleOutsideClick.bind(this))
  }

  const handleOutsideClick = (e) => {
    console.log('Clicked on something else')
  }

  const handlePillBodies = () => {
    const pills = { ...props.pills }
    Object.keys(pills).map((pill, key) => {
      if (key === 0) {
        // First pill is active by default
        pillAs.push(
          <a
            key={
              /* key * Date.now() + (~~Math.random() * 10000)*/ pills[pill].id +
              '-tab'
            }
            onDoubleClick={handleDblClick.bind(this)}
            className='nav-link active'
            id={pills[pill].id + '-tab'}
            data-toggle='pill'
            href={'#' + pills[pill].id}
            role='tab'
            aria-controls={pills[pill].id}
            aria-selected='true'
          >
            {pills[pill].label}
          </a>
        )
        pillBodies.push(
          <div
            key={pills[pill].id}
            className='tab-pane fade show active'
            id={pills[pill].id}
            role='tabpanel'
            aria-labelledby={pills[pill].id + '-tab'}
          >
            <div className='row'>
              <div className='col' />
              <div className='col-lg-10 col-md-11 col-sm-12 pt-4'>
                {pills[pill].body}
              </div>
              <div className='col' />
            </div>
          </div>
        )
      } else {
        pillAs.push(
          <a
            key={
              /* key * Date.now() + (~~Math.random() * 1000)*/ pills[pill].id +
              '-tab'
            }
            onDoubleClick={handleDblClick.bind(this)}
            className='nav-link'
            id={pills[pill].id + '-tab'}
            data-toggle='pill'
            href={'#' + pills[pill].id}
            role='tab'
            aria-controls={pills[pill].id}
            aria-selected='false'
          >
            {pills[pill].label}
          </a>
        )
        pillBodies.push(
          <div
            key={pills[pill].id}
            className='tab-pane fade'
            id={pills[pill].id}
            role='tabpanel'
            aria-labelledby={pills[pill].id + '-tab'}
          >
            <div className='row'>
              <div className='col' />
              <div className='col-lg-10 col-md-11 col-sm-12 pt-4'>
                {pills[pill].body}
              </div>
              <div className='col' />
            </div>
          </div>
        )
      }
    })
  }

  const contextOptions: [
    {
      text: string
      action: React.MouseEventHandler
    }
  ] = [
    {
      text: 'Rename',
      action: handleRename
    }
  ]

  /**
   * Provide a simple, reusable interface to trigger error alerts
   * across all components that utilize the bill layout
   * @param {Error} err Error message or raw error
   */
  const handleErrorMessage = (err: Error | string) => {
    setMessages({
      errors: [...messages.errors].concat([{ message: err.toString() }])
    })
  }

  /**
   * Provide a simple, reusable interface to trigger alerts in the pill layout.
   * @param {string} message Alert to be displayed as a blue info message
   */
  const handleStatusMessage = (message) => {
    setMessages({
      info: [...messages.info].concat([{ message: message.toString() }])
    })
  }

  handlePillBodies()
  return (
    <div className='container-fluid' style={{ minHeight: '80vh' }}>
      <div className='row mt-4'>
        <div className='col-md-3 col-sm-12'>
          <div
            className='nav flex-column nav-pills'
            id='v-pills'
            role='tablist'
            aria-orientation='vertical'
            onContextMenu={handleAuxClick}
          >
            {pillAs}
          </div>
        </div>
        <div className='col-md-9 col-sm-12 mb-5'>
          <div className='tab-content' id='v-pill-tabContent'>
            {messages.errors &&
              messages.errors.map((errorsmessage) => {
                return (
                  <Alert alertType='info' message={errorsmessage.message} />
                )
              })}
            {messages.info &&
              messages.info.map((infomessage) => {
                return <Alert alertType='info' message={infomessage.message} />
              })}
            {pillBodies}
          </div>
        </div>
      </div>
      {showContext.show && (
        <ContextMenu {...showContext} options={contextOptions} />
      )}
    </div>
  )
}
