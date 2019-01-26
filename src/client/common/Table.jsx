import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class TableRow extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let cells = [
      <td key={Math.floor(Math.random() * 1000)}>
        <input className="position-static" type="checkbox" value={this.props.cells && this.props.cells[this.props.id]} />
      </td>
    ]
    Object.keys(this.props.cols).map(col => {
      if (this.props.cols[col].id) {
        cells.push(
          <td key={Math.floor(Math.random() * 1000)}>
            <Link to={this.props.href + this.props.cells[this.props.id]}>
                {this.props.cells[this.props.cols[col].boundTo] || ''} 
            </Link>
          </td>
        )
      } else if (this.props.cols[col].type === 'date') {
        cells.push(<td key={Math.floor(Math.random() * 1000)}>{new Date(parseInt(this.props.cells[this.props.cols[col].boundTo])).toDateString() || ''}</td>)        
      } else if (this.props.cols[col].type === 'boolean') {
        cells.push(<td key={Math.floor(Math.random() * 1000)}>{this.props.cells[this.props.cols[col].boundTo] === true && '×' || ''}</td>)        
      } else {
        cells.push(<td key={Math.floor(Math.random() * 1000)}>{this.props.cells[this.props.cols[col].boundTo] || ''}</td>)
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
      baseURL: props.baseURL
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
    if (this.state.rows) {
      for(let row of this.state.rows) {
        rows.push(<TableRow key={Math.floor(Math.random() * 1000)} cells={row} cols={this.state.cols} onClick={this.state.handleClick} href={this.state.baseURL} id={this.state.id}/>)
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
          <div className="col mx-3">
            <select className="form-control">
              <option value="">Action on selected rows</option>
              {this.props.actions !== undefined && this.props.actions}
            </select>
          </div>
          <div className="col"/>
          <div className="col-lg-4 col-md-5 col-sm-6">
            <button className="btn btn-secondary m-1">&lt;&lt;</button>
            <button className="btn btn-secondary m-1">&lt;</button>
            <span className="mx-1">
              {'1 - ' + this.props.rows.length + ' of ' + this.props.count}
            </span>
            <button className="btn btn-secondary m-1">&gt;</button>
            <button className="btn btn-secondary m-1">&gt;&gt;</button>
          </div>
        </div>
      </>
    )
  }
}

export default Table
