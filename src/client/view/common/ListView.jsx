import React, { Component } from 'react'
import Table from './Table.jsx'

export default class TableList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableName: props.match.params.table
        }
    }

    render() {
        return (
            <div className="mt-3">
                <Table table={this.state.tableName} showSearch={true} />
            </div>
        )
    }
}