import * as React from 'react'
import { ITHQWindowNamespace } from '../typings'
interface ICanProps {
  if?: boolean
  role?: string
}

declare global {
  interface Window {
    MonacoEnvironment: any
    $: JQuery
    THQ: ITHQWindowNamespace
  }
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
    return null
  }
}

export { Can }
