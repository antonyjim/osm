import React, { Component } from 'react';

class Wetty extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div class="col">
                <iframe src="/wetty" class="wetty" />
            </div>
        )
    }
}

export default Wetty