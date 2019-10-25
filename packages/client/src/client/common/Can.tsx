import * as React from 'react'
import { IOSMWindowNamespace } from '../types/global'
interface ICanProps {
  if?: boolean
  role?: string
}

declare global {
  interface Window {
    MonacoEnvironment: any
    $: JQuery
    OSM: IOSMWindowNamespace
  }
}

function Can(props: React.PropsWithChildren<ICanProps>) {
  let privs: string[] = window.OSM.session.user.privs || []

  if (
    window.OSM.session.user.privs &&
    window.OSM.session.user.privs.length === 0
  ) {
    document.addEventListener('osm.receivedNav', (e) => {
      privs = window.OSM.session.user.privs
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
