import React, { Component } from 'react'
import Table from './Table.jsx'

export default function TableList(props) {
  return (
    <div className="mt-3">
      <Table table={props.match.params.table} showSearch={true} />
    </div>
  )
}
