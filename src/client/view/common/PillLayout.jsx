import React, { Component } from 'react';
import Alert from './alerts.jsx'

export default class Pills extends Component {
    constructor(props) {
        super(props)
        this.state = {...props}
        if (!props.pills) {
            throw new Error('Pills must be provided as a prop to the <Pills /> Component.')
        }
        props.handleLoad ? props.handleLoad() : void 0
        this.handlePillBodies()
    }

    handlePillBodies() {
        let pills = {...this.state.pills}
        let pillAs = []
        let pillBodies = []
        Object.keys(pills).map((pill, key) => {
            if (key === 0) { // First pill is active by default
                pillAs.push(<a key={/* key * Date.now() + (~~Math.random() * 10000)*/pills[pill].id + '-tab'} className="nav-link active" id={pills[pill].id + '-tab'} data-toggle="pill" href={'#' + pills[pill].id} role="tab" aria-controls={pills[pill].id} aria-selected="true">{pills[pill].label}</a>)
                pillBodies.push(
                    <div key={pills[pill].id} className="tab-pane fade show active" id={pills[pill].id} role="tabpanel" aria-labelledby={pills[pill].id + '-tab'}>
                        <div className="row">
                            <div className="col"/>
                                <div className="col-lg-10 col-md-11 col-sm-12 pt-4">
                                    {pills[pill].body}                               
                                </div>
                            <div className="col"/>
                        </div>
                    </div>
                )
            } else {
                pillAs.push(<a key={/* key * Date.now() + (~~Math.random() * 1000)*/pills[pill].id + '-tab'} className="nav-link" id={pills[pill].id + '-tab'} data-toggle="pill" href={'#' + pills[pill].id} role="tab" aria-controls={pills[pill].id} aria-selected="false">{pills[pill].label}</a>)
                pillBodies.push(
                    <div key={pills[pill].id} className="tab-pane fade" id={pills[pill].id} role="tabpanel" aria-labelledby={pills[pill].id + '-tab'}>
                        <div className="row">
                            <div className="col"/>
                                <div className="col-lg-10 col-md-11 col-sm-12 pt-4">
                                    {pills[pill].body} 
                                </div>
                            <div className="col"/>
                        </div>
                    </div>
                )
            }
        })
        this.state.pillBodies = pillBodies
        this.state.pillAs = pillAs
    }

    /**
     * Provide a simple, reusable interface to trigger error alerts
     * across all components that utilize the bill layout
     * @param {Error} err Error message or raw error
     */
    handleErrorMessage(err) {
        this.setState({errorMessage: err.message})
    }

    /**
     * Provide a simple, reusable interface to trigger alerts in the pill layout.
     * @param {string} message Alert to be displayed as a blue info message
     */
    handleStatusMessage(message) {
        this.setState({statusMessage: message})
    }

    render() {
        return (
            <div className="container-fluid" style={{minHeight: '80vh'}}>
                <div className="row mt-4">
                    <div className="col-md-3 col-sm-12">
                        <div className="nav flex-column nav-pills" id="v-pills" role="tablist" aria-orientation="vertical">
                            {this.state.pillAs}
                        </div> 
                    </div>
                    <div className="col-md-9 col-sm-12 mb-5">
                        <div className="tab-content" id="v-pill-tabContent">
                            {this.state.errorMessage && <Alert alertType="danger" message={this.state.error} /> }
                            {this.state.statusMessage && <Alert alertType="info" message={this.state.statusMessage} /> }
                            {this.state.pillBodies}                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}