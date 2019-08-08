import * as React from 'react'
import { SearchModal } from '../SearchModal'
import { FormValue } from '../../types/forms'
import { IDictionary } from '../../types/server'

export interface IRefUpdate {
  newValue: string
  newDisplay: string
  oldValue: string
  oldDisplay: string
  field: string
}

interface IRefVal {
  value: string
  display: string
}

interface IReferenceProps {
  name: string
  label: string
  references: string
  id?: string
  value?: string
  display?: string
  className?: string
  attributes?: IDictionary<FormValue>
  readOnly?: boolean
  setReference: (updatedRef: IRefUpdate) => void
}

function Reference(props: IReferenceProps) {
  const [refVal, setRefVal] = React.useState<IRefVal>({
    value: props.value || '',
    display: props.display || ''
  })

  const readOnly = props.readOnly || false

  const [searchOpen, setSearchOpen] = React.useState<boolean>(false)

  const toggleSearch = (e: React.MouseEvent<HTMLSpanElement>): void => {
    setSearchOpen(!searchOpen)
  }

  /**
   * Sets the value of local state and propogates the change
   * to the parent via props.setReference
   * @param e Click event from reference table
   */
  const handleSelection = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (
      e.target instanceof HTMLAnchorElement &&
      e.target.getAttribute('data-key')
    ) {
      const dataKey = e.target.getAttribute('data-key') || ''
      props.setReference({
        field: props.name,
        newValue: dataKey,
        newDisplay: e.target.innerText,
        oldValue: refVal.value,
        oldDisplay: refVal.display
      })

      setRefVal({
        value: dataKey,
        display: e.target.innerText
      })
    }
  }

  /**
   * Sets the local state of the display element
   * @param e Change event from input element
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRefVal({
      value: refVal.value,
      display: e.target.value
    })
  }

  return (
    <>
      <div className={'form-group ' + props.className} id={'cont-' + props.id}>
        <input
          type='hidden'
          id={props.id}
          name={props.name || props.id}
          value={refVal.value}
          onChange={handleChange}
          readOnly={readOnly}
        />{' '}
        {/* Store the actual value */}
        <label htmlFor={props.id}>{props.label}</label>
        <div className='input-group'>
          <input
            {...props.attributes}
            type='text'
            className='form-control'
            id={props.id + '_display'}
            name={props.name + '_display' || props.id + '_display'}
            value={refVal.display}
            onChange={handleChange}
            readOnly={readOnly}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              id={props.id + '_search'}
              data-toggle='modal'
              onClick={toggleSearch}
              disabled={readOnly}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {searchOpen && (
        <SearchModal
          title={props.references}
          table={props.references}
          handleSelectKey={handleSelection}
          onClose={toggleSearch}
        />
      )}
    </>
  )
}

export { Reference }
