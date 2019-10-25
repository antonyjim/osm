import * as React from 'react'
import './FieldOptions.css'

function FieldOptions() {
  const [shownTab, setShownTab]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = React.useState('existingFields')
  function showTab(ev: React.MouseEvent) {
    ev.preventDefault()
    if (ev.target instanceof HTMLAnchorElement) {
      setShownTab(ev.target.href)
    }
  }

  return (
    <div className='form-opt-left'>
      {/* Tab options for references to db columns, new fields, empty inputs */}
      <div className='form-opt-tabs'>
        <a className='form-opt-tab' href='existingFields' onClick={showTab}>
          Existing
        </a>
        <a className='form-opt-tab' href='primitives' onClick={showTab}>
          Primitives
        </a>

        <div className='form-opt-tab-bodies'>
          <div
            id='existingFields'
            style={{
              display: shownTab === 'existingFields' ? 'block' : 'none'
            }}
          >
            <h1>WTF</h1>
          </div>
          <div
            id='primitives'
            style={{ display: shownTab === 'primitives' ? 'block' : 'none' }}
          >
            <h1>WTFS</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FieldOptions
