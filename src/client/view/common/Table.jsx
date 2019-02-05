import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class TableRow extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let cells = [
      <td key={Math.floor(Math.random() * 10000)}>
        <input className="position-static" type="checkbox" value={this.props.cells && this.props.cells[this.props.id]} />
      </td>
    ]
    Object.keys(this.props.cols).map(col => {
      let val = this.props.cells[this.props.cols[col].boundTo]
      if (this.props.cols[col].id) {
        cells.push(
          <td key={Math.floor(Math.random() * 10000)}>
            <Link to={this.props.href + this.props.cells[this.props.id]}>
                {val || ''} 
            </Link>
          </td>
        )
      } else if (this.props.cols[col].type === 'Date') {
        cells.push(<td key={'row' + Math.floor(Math.random() * 10000)}>{new Date(val).toDateString() || ''}</td>)        
      } else if (this.props.cols[col].type === 'boolean') {
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

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cols: props.cols,
      rows: props.rows,
      handleClick: props.onClick,
      id: props.id,
      baseURL: props.baseURL,
      hideActions: props.hideActions || false
    }
  }
  
  render() {
    let headers = [
      <th scope="col" key={Math.floor(Math.random() * 10000)}>            
        <input className="position-static" type="checkbox"/>
      </th>
    ]
    if (this.state.cols) {
      let headerTitles = Object.keys(this.state.cols)
      for(let col of headerTitles) {
        headers.push(<th scope="col" data-bind={this.state.cols[col].boundTo} key={Math.floor(Math.random() * 10000)}>{col}</th>)
      }
    }

    let rows = []
    if (this.state.rows && this.state.rows.length > 0) {
      for(let row of this.state.rows) {
        rows.push(<TableRow key={Math.floor(Math.random() * 10000)} cells={row} cols={this.state.cols} onClick={this.state.handleClick} href={this.state.baseURL} id={this.state.id}/>)
      }
    }

    return (
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
              <div className="col-lg-4 col-md-5 col-sm-6">
                <button className="btn btn-secondary m-1">&lt;&lt;</button>
                <button className="btn btn-secondary m-1">&lt;</button>
                <span className="mx-1">
                  {'1 - ' + this.props.rows.length + ' of ' + this.props.count}
                </span>
                <button className="btn btn-secondary m-1">&gt;</button>
                <button className="btn btn-secondary m-1">&gt;&gt;</button>
              </div>
            }
          </div>
      </>
    )
  }
}

export default Table
