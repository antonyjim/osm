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

  const cancelContext = (e) => {
    if (shown) {
      console.log('Hiding Menu')
      setShown(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', cancelContext)
    return document.removeEventListener('click', cancelContext)
  }, [])

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
          className='dropdown-menu'
          style={{
            display: 'block',
            left: props.location.x,
            top: props.location.y
          }}
        >
          {opts}
        </div>
      )}
    </>
  )
}
