import React, { Component } from 'react';

export default class Pills extends Component {
    constructor(props) {
        super(props)
        this.state = {...props}
        props.handleLoad ? props.handleLoad() : void 0
    }

    render() {
        let pills = {...this.state.pills}
        let pillAs = []
        let pillBodies = []
        Object.keys(pills).map((pill, key) => {
            if (key === 0) { // First pill is active by default
                pillAs.push(<a key={key * Date.now() + (~~Math.random() * 1000)} className="nav-link active" id={pills[pill].id + '-tab'} data-toggle="pill" href={'#' + pills[pill].id} role="tab" aria-controls={pills[pill].id} aria-selected="true">{pills[pill].label}</a>)
                pillBodies.push(
                    <div key={key * Date.now()} className="tab-pane fade show active" id={pills[pill].id} role="tabpanel" aria-labelledby={pills[pill].id + '-tab'}>
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
                pillAs.push(<a key={key * Date.now() + (~~Math.random() * 1000)} className="nav-link" id={pills[pill].id + '-tab'} data-toggle="pill" href={'#' + pills[pill].id} role="tab" aria-controls={pills[pill].id} aria-selected="false">{pills[pill].label}</a>)
                pillBodies.push(
                    <div key={key * Date.now()} className="tab-pane fade" id={pills[pill].id} role="tabpanel" aria-labelledby={pills[pill].id + '-tab'}>
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
        return (
            <div className="container-fluid" style={{minHeight: '80vh'}}>
                <div className="row mt-4">
                    <div className="col-md-3 col-sm-12">
                        <div className="nav flex-column nav-pills" id="v-pills" role="tablist" aria-orientation="vertical">
                            {pillAs}
                        </div>
                    </div>
                    <div className="col-md-9 col-sm-12 mb-5">
                        <div className="tab-content" id="v-pill-tabContent">
                            {pillBodies}                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}