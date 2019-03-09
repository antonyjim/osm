import React, { Component } from 'react'

interface IAlert {
  message: string
  alertType: string
}

function Alert(props: IAlert) {

    return (
      <div
        className={
          'alert alert-dismissible fade show alert-' + props.alertType
        }
        role="alert"
      >
        {typeof props.message === 'string' && props.message}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
}

export default Alert
