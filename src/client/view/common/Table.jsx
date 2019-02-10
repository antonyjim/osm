import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import API from '../lib/API';

class TableRow extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let cells = []
    if (this.props.showSelect) {
      cells.push(
        <td key={Math.floor(Math.random() * 10000)}>
          <input className="position-static" type="checkbox" value={this.props.cells && this.props.cells[this.props.id]} />
        </td>
      )
    }
    Object.keys(this.props.cols).map(col => {
      let val = this.props.cells[this.props.cols[col].boundTo]
      let type = this.props.cols[col].type
      if (this.props.cols[col].id || this.props.cols[col].linkable) {
        cells.push(
          <td key={Math.floor(Math.random() * 10000)}>
            <Link to={this.props.cols[col].baseURL + this.props.cells[this.props.id]}>
                {val || ''} 
            </Link>
          </td>
        )
      } else if (type && type.toLowerCase() === 'date') {
        cells.push(<td key={'row' + Math.floor(Math.random() * 10000)}>{new Date(val).toDateString() || ''}</td>)        
      } else if (type && type.toLowerCase() === 'boolean') {
        cells.push(<td key={Math.floor(Math.random() * 10000)} style={{textAlign: 'center', fontSize: '20px'}}>{val === true || val === 1  && '×' || ''}</td>)        
      } else {
        cells.push(<td key={Math.floor(Math.random() * 10000)}>{val || ''}</td>)
      }
    })
    return (
      <tr>
        {cells}
      </tr>
    )
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
      cols: props.cols,
      rows: props.rows,
      handleClick: props.onClick,
      id: props.id,
      baseURL: props.baseURL,
      hideActions: props.hideActions || false,
      table: props.table,
      offset: 0,
      nextOffset: props.perPage || 20,
      from: 0,
      perPage: props.perPage || 20,
      loaded: false
    }
    if (this.props.args) {
      let flatArgs = ''
      Object.keys(this.props.args).map(arg => {
        flatArgs += `${arg}=${this.props.args[arg]}`
      })
      this.state.args = flatArgs
    }
    if (!props.cols && !props.rows && props.table) this.getCols() // Retrieve the column information from /api/q/describe
    else if (props.cols && !props.rows && props.table) this.getCols(props.cols)
    else this.state.loaded = true // Show data with the provided rows and column headers
  }
  
  getCols() {
    API.GET({path: '/api/q/describe/' + this.state.table})
    .then(response => {
      if (response.cols && this.props.cols) {
        let allowedCols = {}
        Object.keys(response.cols).map(col => {
          if (this.props.cols.includes(response.cols[col].boundTo) || response.id === response.cols[col].boundTo) {
            allowedCols[col] = response.cols[col]
          }
        })
        this.setState({cols: allowedCols, id: response.id})
      } else if (response.cols) {
        this.setState({cols: response.cols, id: response.id})
      }
      return API.GET({path: '/api/q/' + this.state.table, query: {
        args: this.state.args,
        limit: this.state.perPage
      }})
    })
    .then(response => {
      if (response && response.data && response.data[this.state.table] && response.meta) {
        this.setState(
          {
            rows: response.data[this.state.table], 
            loaded: true, 
            count: response.meta.count,
            offset: response.meta.to,
            from: response.meta.from,
            nextOffset: response.meta.to
          }
        )
      }
      else if (response && response.data && response.data[this.state.table]) {
        this.setState(
          {
            rows: response.data[this.state.table], 
            loaded: true,
            count: response.data[this.state.table].length
          }
        )
      }
      else this.setState({error: 'No data received'})
    })
    .catch(err => {
      console.error(err)
    })
  }

  handlePage(e) {
    let dir = parseInt(e.target.getAttribute('data-page')) // Get the pagination value from the element
    let offset = this.state.offset
    console.log(dir)
    if (dir === -2) { // First page
      offset = 0
    } else if (dir === -1) { // Previous page
      offset = this.state.prevOffset
    } else if (dir === 2) { // Last page
      offset = this.state.count - this.state.perPage
    } else { // Next page
      offset = offset + this.state.perPage
    }

    console.log({
      args: this.state.args,
      offset: offset,
      limit: this.state.perPage
    })

    API.GET({path: '/api/q/' + this.state.table, query: {
      args: this.state.args,
      offset: offset,
      limit: this.state.perPage
    }})
    .then(response => {
      if (response && response.data && response.data[this.state.table] && response.meta.count) {
        this.setState(
          {
            rows: response.data[this.state.table], 
            loaded: true, 
            count: response.meta.count,
            offset: response.meta.to,
            from: response.meta.from,
            nextOffset: response.meta.to
          }
        )
      }
      else if (response && response.data && response.data[this.state.table]) {
        this.setState(
          {
            rows: response.data[this.state.table], 
            loaded: true,
            count: response.data[this.state.table].length
          }
        )
      }
      else this.setState({error: 'No data received'})
    })
    .catch(err => {
      console.error(err)
    })
  }

  render() {
    let headers = []
    let nextPage = this.state.nextOffset >= this.state.count ? ' disabled' : ''
    let prevPage = this.state.offset - this.state.perPage <= 0 ? ' disabled': ''

    if (!this.state.hideActions) {
      headers.push(      
        <th scope="col" key={Math.floor(Math.random() * 10000)}>            
          <input className="position-static" type="checkbox"/>
        </th>
      )
    }
    if (this.state.cols) {
      let headerTitles = Object.keys(this.state.cols)
      for(let col of headerTitles) {
        headers.push(<th scope="col" data-bind={this.state.cols[col].boundTo} key={Math.floor(Math.random() * 10000)}>{col}</th>)
      }
    }

    let rows = []
    if (this.state.rows && this.state.rows.length > 0) {
      for(let row of this.state.rows) {
        rows.push(<TableRow key={Math.floor(Math.random() * 10000)} showSelect={!this.state.hideActions} cells={row} cols={this.state.cols} onClick={this.state.handleClick} href={this.state.baseURL} id={this.state.id}/>)
      }
    }

    return (
      <>
      {this.state.loaded && 
            <>
              <div className="row">
                <div className="col">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead className="thead-dark">
                        <tr>
                          {headers}
                        </tr>
                      </thead>
                    <tbody>
                      {rows.length > 0 && rows}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
    
              <div className="row">
                {!this.state.hideActions && 
                  <div className="col mx-3">
                    <select className="form-control">
                      <option value="">Action on selected rows</option>
                      {this.props.actions !== undefined && this.props.actions}
                    </select>
                  </div>
                }
                <div className="col"/>
                {!this.state.hidePagination && 
                  <div className="col-lg-6 col-md-10 col-sm-12">
                    <button className={"btn btn-secondary m-1" + prevPage} data-page="-2" onClick={this.handlePage.bind(this)}>&laquo;</button>
                    <button className={"btn btn-secondary m-1" + prevPage} data-page="-1" onClick={this.handlePage.bind(this)}>&lsaquo;</button>
                    <span className="mx-1">
                      {this.state.from + ' - ' + this.state.nextOffset + ' of ' + this.state.count}
                    </span>
                    <button className={"btn btn-secondary m-1" + nextPage} data-page="1" onClick={this.handlePage.bind(this)}>&rsaquo;</button>
                    <button className={"btn btn-secondary m-1" + nextPage} data-page="2" onClick={this.handlePage.bind(this)}>&raquo;</button>
                  </div>
                }
              </div>
          </>
        }
      </>
    )
  }
}
