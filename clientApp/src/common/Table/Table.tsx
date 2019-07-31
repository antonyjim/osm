import * as React from 'react'
import { Component, MouseEventHandler } from 'react'
import API, { TowelRecord } from '../../lib/API'
import { E404 } from '../Errors'
import { TableRow } from './TableRow'
import { TableSearch } from './TableSearch'
import { IDictionary, IStatusMessage } from '../../types/server'
import { generateKeyHash, noop } from '../../lib/util'
import { Alert } from '../Alerts'
import { FormValue, ITableField } from '../../types/forms'
import { ITablePermissions } from '../../typings'
import { IAPIGETResponse, ITableDescriptionResponse } from '../../types/api'

export interface ITableColumn {
  [label: string]: {
    boundTo: string
    type: string
  }
}

export interface IActionItem {
  label: string
  handler: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

type ITableRow = IDictionary<FormValue>[]

export interface ITableProps {
  actions?: IActionItem[]
  args?: IDictionary<string>
  cols?: IDictionary<ITableField> | ITableColumn | string[]
  hideActions?: boolean
  hidePagination?: boolean
  limit?: number
  onClick?: React.MouseEventHandler
  table: string
  rows?: ITableRow[]
  selectReference?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  showSearch?: boolean
}

interface ITableState {
  allCols: ITableColumn
  args?: string
  cols?: IDictionary<ITableField> | ITableColumn | string[]
  count: number
  displayField?: string
  errors: IStatusMessage[]
  field: {
    limit: number
  }
  from: number
  handleClick?: MouseEventHandler
  hideActions?: boolean
  id?: string
  loaded: boolean
  nextOffset: number
  offset: number
  order: {
    by?: string
    dir?: 'ASC' | 'DESC'
  }
  permissions: ITablePermissions
  rows: ITableRow[]
  search: string
  searchOn: string
  shownColumns: string[]
  table: string
  warnings: IStatusMessage[]
}

/**
 * Show a list view from a table prop
 */
export class Table extends Component<ITableProps, ITableState> {
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
      args: flatArgs,
      allCols: {},
      cols: props.cols,
      errors: [],
      field: {
        limit: props.limit || 25
      },
      count: 0,
      from: 0,
      handleClick: props.onClick,
      hideActions: props.hideActions || false,
      nextOffset: 25,
      loaded: props.cols && props.rows ? false : true,
      offset: 0,
      order: {},
      permissions: {
        edit: false, // Set edit to false by default
        create: false, // Set create to false by default
        read: true, // Set read to true by default
        delete: false // Set delete to false by default
      },
      rows: props.rows || [],
      searchOn: '',
      search: '',
      shownColumns: [],
      table: props.table,
      warnings: []
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
        fields: Object.keys(this.state.cols as ITableColumn).join(',')
      }
    })
      .then((response: any) => {
        /*
          Display warnings in alert container
        */
        const warnings: IStatusMessage[] = []
        if (response.warnings.length > 0) {
          warnings.push(...response.warnings)
        }

        if (
          response &&
          response.data &&
          response.data[this.state.table] &&
          response.meta
        ) {
          /*
            Check for metadata on response, if found we will set
            the pagination state fields.
          */
          this.setState({
            args,
            rows: response.data[this.state.table],
            loaded: true,
            count: response.meta.count,
            offset: response.meta.to,
            from: response.meta.from,
            nextOffset: response.meta.to,
            warnings
          })
        } else if (
          response &&
          response.data &&
          response.data[this.state.table]
        ) {
          /*
            This shouldn't ever happen, but if for some reason
            we don't get any metadata then just set the data
          */
          this.setState({
            args,
            rows: response.data[this.state.table],
            loaded: true,
            count: response.data[this.state.table].length,
            warnings
          })
        } else {
          /*
            When we don't receive any data then there was an issue with the request
          */
          this.setState({
            ...this.state,
            errors: [{ error: true, message: 'No data received' }],
            warnings
          })
        }
      })
      .catch((err: string) => {
        this.setState({
          ...this.state,
          errors: [
            {
              error: true,
              message: err
            }
          ],
          loaded: true
        })
      })
  }

  /**
   * Submits query to the server based on phrase in search box and
   * column selected from dropdown in <TableSearch />
   * @param column Database column name to query
   * @param query Query phrase
   */
  private handleSearchKeyDown(column: string, query: string) {
    let operator: string = 'lk'
    if (query.startsWith('"') && query.endsWith('"')) {
      /*
        Perform a literal search instead of wildcard
      */
      operator = 'eq'
      query = query.slice(1, -1)
    }

    const args = `${column}=${operator}|${query}`
    this.getData({ args })
  }

  //   private handleHeaderClick(e) {} // Eventually sort by column

  /**
   * Get column data and default fields to display.
   * Eventually will also fetch user preferences.
   */
  private getCols() {
    let stateToBe: any = {}
    API.get({ path: `/api/describe/${this.state.table}` })
      .then((response: ITableDescriptionResponse) => {
        if (response.columns) {
          const allowedCols: any = {}
          const fields = { ...this.state.field }
          const displayedColumns: string[] =
            response.userPreferences || (response.defaultFields as string[])

          /**
           * Loop through each column in the response.
           */
          Object.keys(response.columns).forEach((col) => {
            const colObj = response.columns[col]
            if (
              /*
                First we check to see if the column is included
                in the list of displayed fields. If so then we will
                add it to the list of displayed columns.
              */
              (displayedColumns && displayedColumns.indexOf(col) > -1) ||
              /*
                Then we check if the column was passed as a prop.
              */
              (Array.isArray(this.props.cols) &&
                this.props.cols.indexOf(col) > -1) ||
              /*
                Lastly check for the primary key,
                if we are working with the primary key
                then we need to add it to the list of allowed
                columns. If we don't then a lot of shit will break.
              */
              response.primaryKey === col
            ) {
              allowedCols[col] = colObj
            }
          })

          /*
            I wish I knew what was happening here
           */
          allowedCols[response.displayField].display = this.state.table.slice(
            0,
            -5
          )

          stateToBe = {
            cols: allowedCols,
            id: response.primaryKey,
            field: fields,
            allCols: response.columns,
            permissions: response.permissions
          }
        } else {
          const fallbackError = {
            error: true,
            message: 'Failed for some reason, but no error was in the response'
          }

          this.setState({
            ...this.state,
            errors: response.errors || fallbackError,
            loaded: true
          })
        }

        /*
          After we figure out what columns to show and whatnot,
          we need to actually get some data.
         
          Eventually these two requests can be combined into one,
          but for now this works exceptionally well.
        */
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
        } else
          this.setState({
            errors: [{ message: 'No data received', error: true }],
            loaded: true
          })
      })
      .catch((err) => {
        console.error(err)
        this.setState({
          ...this.state,
          errors: [{ message: err, error: true }],
          loaded: true
        })
      })
  }

  private handleChange(e: React.ChangeEvent) {
    if (e.target instanceof HTMLInputElement) {
      const field = { ...this.state.field }
      field[e.target.id] = e.target.value
      this.setState({ field })
    }
  }

  /**
   * Set the number of rows retrieved
   * @param e Change event from results/page select
   */
  private handleSetCount(e: React.ChangeEvent) {
    if (e.target instanceof HTMLInputElement) {
      let rows: ITableRow[] = [...this.state.rows]
      const field = { ...this.state.field }
      field.limit = parseInt(e.target.value, 10)
      if (field.limit < this.state.field.limit) {
        rows = rows.slice(0, field.limit)
        this.setState({ field, rows })
      } else {
        this.setState({ field })
        this.getData({})
      }
    }
  }

  /**
   * Updates a specific row in a table
   * @param id sys_id of row to be updated
   * @param col Which column is being updated
   * @param val What the new value is
   */
  private updateRowById(id: string, col: string, val: boolean): boolean {
    if (Array.isArray(this.state.rows) && id) {
      let updated: boolean = false
      let count: number = 0
      for (const row of this.state.rows) {
        const thisId: string = row[id].id as string
        if (thisId === id) {
          if (col in row) {
            const futureRows: ITableRow[] = [...this.state.rows]
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
    } else {
      // If we don't have any data or id is undefined,
      // return false to indicate no update was made.
      return false
    }
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
          fields: Object.keys(this.state.cols as ITableColumn).join(',') // Get only what we need
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
          } else
            this.setState({
              errors: [{ message: 'No data received', error: true }]
            })
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  /**
   * Listen for changes to the table and arguments on route change.
   * @param prevProps
   * @param prevState
   */
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
            id={this.state.id || 'sys_id'}
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
            {this.props.showSearch && this.state.cols && (
              <TableSearch
                onSearchKeyDown={this.handleSearchKeyDown.bind(this)}
                onSetCount={this.handleSetCount.bind(this)}
                permissions={this.state.permissions}
                cols={this.state.cols as IDictionary<ITableField>}
                table={this.state.table}
              />
            )}
            <div className='row'>
              <div className='col' />
              <div className='col-10'>
                {this.state.errors.map((err: IStatusMessage) => {
                  return <Alert alertType='danger' message={err.message} />
                })}
                {this.state.warnings.map((warning: IStatusMessage) => {
                  return (
                    <Alert
                      message={warning.message}
                      alertType='warning'
                      dismissable={true}
                    />
                  )
                })}
              </div>
              <div className='col' />
            </div>
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
              {!this.props.hidePagination && (
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
