import React, { Component } from 'react'
import SearchModal from './SearchModal.jsx'

class Field extends Component {
  constructor(props) {
    super(props)

    this.state = {
      validReference: '',
      fields: {},
      openSearch: false,
      name: props.display || ''
    }
  }

  handleChange(e) {
    this.props.onChange({
      target: {
        id: e.target.id,
        value: e.target.value
      }
    })
  }

  handleSelection(e) {
    this.props.onChange({
      target: {
        id: this.props.id,
        value: e.target.getAttribute('data-key')
      }
    })
    this.props.onChange({
      target: {
        id: this.props.id + '_display',
        value: e.target.innerText
      }
    })
  }

  render() {
    if (this.props.references) {
      return (
        <>
          <div
            className={'form-group ' + this.props.className}
            id={'cont-' + this.props.id}
          >
            <input
              type='hidden'
              id={this.props.id}
              value={this.props.value || ''}
              onChange={this.props.onChange}
            />{' '}
            {/* Store the actual value */}
            <label htmlFor={this.props.id}>{this.props.label}</label>
            <div className='input-group'>
              <input
                {...this.props.attributes}
                type={this.props.type}
                className='form-control'
                id={this.props.id + '_display'}
                value={this.props.display}
                onChange={this.handleChange}
              />
              <div className='input-group-append'>
                <button
                  className='btn btn-outline-secondary'
                  type='button'
                  id={this.props.id + '_search'}
                  data-toggle='modal'
                  data-target={'#' + this.props.references + '_search_modal'}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <SearchModal
            table={this.props.references}
            handleSelectKey={this.handleSelection.bind(this)}
          />
        </>
      )
    } else {
      return (
        !this.props.isHidden && (
          <div
            className={'form-group ' + this.props.className || ''}
            id={'cont-' + this.props.id}
          >
            <label htmlFor={this.props.id}>{this.props.label}</label>
            <input
              {...this.props.attributes}
              type={this.props.type}
              className='form-control'
              id={this.props.id}
              name={this.props.id}
              value={this.props.value || ''}
              onChange={this.props.onChange}
            />
          </div>
        )
      )
    }
  }
}

class Checkbox extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      !this.props.isHidden && (
        <div
          className={'form-checkbox ' + this.props.className}
          id={'check-' + this.props.id}
        >
          <input
            {...this.props.attributes}
            type='checkbox'
            id={this.props.id}
            name={this.props.name || this.props.id}
            checked={!!this.props.checked}
            value={this.props.value}
            onChange={this.props.onChange}
          />
          <label htmlFor={this.props.id}>{this.props.label}</label>
        </div>
      )
    )
  }
}

class SelectField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      otherField: false,
      selectId: this.props.id
    }
  }

  handleOnChange(e) {
    if (e.target.value === 'otherSelection') {
      this.setState({ otherField: true, id: e.target.id, selectId: '' })
      e.target.setAttribute('oldId', e.target.id)
      e.target.removeAttribute('id')
    } else {
      let oldId = e.target.getAttribute('oldId')
      if (oldId) {
        this.setState({ otherField: false, id: null, selectId: oldId })
        e.target.removeAttribute('oldId')
      } else {
        this.setState({ otherField: false, id: null, selectId: e.target.id })
      }
    }
  }

  render() {
    let options = []
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
            id={this.state.selectId}
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

export { Field, SelectField, Checkbox }
