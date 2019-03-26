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
  title?: string
}

function Checkbox(props: ICheckboxProps) {
  return (
    !props.isHidden && (
      <div
        className={'form-checkbox ' + (props.className || '')}
        id={'check-' + props.name}
      >
        <input
          {...props.attributes}
          type='checkbox'
          id={props.name}
          name={props.name}
          checked={props.checked}
          value={props.value}
          onChange={props.onChange}
          title={props.title}
        />
        <label className='ml-2' htmlFor={props.name}>
          {props.label}
        </label>
      </div>
    )
  )
}

export { Checkbox }
