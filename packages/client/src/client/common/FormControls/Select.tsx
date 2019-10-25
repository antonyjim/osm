import * as React from 'react'
import { Component } from 'react'
interface ISelectFieldProps {
  id?: string
  name: string
  onChange: React.ChangeEventHandler
}

interface ISelectFieldState {
  otherField?: boolean
  selectId: string
  id?: string
}

class SelectField extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      otherField: false,
      selectId: props.id
    }
  }

  private handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === 'otherSelection') {
      this.setState({ otherField: true, id: e.target.id, selectId: '' })
      e.target.setAttribute('oldId', e.target.id)
      e.target.removeAttribute('id')
    } else {
      const oldId = e.target.getAttribute('oldId')
      if (oldId) {
        this.setState({ otherField: false, id: null, selectId: oldId })
        e.target.removeAttribute('oldId')
      } else {
        this.setState({ otherField: false, id: null, selectId: e.target.id })
      }
    }
  }

  public render() {
    const options: JSX.Element[] = []
    if (Array.isArray(this.props.opts)) {
      this.props.opts.forEach((opt) => {
        if (typeof opt === 'string') {
          options.push(
            <option value={opt} key={Math.floor(Math.random() * 1000000)}>
              {opt}
            </option>
          )
        } else {
          options.push(
            <option value={opt.value} key={Math.floor(Math.random() * 1000000)}>
              {opt.text}
            </option>
          )
        }
      })
    }

    if (this.props.otherField) {
      options.push(
        <option
          value='otherSelection'
          key={Math.floor(Math.random() * 1000000)}
        >
          Other
        </option>
      )
    }
    return (
      !this.props.isHidden && (
        <div className={'form-group ' + this.props.className}>
          <label htmlFor={this.props.id}>{this.props.label}</label>
          <select
            className='form-control'
            name={this.props.id}
            id={this.props.selectId}
            onChange={(e) => {
              this.handleOnChange(e)
              this.props.onChange(e)
            }}
            value={this.state.otherField ? 'otherSelection' : this.props.value}
          >
            {options}
          </select>
          {this.state.otherField && (
            <input
              id={this.state.id}
              type='text'
              className='form-control mt-3'
              onChange={this.props.onChange}
            />
          )}
        </div>
      )
    )
  }
}

export { SelectField }
