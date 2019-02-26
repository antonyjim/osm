import React, { Component } from 'react'


export default class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {
            href: props.src
        }
    }

    render() {
        return (
            <video controls width="100%">
                <source src={this.state.href} type="video/mp4" />
            </video>
        )
    }
}