import * as React from 'react'
interface ICanProps {
  if?: boolean
  role?: string
}

function Can(props: React.PropsWithChildren<ICanProps>) {
  let privs: string[] = window.THQ.user.privs || []

  if (window.THQ.user.privs && window.THQ.user.privs.length === 0) {
    document.addEventListener('thq.receivedNav', (e) => {
      privs = window.THQ.user.privs
    })
  }

  function validate() {
    if (props.role && privs && privs.indexOf(props.role) > -1) {
      return true
    } else if (props.if) {
      return true
    } else {
      return false
    }
  }

  if (validate()) {
    return <>{props.children}</>
  } else {
    return <></>
  }
}

export default Can
