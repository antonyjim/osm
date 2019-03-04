import React, { Component } from 'react'
import Table from '../common/Table.jsx'

export default class UserAdministration extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Table table="sys_user" />
  }
}
