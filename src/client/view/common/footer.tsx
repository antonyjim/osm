import * as React from 'react'
export function Footer() {
  return (
    <>
      <footer className='bg-dark'>
        <div className='footer pt-4'>
          <div className='col-3' />
          <div className='col text-center'>
            <a className='text-light' href='#'>
              FAQ
            </a>
            <a className='pl-4 text-light' href='#'>
              Help &amp; Training
            </a>
            <a className='pl-4 text-light' href='#'>
              Contact &amp; Vendors
            </a>
            <a className='pl-4 text-light' href='#'>
              Featured Partners
            </a>
            <a className='pl-4 text-light' href='#'>
              Integration Resource Center
            </a>
            <a className='pl-4 text-light' href='#'>
              CAM Resources
            </a>
            <a className='pl-4 text-light' href='#'>
              Utility Menu
            </a>
            <a className='pl-4 text-light' href='#'>
              PFB Catalog Maint.
            </a>
          </div>
          <div className='col-3' />
        </div>

        <div className='footer pt-5'>
          <div className='col' />
          <div className='col text-center pb-3'>
            <strong>
              <a className='text-light' href='#'>
                Privacy Policy
              </a>
              <div className='pl-4 pr-4 d-inline'>|</div>
              <a className='text-light' href='#'>
                Copyright
              </a>
              <div className='pl-4 pr-4 d-inline'>|</div>
              <a className='text-light' href='#'>
                Terms &amp; Conditions
              </a>
            </strong>
          </div>
          <div className='col' />
        </div>
      </footer>
    </>
  )
}
