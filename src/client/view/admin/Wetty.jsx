import React, { Component } from 'react';
import Video from '../common/Video.jsx';

class Wetty extends Component {
    constructor(props) {
        super(props)
    }

    render() {
	const wettyHeight = $(window).innerHeight() - ( $('nav')[0].clientHeight + $('footer')[0].clientHeight ) 
        return (
            <div className="row">
                <div className="col">
                    <iframe src="/wetty" className="wetty" style={{height: wettyHeight + 'px'}}/>
                </div>
            </div>
        )
    }
}

export default Wetty
