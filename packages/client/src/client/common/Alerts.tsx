import * as React from 'react'

type AlertTypes = 'danger' | 'warning' | 'success' | 'info'

interface IAlert {
  message: string
  alertType?: AlertTypes
  dismissable?: boolean
}

/**
 * Renders a bootstrap alert
 * @param props Options for alerts
 */
function Alert(props: IAlert): JSX.Element {
  const dismissable: boolean = props.dismissable || true
  const alertType = props.alertType || 'danger'
  if (typeof props.message === 'string') {
    return (
      <div
        className={
          'alert fade show alert-' +
          alertType +
          (dismissable ? ' alert-dismissible' + alertType : '')
        }
        role='alert'
      >
        {props.message}
        {dismissable && (
          <button
            type='button'
            className='close'
            data-dismiss='alert'
            aria-label='Close'
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        )}
      </div>
    )
  } else {
    return <></>
  }
}

export { Alert }
