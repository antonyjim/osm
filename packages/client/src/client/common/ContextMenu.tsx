import * as React from 'react'
import jQuery from 'jquery'

export interface IContextMenuProps {
  options?: [
    {
      text: string
      action: React.MouseEventHandler
    }
  ]
  location?: {
    x: number
    y: number
  }
  show?: boolean
  originalTarget?: HTMLElement
}

export function ContextMenu(props: IContextMenuProps) {
  const opts: JSX.Element[] = []
  const [shown, setShown] = React.useState(props.show || false)
  const menuRef = React.useRef(null)
  const cancelContext = (e: MouseEvent | React.FocusEvent) => {
    if (e.target !== menuRef.current) setShown(false)
  }

  React.useEffect(() => {
    console.log('Calling effect')
    document.addEventListener('click', cancelContext, false)
    return () => {
      document.removeEventListener('click', cancelContext, false)
    }
  })

  React.useEffect(() => {
    setShown(props.show || false)
  }, [props.show])

  if (props.options) {
    props.options.map((opt, i) => {
      opts.push(
        <div
          className='dropdown-item'
          onClick={opt.action}
          key={'context-' + i}
        >
          {opt.text}
        </div>
      )
    })
  }

  return (
    <>
      {shown && props.location && (
        <div
          ref={menuRef}
          className='dropdown-menu'
          style={{
            display: 'block',
            left: props.location.x,
            top: props.location.y
          }}
          tabIndex={0}
          onBlur={cancelContext}
        >
          {opts}
        </div>
      )}
    </>
  )
}
