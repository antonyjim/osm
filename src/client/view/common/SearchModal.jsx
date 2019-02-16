import React, { Component } from 'react';
import Table from './Table.jsx'

export default class SearchModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            table: props.table
        }
    }

    handleClick(e) {
        console.log('Clicked')
        e.preventDefault()
        $('#' + this.state.table + '_search_modal_close').click()
        this.props.handleSelectKey(e)
    }

    render() {
        return (
            <div className="modal modal-xl fade" tabIndex="-1" role="dialog" id={this.state.table + '_search_modal'}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title">{this.props.title || 'Search'}</h5>
                        <button type="button" id={this.state.table + '_search_modal_close'} className="close" data-dismiss="modal" aria-label="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div className="modal-body">
                        <div className="row">
                            <div className="col">
                                <Table table={this.state.table + '_list'} onSelectKey={this.handleClick.bind(this)} hideActions={true} showSearch={true} />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}