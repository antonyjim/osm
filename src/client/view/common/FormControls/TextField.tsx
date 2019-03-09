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
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

function Field(props: ITextField) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.name || e.target.id
    const val = {}
    val[id] = e.target.value
    props.onChange(e)
  }

  return (
    !props.isHidden && (
      <div
        className={'form-group ' + props.className || ''}
        id={'cont-' + props.id}
      >
        <label htmlFor={props.id}>{props.label}</label>
        <input
          {...props.attributes}
          type={props.type}
          className='form-control'
          id={props.id}
          name={props.id}
          value={props.value || ''}
          onChange={handleChange}
        />
      </div>
    )
  )
}

export { Field }
