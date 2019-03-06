import React, { Component, useState } from 'react'
import SearchModal from './SearchModal.jsx'

function Field(props) {
  const handleChange = (e) => {
    let id = e.target.name || e.target.id
    let val = {}
    val[id] = e.target.value
    if (props.setValue) props.setValue(val)
    else
      props.onChange({
        target: {
          id: e.target.id,
          value: e.target.value,
          name: e.target.name
        }
      })
  }

  const handleSelection = (e) => {
    props.onChange({
      target: {
        id: props.name,
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

  if (props.references) {
    return (
      <>
        <div
          className={'form-group ' + props.className}
          id={'cont-' + props.id}
        >
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
              onChange={handleChange.bind(this)}
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
          table={props.references}
          handleSelectKey={handleSelection.bind(this)}
        />
      </>
    )
  } else {
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
            onChange={props.onChange}
          />
        </div>
      )
    )
  }
}

function Checkbox(props) {
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

class SelectField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      otherField: false,
      selectId: props.id
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

export { Field, SelectField, Checkbox }
