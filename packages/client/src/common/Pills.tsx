import * as React from 'react'
import { Fragment } from 'react'
import { Alert } from './Alerts'
// import $ from 'jquery'
import { ContextMenu, IContextMenuProps } from './ContextMenu'
import { generateKeyHash } from '../lib/util'

export interface IPillBody {
  id: string
  label: string
  body: JSX.Element
}

export interface IPillProps {
  [name: string]: IPillBody
}

interface IMessages {
  info: { message: string }[]
  warnings: { message: string }[]
  errors: { message: string }[]
}

function InlineModifier(props: { val: string }) {
  // const handleOkay = (e) => {}
  return true
}

/**
 * Render a Pill layout for forms and other pages.
 * @param props
 */
export default function Pills(props: { pills: IPillProps }) {
  const [pillAs, setPillAs]: [
    JSX.Element[],
    React.Dispatch<React.SetStateAction<JSX.Element[]>>
  ] = React.useState([<Fragment key={generateKeyHash()}></Fragment>])
  const [pillBodies, setPillBodies]: [
    JSX.Element[],
    React.Dispatch<React.SetStateAction<JSX.Element[]>>
  ] = React.useState([<Fragment key={generateKeyHash()}></Fragment>])
  const [messages, setMessages]: [
    IMessages,
    React.ComponentState
  ] = React.useState({
    errors: [],
    info: [],
    warnings: []
  })

  const [showContext, setContextShown]: [
    IContextMenuProps,
    React.ComponentState
  ] = React.useState({
    show: false,
    location: { x: 0, y: 0 }
  })

  const handleRename = (e: React.MouseEvent) => {
    setContextShown({ show: false })
    console.log(showContext.originalTarget)
  }

  const handleAuxClick = (e: React.MouseEvent) => {
    console.log('Right clicked')
    console.log(e)
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

  const handleDblClick = (e: React.MouseEvent) => {
    console.log('Double clicked')
    if (e.target instanceof HTMLElement) {
      e.target.innerHTML = `<div>${e.target.innerText}</div>`
    }

    // $(document).on('click', handleOutsideClick)
  }

  const handleOutsideClick = (e: React.MouseEvent) => {
    console.log('Clicked on something else')
  }

  const handlePillBodies = () => {
    const pills = { ...props.pills }
    const newPillAs: JSX.Element[] = []
    const newPillBodies: JSX.Element[] = []
    Object.keys(pills).forEach((pill, key) => {
      if (typeof pills[pill] !== 'object') {
        return null
      }
      if (key === 0) {
        // First pill is active by default
        newPillAs.push(
          <a
            onDoubleClick={handleDblClick}
            className='nav-link active'
            id={pills[pill].id + '-tab'}
            data-toggle='pill'
            href={'#' + pills[pill].id}
            role='tab'
            aria-controls={pills[pill].id}
            aria-selected='true'
            key={generateKeyHash()}
          >
            {pills[pill].label}
          </a>
        )
        newPillBodies.push(
          <div
            className='tab-pane fade show active'
            id={pills[pill].id}
            role='tabpanel'
            aria-labelledby={pills[pill].id + '-tab'}
            key={generateKeyHash()}
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
        newPillAs.push(
          <a
            onDoubleClick={handleDblClick}
            className='nav-link'
            id={pills[pill].id + '-tab'}
            data-toggle='pill'
            href={'#' + pills[pill].id}
            role='tab'
            aria-controls={pills[pill].id}
            aria-selected='false'
            key={generateKeyHash()}
          >
            {pills[pill].label}
          </a>
        )
        newPillBodies.push(
          <div
            className='tab-pane fade'
            id={pills[pill].id}
            role='tabpanel'
            aria-labelledby={pills[pill].id + '-tab'}
            key={generateKeyHash()}
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

    setPillAs(newPillAs)
    setPillBodies(newPillBodies)
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
  const handleStatusMessage = (message: any) => {
    setMessages({
      info: [...messages.info].concat([{ message: message.toString() }])
    })
  }

  React.useEffect(handlePillBodies, [props.pills])
  return (
    <div className='container-fluid' style={{ minHeight: '80vh' }}>
      <div className='row mt-4'>
        <div className='col-md-3 col-sm-12 d-print-none'>
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
        <div className='col mb-4'>
          <div className='tab-content' id='v-pill-tabContent'>
            {messages.errors &&
              messages.errors.map((errorsmessage) => {
                return (
                  <Alert
                    alertType='info'
                    message={errorsmessage.message}
                    key={generateKeyHash()}
                  />
                )
              })}
            {messages.info &&
              messages.info.map((infomessage) => {
                return (
                  <Alert
                    alertType='info'
                    message={infomessage.message}
                    key={generateKeyHash()}
                  />
                )
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
