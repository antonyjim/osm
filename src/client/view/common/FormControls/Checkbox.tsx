import * as React from 'react'

interface ICheckboxProps {
  isHidden?: boolean
  attributes?: any
  id?: string
  name: string
  checked: boolean
  value?: string
  onChange: React.ChangeEventHandler
  label: string
  className?: string
}

function Checkbox(props: ICheckboxProps) {
  return (
    !props.isHidden && (
      <div
        className={'form-checkbox ' + props.className}
        id={'check-' + props.id}
      >
        <input
          {...props.attributes}
          type='checkbox'
          id={props.id}
          name={props.name || props.id}
          checked={!!props.checked}
          value={props.value}
          onChange={props.onChange}
        />
        <label className='ml-2' htmlFor={props.id}>
          {props.label}
        </label>
      </div>
    )
  )
}

export { Checkbox }
