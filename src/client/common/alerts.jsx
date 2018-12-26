import React, { Component } from 'react';

class Alert extends Component {
    render() { 
        return (
            <div className={'alert alert-dismissible fade show alert-' + this.props.alertType} role="alert">
                {this.props.message}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
}
 
export default Alert;