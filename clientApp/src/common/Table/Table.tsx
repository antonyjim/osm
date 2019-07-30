import * as React from 'react'
import { Component, MouseEventHandler } from 'react'
import API, { TowelRecord } from '../../lib/API'
import { E404 } from '../Errors'
import { TableRow } from './TableRow'
import { TableSearch } from './TableSearch'
import { IDictionary } from '../../types/server'
import { generateKeyHash, noop } from '../../lib/util'
import { Alert } from '../Alerts'

interface ITableColumn {
  [label: string]: {
    boundTo: string
    type: string
  }
}

interface ITableRow {
  [col: string]: {
    [col: string]: string | Date | boolean | number
  }
}

interface IActionItem {
  label: string
  handler: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

interface ITableProps {
  allCols?: ITableColumn
  cols?: ITableColumn | string[]
  table?: string
  args?: IDictionary<string>
  rows?: ITableRow[]
  onClick?: React.MouseEventHandler
  hideActions?: boolean
  limit?: number
  actions?: IActionItem[]
  showSearch?: boolean
  selectReference?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

interface ITableState {
  allCols: ITableColumn
  args?: string
  cols: ITableColumn | string[]
  rows: ITableRow[]
  handleClick: MouseEventHandler
  hideActions?: boolean
  table: string
  offset: number
  nextOffset: number
  from: number
  loaded: boolean
  search: string
  searchOn: string
  order: {
    by?: string
    dir?: 'ASC' | 'DESC'
  }
  shownColumns: string[]
  permissions: {
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
  }
}

/**
 * Show a list view from a table prop
 */
export class Table extends Component<ITableProps, any> /* ITableState */ {
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
  constructor(props: ITableProps) {
    super(props)
    let flatArgs = ''
    if (props.args) {
      Object.keys(props.args).map((arg) => {
        // @ts-ignore
        flatArgs += `${arg}=${props.args[arg]}`
      })
    }
    this.state = {
      allCols: {},
      error: null,
      cols: props.cols,
      rows: props.rows,
      handleClick: props.onClick,
      hideActions: props.hideActions || false,
      table: props.table,
      offset: 0,
      nextOffset: 25,
      from: 0,
      loaded: props.cols && props.rows ? false : true,
      search: '',
      searchOn: '',
      order: {},
      shownColumns: [],
      permissions: {},
      args: flatArgs,
      field: {
        limit: props.limit || 25
      }
    }
    if (!props.cols && !props.rows && props.table) this.getCols()
    // Retrieve the column information from /api/q/describe
    else if (props.cols && !props.rows && props.table) this.getCols()
  }

  /**
   * Fetches data from API if no rows prop is defined or pagination
   * is activated.
   * @param param0 Arguments and offset info
   */
  private getData({
    args = this.state.args,
    offset
  }: {
    args?: string
    offset?: number
  }) {
    API.get({
      path: '/api/q/' + this.state.table,
      query: {
        args,
        limit: this.state.field.limit,
        offset: 0,
        fields: Object.keys(this.state.cols).join(',') + ',' + this.state.id
      }
    })
      .then((response: any) => {
        if (
          response &&
          response.data &&
          response.data[this.state.table] &&
          response.meta
        ) {
          this.setState({
            args,
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
            args,
            rows: response.data[this.state.table],
            loaded: true,
            count: response.data[this.state.table].length
          })
        } else this.setState({ error: 'No data received' })
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          error: err,
          loaded: true
        })
      })
  }

  private handleSearchKeyDown(column: any, query: any) {
    const args = `${column}=lk|${query}`
    this.getData({ args })
  }

  //   private handleHeaderClick(e) {}

  private getCols() {
    let stateToBe: any = {}
    API.get({ path: `/api/describe/${this.state.table}` })
      .then((response: any) => {
        if (response.columns) {
          const allowedCols: any = {}
          const fieldSearchSelections: JSX.Element[] = []
          let hasSelectedInitialField: boolean = false
          const fields = { ...this.state.field }

          Object.keys(response.columns).map((col, key) => {
            const colObj = response.columns[col]
            if (
              (response.defaultFields &&
                response.defaultFields.indexOf(col) > -1) ||
              (Array.isArray(this.props.cols) &&
                this.props.cols.indexOf(col) > -1) ||
              response.primaryKey === col
            ) {
              allowedCols[col] = colObj
            }

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

          /*
            If the primary key is not listed as a default field,
            then  force it in to the 
          */

          stateToBe = {
            cols: allowedCols,
            id: response.primaryKey,
            fieldSearchSelections,
            field: fields,
            allCols: response.columns,
            permissions: response.permissions
          }
        } else {
          if (response.errors) {
            throw new Error(response.errors[0].message)
          } else {
            console.error(
              new Error(
                'Failed for some reason, but no error was in ther response'
              )
            )
          }
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
      .then((response: any) => {
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
        this.setState({ ...this.state, error: err, loaded: true })
      })
  }

  private handleChange(e: React.ChangeEvent) {
    if (e.target instanceof HTMLInputElement) {
      const field = { ...this.state.field }
      field[e.target.id] = e.target.value
      this.setState({ field })
    }
  }

  private handleSetCount(e: React.ChangeEvent) {
    if (e.target instanceof HTMLInputElement) {
      let rows = this.state.rows
      const field = { ...this.state.field }
      field.limit = e.target.value
      if (e.target.value < this.state.field.limit) {
        rows = rows.slice(0, e.target.value)
        this.setState({ field, rows })
      } else {
        this.setState({ field })
        this.getData({})
      }
    }
  }

  private updateRowById(id: string, col: string, val: boolean) {
    let updated = false
    let count = 0
    for (const row of this.state.rows) {
      const thisId = row[this.state.id]
      if (thisId === id) {
        if (col in row) {
          const futureRows: IDictionary<
            boolean | string | number
          >[] = Array.from(this.state.rows)
          futureRows[count][col] = val
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

  /**
   * Allows records in a table to be updated inline with the table.
   * @param e Change event
   * @expiramental
   */
  private handleInlineUpdate(e: React.ChangeEvent) {
    if (e.target instanceof HTMLInputElement) {
      const updateId = e.target.value
      const key = e.target.name
      const checked = e.target.checked
      const body: any = {}
      body[key] = checked
      new TowelRecord(this.state.table)
        .update(updateId, body)
        .then((res: any) => {
          if (res && res.status === 204) {
            console.log('Updated')
          }
          this.updateRowById(updateId, key, checked)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  /**
   * Fetches data from:
   *  - The next page
   *  - The previous page
   *  - The first page
   *  - The last page
   * Based on the `data-page` attribute present on the button.
   * @param e Click event from pagination arrows
   */
  private handlePage(e: React.MouseEvent) {
    e.preventDefault()
    if (e.target instanceof HTMLElement) {
      const dir = e.target.getAttribute('data-page') || '1'
      // const dir = parseInt(val, 10) // Get the pagination value from the element
      let nextOffset = 0

      if (dir === '-2') {
        // First page
        nextOffset = 0
      } else if (dir === '-1') {
        // Previous page
        nextOffset = this.state.from - this.state.field.limit
      } else if (dir === '2') {
        // Last page
        nextOffset = this.state.count - this.state.field.limit
      } else {
        // Next page
        nextOffset = this.state.from + this.state.field.limit
      }

      API.get({
        path: '/api/q/' + this.state.table,
        query: {
          args: this.state.args, // Information from search
          offset: nextOffset, // Skip over what's on the page now
          limit: this.state.field.limit, // How many to fetch
          fields: Object.keys(this.state.cols).join(',') // Get only what we need
        }
      })
        .then((response: any) => {
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
  }

  public componentDidUpdate(prevProps: any, prevState: any) {
    if (prevProps.table !== this.props.table) {
      console.log('Received new table')
      this.setState({ table: this.props.table }, () => {
        this.getCols()
      })
    } else {
      console.log(`Table ${prevProps.table} is the same as ${this.props.table}`)
    }
  }

  public render(): JSX.Element {
    const headers: JSX.Element[] = []
    const nextPage =
      this.state.nextOffset >= this.state.count ? { disabled: true } : false
    const prevPage =
      this.state.offset - this.state.field.limit <= 0
        ? { disabled: true }
        : false

    if (!this.state.hideActions) {
      headers.push(
        <th scope='col' key={generateKeyHash()}>
          <input className='position-static' type='checkbox' />
        </th>
      )
    }
    if (this.state.cols) {
      for (const col in this.state.cols) {
        if (
          col === this.state.id &&
          this.state.id !== this.state.displayField
        ) {
          continue
        }
        headers.push(
          <th scope='col' data-bind={col} key={generateKeyHash()}>
            {this.state.cols[col].label}
          </th>
        )
      }
    }

    const rows: JSX.Element[] = []
    if (this.state.rows && this.state.rows.length > 0) {
      for (const row of this.state.rows) {
        rows.push(
          <TableRow
            key={generateKeyHash()}
            showSelect={!this.state.hideActions}
            cells={row}
            cols={this.state.cols}
            id={this.state.id}
            onSelectKey={this.props.selectReference}
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
            {this.state.error && (
              <Alert alertType='danger' message={this.state.error} />
            )}
            {this.props.showSearch && (
              <TableSearch
                onSearchKeyDown={this.handleSearchKeyDown.bind(this)}
                onSetCount={this.handleSetCount.bind(this)}
                permissions={this.state.permissions}
                options={this.state.fieldSearchSelections}
                table={this.state.table}
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
                      {rows.length === 0 && this.state.loaded && (
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
