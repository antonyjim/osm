import * as React from 'react'

interface ITextField {
  id?: string
  name: string
  value: string | number
  className?: string
  references?: string
  refTable?: string
  type: string
  label: string
  attributes?: any
  isHidden?: boolean
  readOnly?: string
  maxLength?: number
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

function Field(props: ITextField): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.name || e.target.id
    const val = {}
    val[id] = e.target.value
    if (props.onChange) {
      props.onChange(e)
    }
  }

  return !props.isHidden ? (
    <div
      className={'form-group ' + props.className || ''}
      id={'cont-' + props.name}
    >
      <label htmlFor={props.name}>{props.label}</label>
      <input
        {...props.attributes}
        type={props.type}
        className='form-control'
        id={props.name}
        name={props.name}
        value={props.value || ''}
        onChange={handleChange}
        maxLength={props.maxLength}
      />
    </div>
  ) : (
    <></>
  )
}

export { Field }
