import React, { Component } from 'react';
import API from './../lib/API.js'
import { Field } from './../common/forms.jsx'

export default class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stats: null,
            loaded: false
        }
        this.getStats()
    }

    getStats() {
        API.get({path: '/stats'})
        .then(stats => {
            console.log(stats)
            this.setState({stats, loaded: true})
        })
        .catch(e => {
            console.error(e)
        })
    }

    render() {
        return (
            <>
                {this.state.loaded && 
                    <div className="row m-5">
                        <div className="col" />
                        <div className="col-lg-6 col-md-8 col-sm-11">
                            <h2>Server Status</h2>
                            <hr/>
                            <Field id="cpuCount" value={this.state.stats.os.host} label="Node Hostname" type="text" attributes={{readOnly: 'readonly'}}/>
                            <Field value={this.state.stats.os.OS} label="Operating System" type="text" attributes={{readOnly: 'readonly'}}/>
                            <Field value={this.state.stats.os.cpuCount} label="CPU Count" type="text" attributes={{readOnly: 'readonly'}}/>
                            <Field id="architecture" value={this.state.stats.os.architecture} label="Architecture" type="text" attributes={{readOnly: 'readonly'}} />
                            <Field value={~~(this.state.stats.os.openMem / 1e+6)} label={'Available Memory (MB) (' + ~~(((~~(this.state.stats.os.openMem / 1e+6) / (~~(this.state.stats.os.totMem / 1e+6)))) * 100) + '%)'} type="text" attributes={{readOnly: 'readonly'}} />
                            <Field id="openMem" value={~~(this.state.stats.os.totMem / 1e+6)} label="Total Memory (MB)" type="text" attributes={{readOnly: 'readonly'}} />
                            <Field value={this.state.stats.db.NODE_ENV} label="Node Environment" type="text" attributes={{readOnly: 'readonly'}}/>

                            <h2>Database Status</h2>
                            <hr/>
                            <Field value={this.state.stats.db.version[0].VERSION} label="Version" type="text" attributes={{readOnly: 'readonly'}}/>
                            <Field value={this.state.stats.db.poolLimit} label="Pool Limit" type="text" attributes={{readOnly: 'readonly'}}/>
                            <Field value={this.state.stats.db.dbName} label="Database Name" type="text" attributes={{readOnly: 'readonly'}}/>
        
                        </div>
                        <div className="col" />
                    </div>
                }
            </>
        )
    }
}