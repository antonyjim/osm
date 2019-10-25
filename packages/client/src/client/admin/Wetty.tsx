import * as React from 'react'
// import $ from 'jquery'

function Wetty() {
  const wettyHeight =
    window.innerHeight -
    ($('nav')[0].clientHeight + $('footer')[0].clientHeight)
  return (
    <div className='row'>
      <div className='col'>
        <iframe
          src='/wetty'
          className='wetty'
          style={{ height: wettyHeight + 'px' }}
        />
      </div>
    </div>
  )
}

export default Wetty
