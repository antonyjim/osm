import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API, { TowelRecord } from '../lib/API.js'
import { E404 } from './errors.jsx'
import Can from './rbac.jsx'
import { Checkbox } from './forms.jsx'

class TableSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      limit: props.limit || 25,
      options: props.options,
      table: props.table,
      searchQ: '',
      col: ''
    }

    if (props.options && props.options.length > 0) {
      this.state.col = props.options[0].props.value
    }
  }

  handleChange(e) {
    let state = { ...this.state }
    state[e.target.id] = e.target.value
    this.setState(state)
  }

  handleKeyDown(e) {
    if (e.keyCode && e.keyCode === 13) {
      this.props.onSearchKeyDown(this.state.col, this.state.searchQ)
    }
  }

  render() {
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
                  {this.state.options}
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
              to={`/f/${this.state.table.slice(0, -5)}/new`}
            >
              New
            </Link>
          </div>
        </Can>
      </div>
    )
  }
}

class TableRow extends Component {
  constructor(props) {
    super(props)
  }

  handleValReturn(e) {
    e.preventDefault()
  }

  render() {
    let cells = []
    if (this.props.showSelect) {
      cells.push(
        <td key={Math.floor(Math.random() * 10000)} className='align-middle'>
          <input
            className='position-static'
            type='checkbox'
            value={this.props.cells && this.props.cells[this.props.id]}
          />
        </td>
      )
    }
    Object.keys(this.props.cols).map((col) => {
      if (col === this.props.id) return false
      let thisCol = this.props.cols[col]
      let val = this.props.cells[col]
      let type = thisCol.type
      if (thisCol.reference || thisCol.display) {
        if (this.props.onSelectKey && thisCol.display) {
          cells.push(
            <td key={Math.floor(Math.random() * 1000000)}>
              <a
                href='#'
                data-key={this.props.cells[this.props.id]}
                onClick={this.props.onSelectKey}
                className='align-middle'
              >
                {val || ''}
              </a>
            </td>
          )
        } else if (this.props.onSelectKey && thisCol.reference) {
          cells.push(
            <td
              key={Math.floor(Math.random() * 1000000)}
              className='align-middle'
            >
              {val || ''}
            </td>
          )
        } else if (thisCol.display) {
          cells.push(
            <td key={Math.floor(Math.random() * 1000000)}>
              <Link
                to={`/f/${thisCol.display}/${this.props.cells[this.props.id] ||
                  '#'}`}
                className='align-middle'
              >
                {val || ''}
              </Link>
            </td>
          )
        } else {
          let refCol = this.props.cols[col + '_display']
          let refTab = refCol ? refCol.tableRef : '#'
          cells.push(
            <td key={Math.floor(Math.random() * 1000000)}>
              <Link
                to={`/f/${refTab}/${val || '#'}`}
                title={this.props.cols[col].label}
                className='align-middle'
              >
                {this.props.cells[col + '_display'] || ''}
              </Link>
            </td>
          )
        }
      } else if (type && type.toLowerCase() === 'date') {
        cells.push(
          <td
            key={'table-data-' + ~~(Math.random() * 100000)}
            className='align-middle'
          >
            {new Date(val).toDateString() || ''}
          </td>
        )
      } else if (type && type.toLowerCase() === 'boolean') {
        if (this.props.permissions && this.props.permissions.edit) {
          cells.push(
            <td
              key={'table-data-' + ~~(Math.random() * 100000)}
              style={{ textAlign: 'center', fontSize: '20px' }}
            >
              <Checkbox
                id={col + ~~(Math.random() * 100000)}
                name={col}
                value={this.props.cells[this.props.id]}
                onChange={this.props.handleInlineUpdate}
                label=''
                title={this.props.cols[col].label}
                checked={val === true || val === 1}
              />
            </td>
          )
        } else {
          cells.push(
            <td
              key={'table-data-' + ~~(Math.random() * 100000)}
              style={{ textAlign: 'center', fontSize: '20px' }}
              className='align-middle'
            >
              {val === true || (val === 1 && '×') || ''}
            </td>
          )
        }
      } else {
        cells.push(
          <td
            key={'table-data-' + ~~(Math.random() * 100000)}
            className='align-middle'
          >
            {typeof val === 'string' ? val : ''}
          </td>
        )
      }
    })
    return <tr>{cells}</tr>
  }
}

/**
 * Show a list view from a table prop
 */
export default class Table extends Component {
  /**
   * The options that can be passed to <Table/> are:
   * cols: an object describing the column headers
   * rows: an array of data
   * handleClick: <depreciated> handle to be passed to the ID column
   * baseURL: where to redirect users upon clicking the ID column
   * hideActions: Hide the actions select element and the checkboxes
   * table: the name of the database table
   * @param {object} props
   */
  constructor(props) {
    super(props)
    this.state = {
      allCols: {},
      cols: props.cols,
      rows: props.rows,
      handleClick: props.onClick,
      hideActions: props.hideActions || false,
      table: props.table,
      offset: 0,
      nextOffset: 25,
      from: 0,
      loaded: false,
      search: '',
      searchOn: '',
      order: {},
      field: {
        col: '',
        searchQ: '',
        limit: 25
      },
      shownColumns: [],
      permissions: {}
    }
    if (this.props.args) {
      let flatArgs = ''
      Object.keys(this.props.args).map((arg) => {
        flatArgs += `${arg}=${this.props.args[arg]}`
      })
      this.state.args = flatArgs
    }
    if (!props.cols && !props.rows && props.table) this.getCols()
    // Retrieve the column information from /api/q/describe
    else if (props.cols && !props.rows && props.table) this.getCols(props.cols)
    else this.state.loaded = true // Show data with the provided rows and column headers
  }

  getData({ args, offset }) {
    API.get({
      path: '/api/q/' + this.state.table,
      query: {
        args: args,
        limit: this.state.field.limit,
        offset: 0,
        fields: Object.keys(this.state.cols).join(',') + ',' + this.state.id
      }
    })
      .then((response) => {
        if (
          response &&
          response.data &&
          response.data[this.state.table] &&
          response.meta
        ) {
          this.setState({
            args: args,
            rows: response.data[this.state.table],
            loaded: true,
            count: response.meta.count,
            offset: response.meta.to,
            from: response.meta.from,
            nextOffset: response.meta.to
          })
        } else if (
          response &&
          response.data &&
          response.data[this.state.table]
        ) {
          this.setState({
            args: args,
            rows: response.data[this.state.table],
            loaded: true,
            count: response.data[this.state.table].length
          })
        } else this.setState({ error: 'No data received' })
      })
      .catch((err) => {
        this.props.handleErrorMessage
          ? this.props.handleErrorMessage(err)
          : console.error(err)
      })
  }

  handleSearchKeyDown(column, query) {
    let args = `${column}=lk|${query}`
    this.getData({ args })
  }

  handleHeaderClick(e) {}

  getCols() {
    let stateToBe = {}
    API.get({ path: `/api/describe/${this.state.table}` })
      .then((response) => {
        if (response.columns) {
          const allowedCols = {}
          const fieldSearchSelections = []
          let hasSelectedInitialField = false
          let fields = { ...this.state.field }

          Object.keys(response.columns).map((col, key) => {
            let colObj = response.columns[col]
            if (
              (response.defaultFields &&
                response.defaultFields.indexOf(col) > -1) ||
              (this.props.cols && this.props.cols.indexOf(col) > -1) ||
              response.primaryKey === col
            )
              allowedCols[col] = colObj

            if (colObj.type === 'string' && col !== this.state.id) {
              let searchColVal = col
              if (colObj.reference) searchColVal += '_display'
              fieldSearchSelections.push(
                <option key={'search-col' + key} value={searchColVal}>
                  {colObj.label}
                </option>
              )
              if (!hasSelectedInitialField) fields.col = colObj.boundTo
            }
          })
          allowedCols[response.displayField].display = this.state.table.slice(
            0,
            -5
          )

          stateToBe = {
            cols: allowedCols,
            id: response.primaryKey,
            fieldSearchSelections,
            field: fields,
            allCols: response.columns,
            permissions: response.permissions
          }
        } else {
          throw new Error(response.errors[0].message)
        }
        return API.get({
          path: '/api/q/' + this.state.table,
          query: {
            args: this.state.args,
            limit: this.state.field.limit,
            fields: Object.keys(stateToBe.cols).join(',')
          }
        })
      })
      .then((response) => {
        if (
          response &&
          response.data &&
          response.data[this.state.table] &&
          response.meta
        ) {
          this.setState({
            ...stateToBe,
            rows: response.data[this.state.table],
            loaded: true,
            count: response.meta.count,
            offset: response.meta.to,
            from: response.meta.from,
            nextOffset: response.meta.to
          })
        } else if (
          response &&
          response.data &&
          response.data[this.state.table]
        ) {
          this.setState({
            ...stateToBe,
            rows: response.data[this.state.table],
            loaded: true,
            count: response.data[this.state.table].length
          })
        } else this.setState({ error: 'No data received' })
      })
      .catch((err) => {
        console.error(err)
        this.props.handleErrorMessage
          ? this.props.handleErrorMessage(err)
          : this.setState({ error: err, loaded: true })
      })
  }

  handleChange(e) {
    let field = { ...this.state.field }
    field[e.target.id] = e.target.value
    this.setState({ field })
  }

  handleSetCount(e) {
    let rows = this.state.rows
    let field = { ...this.state.field }
    field.limit = e.target.value
    if (e.target.value < this.state.field.limit) {
      rows = rows.slice(0, e.target.value)
      this.setState({ field, rows })
    } else {
      this.setState({ field })
      this.getData()
    }
  }

  updateRowById(id, col, val) {
    let updated = false
    let count = 0
    for (const row of this.state.rows) {
      const thisId = row[this.state.id]
      if (thisId === id) {
        if (col in row) {
          let futureRows = Array.from(this.state.rows)
          row[col] = val
          futureRows.splice(count, 1, row)
          this.setState({ rows: futureRows })
          updated = true
          break
        }
      }
      count++
    }
    return updated
  }

  handleInlineUpdate(e) {
    const updateId = e.target.value
    const key = e.target.name
    const checked = e.target.checked
    const body = {}
    body[key] = checked
    new TowelRecord(this.state.table)
      .update(updateId, body)
      .then((res) => {
        if (res.okay()) {
          console.log('Updated')
        }
        this.updateRowById(updateId, key, checked)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  handlePage(e) {
    let dir = parseInt(e.target.getAttribute('data-page')) // Get the pagination value from the element
    let nextOffset = 0
    console.log(dir)
    if (dir === -2) {
      // First page
      nextOffset = 0
    } else if (dir === -1) {
      // Previous page
      nextOffset = this.state.from - this.state.field.limit
    } else if (dir === 2) {
      // Last page
      nextOffset = this.state.count - this.state.field.limit
    } else {
      // Next page
      nextOffset = this.state.field.limit
    }

    API.get({
      path: '/api/q/' + this.state.table,
      query: {
        args: this.state.args,
        offset: nextOffset,
        limit: this.state.field.limit,
        fields: Object.keys(this.state.cols).join(',')
      }
    })
      .then((response) => {
        if (
          response &&
          response.data &&
          response.data[this.state.table] &&
          response.meta.count
        ) {
          this.setState({
            rows: response.data[this.state.table],
            loaded: true,
            count: response.meta.count,
            offset: response.meta.to,
            from: response.meta.from,
            nextOffset: response.meta.to
          })
        } else if (
          response &&
          response.data &&
          response.data[this.state.table]
        ) {
          this.setState({
            rows: response.data[this.state.table],
            loaded: true,
            count: response.data[this.state.table].length
          })
        } else this.setState({ error: 'No data received' })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.table !== this.props.table) {
      console.log('Received new table')
      this.setState({ table: this.props.table }, () => {
        this.getCols()
      })
    } else {
      console.log(`Table ${prevProps.table} is the same as ${this.props.table}`)
    }
  }

  render() {
    let headers = []
    let nextPage =
      this.state.nextOffset >= this.state.count ? { disabled: 'disabled' } : ''
    let prevPage =
      this.state.offset - this.state.field.limit <= 0
        ? { disabled: 'disabled' }
        : ''
    let fieldSearchSelections = []

    if (this.state.error) {
      return <E404 />
    }

    if (!this.state.hideActions) {
      headers.push(
        <th scope='col' key={'header-' + ~~(Math.random() * 10000)}>
          <input className='position-static' type='checkbox' />
        </th>
      )
    }
    if (this.state.cols) {
      for (const col in this.state.cols) {
        if (col === this.state.id && this.state.id !== this.state.displayField)
          continue
        headers.push(
          <th
            scope='col'
            data-bind={col}
            key={'col-' + Math.floor(Math.random() * 10000)}
          >
            {this.state.cols[col].label}
          </th>
        )
      }
    }

    let rows = []
    if (this.state.rows && this.state.rows.length > 0) {
      for (let row of this.state.rows) {
        rows.push(
          <TableRow
            key={'tablerow-' + ~~(Math.random() * 100000)}
            showSelect={!this.state.hideActions}
            cells={row}
            cols={this.state.cols}
            table={this.state.table}
            id={this.state.id}
            onSelectKey={this.props.onSelectKey}
            handleInlineUpdate={this.handleInlineUpdate.bind(this)}
            permissions={this.state.permissions}
          />
        )
      }
    }

    return (
      <>
        {this.state.loaded && (
          <>
            {this.props.showSearch && (
              <TableSearch
                table={this.state.table}
                options={this.state.fieldSearchSelections}
                onSearchKeyDown={this.handleSearchKeyDown.bind(this)}
                onSetCount={this.handleSetCount.bind(this)}
                permissions={this.state.permissions}
              />
            )}
            <div className='row'>
              <div className='col'>
                <div className='table-responsive'>
                  <table className='table table-striped table-hover table-sm'>
                    <thead className='thead-dark'>
                      <tr>{headers}</tr>
                    </thead>
                    <tbody>
                      {rows.length === 0 && (
                        <tr>
                          <td
                            colSpan={headers.length}
                            style={{ textAlign: 'center' }}
                          >
                            No Results Found
                          </td>
                        </tr>
                      )}
                      {rows.length > 0 && rows}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className='row'>
              {!this.state.hideActions && (
                <div className='col mx-3'>
                  <select className='form-control'>
                    <option value=''>Action on selected rows</option>
                    {this.props.actions !== undefined && this.props.actions}
                  </select>
                </div>
              )}
              <div className='col' />
              {!this.state.hidePagination && (
                <div className='col-lg-6 col-md-10 col-sm-12'>
                  <button
                    {...prevPage}
                    className={'btn btn-secondary m-1'}
                    data-page='-2'
                    onClick={this.handlePage.bind(this)}
                  >
                    &laquo;
                  </button>
                  <button
                    {...prevPage}
                    className={'btn btn-secondary m-1'}
                    data-page='-1'
                    onClick={this.handlePage.bind(this)}
                  >
                    &lsaquo;
                  </button>
                  <span className='mx-1'>
                    {this.state.from +
                      ' - ' +
                      this.state.nextOffset +
                      ' of ' +
                      this.state.count}
                  </span>
                  <button
                    {...nextPage}
                    className={'btn btn-secondary m-1'}
                    data-page='1'
                    onClick={this.handlePage.bind(this)}
                  >
                    &rsaquo;
                  </button>
                  <button
                    {...nextPage}
                    className={'btn btn-secondary m-1'}
                    data-page='2'
                    onClick={this.handlePage.bind(this)}
                  >
                    &raquo;
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </>
    )
  }
}
