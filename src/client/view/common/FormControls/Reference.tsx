import * as React from 'react'
import { SearchModal } from '../SearchModal'

// nterfa IReferenceProps {}

function Reference(props) {
  const handleSelection = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (e.target instanceof HTMLAnchorElement) {
      if (props.setValue) {
        console.log({ [props.name]: e.target.getAttribute('data-key') })
        props.setValue({ [props.name]: e.target.getAttribute('data-key') })
      }
      props.onChange({
        target: {
          id: props.id,
          value: e.target.getAttribute('data-key'),
          name: props.name
        }
      })
      props.onChange({
        target: {
          id: props.id + '_display',
          value: e.target.innerText,
          name: props.name + '_display'
        }
      })
    }
  }
  return (
    <>
      <div className={'form-group ' + props.className} id={'cont-' + props.id}>
        <input
          type='hidden'
          id={props.id}
          name={props.name || props.id}
          value={props.value || ''}
          onChange={props.onChange}
        />{' '}
        {/* Store the actual value */}
        <label htmlFor={props.id}>{props.label}</label>
        <div className='input-group'>
          <input
            {...props.attributes}
            type={props.type}
            className='form-control'
            id={props.id + '_display'}
            name={props.name + '_display' || props.id + '_display'}
            value={props.display}
            onChange={props.onChange}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              id={props.id + '_search'}
              data-toggle='modal'
              data-target={'#' + props.references + '_search_modal'}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <SearchModal
        title={props.references}
        table={props.references}
        handleSelectKey={handleSelection.bind(this)}
      />
    </>
  )
}

export { Reference }
