import * as React from 'react'

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
  const cancelContext = (e) => {
    if (e.target !== menuRef.current) setShown(false)
  }

  React.useEffect(() => {
    console.log('Calling effect')
    $(document).on('click', cancelContext)
    return () => {
      $(document).off('click', cancelContext)
    }
  })

  React.useEffect(() => {
    setShown(props.show)
  }, [props.show])

  props.options.map((opt, i) => {
    opts.push(
      <div className='dropdown-item' onClick={opt.action} key={'context-' + i}>
        {opt.text}
      </div>
    )
  })

  return (
    <>
      {shown && (
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
