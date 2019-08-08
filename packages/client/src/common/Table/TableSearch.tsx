import * as React from 'react'
import { Component } from 'react'
import { ITablePermissions } from '../../typings'
import { Can } from '../Can'
import { Link } from 'react-router-dom'
import { generateKeyHash } from '../../lib/util'
import { ITableColumn } from './Table'
import { ITableField } from '../../types/forms'
import { IDictionary } from '../../types/server'

interface ITableSearchProps {
  onSearchKeyDown: (selectedColumn: string, searchString: string) => void
  permissions: ITablePermissions
  onSetCount: React.ChangeEventHandler
  table: string
  cols: IDictionary<ITableField>
  limit?: number
}

interface ITableSearchState {
  limit?: number
  options?: any
  table: string
  searchQ: string
  col: string
}

export class TableSearch extends Component<
  ITableSearchProps,
  ITableSearchState
> {
  constructor(props: ITableSearchProps) {
    super(props)
    const fieldSearchSelections: JSX.Element[] = []
    let initialValue: string

    if (typeof props.cols === 'object') {
      initialValue = Object.keys(props.cols)[0]
    } else {
      initialValue = ''
    }

    this.state = {
      limit: props.limit || 25,
      table: props.table,
      searchQ: '',
      col: initialValue
    }
  }

  private handleChange(e) {
    const state = { ...this.state }
    state[e.target.id] = e.target.value
    this.setState(state)
  }

  private handleKeyDown(e) {
    if (e.keyCode && e.keyCode === 13) {
      this.props.onSearchKeyDown(this.state.col, this.state.searchQ)
    }
  }

  public render() {
    return (
      <div className='row'>
        <div className='col'>
          <div className='form-group mr-a'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <select
                  className='custom-select'
                  onChange={this.handleChange.bind(this)}
                  value={this.state.col}
                  id='col'
                >
                  {Object.keys(this.props.cols).map((column) => {
                    const colObj: ITableField = this.props.cols[column]
                    let searchColVal: string = column
                    if (colObj.type === 'string') {
                      if (colObj.reference) searchColVal += '_display'
                      return (
                        <option key={generateKeyHash()} value={searchColVal}>
                          {colObj.label}
                        </option>
                      )
                    }
                  })}
                </select>
              </div>
              <input
                id='searchQ'
                className='form-control'
                onChange={this.handleChange.bind(this)}
                value={this.state.searchQ}
                onKeyDown={this.handleKeyDown.bind(this)}
                type='text'
              />
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='form-group'>
            <div className='input-group'>
              <select
                className='custom-select'
                onChange={this.props.onSetCount}
                value={this.state.limit}
                id='limit'
              >
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={35}>35</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </select>
              <div className='input-group-append'>
                <label className='input-group-text' htmlFor='limit'>
                  Results / Page
                </label>
              </div>
            </div>
          </div>
        </div>
        <Can if={this.props.permissions && this.props.permissions.create}>
          <div className='col-1'>
            <Link
              className='btn btn-primary'
              to={`/f/${this.props.table.slice(0, -5)}/new`}
            >
              New
            </Link>
          </div>
        </Can>
      </div>
    )
  }
}
