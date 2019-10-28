import * as React from 'react'
;`
Just a sample file for components
`

function handleClick(e: React.MouseEvent) {
  console.log('Clicked at X:%d, Y:%d', e.pageX, e.pageY)
}

export default function Button() {
  return (
    <button className='btn btn-success p-5 m-2' onClick={handleClick}>
      Click Me!
    </button>
  )
}
