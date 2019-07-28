import * as React from 'react'

interface ICheckboxProps {
  isHidden?: boolean
  attributes?: any
  id?: string
  name: string
  checked: boolean
  value?: string
  onChange?: React.ChangeEventHandler
  onDoubleClick?: React.ChangeEventHandler
  label: string
  className?: string
  title?: string
}

function Checkbox(props: ICheckboxProps) {
  return props.isHidden ? null : (
    <div
      className={'form-checkbox ' + (props.className || '')}
      id={'check-' + props.name}
    >
      <input
        {...props.attributes}
        type='checkbox'
        id={props.id || props.name}
        name={props.name}
        checked={props.checked}
        value={props.value}
        onChange={props.onChange}
        onDoubleClick={props.onDoubleClick}
        title={props.title}
      />
      <label className='ml-2' htmlFor={props.id || props.name}>
        {props.label}
      </label>
    </div>
  )
}

export { Checkbox }
