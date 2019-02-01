import React, { Component } from 'react';

function push(pathname) {
    window.history.pushState({}, '', pathname)
}

class Link extends Component {
    constructor(props) {
        super(props)
    }

    handleClick(e) {
        const newTab = e.metaKey || e.ctrlKey
        const externalLink = this.props.href.startsWith('http')

        if (!newTab && !externalLink) {
            e.preventDefault()
            window.history.pushState(this.props.href)
        }
    }

    render() {
        const opts = {
            href = this.props.href
        }
        if (this.props.href.startsWith('http')) {
            opts['target'] = '_blank'
            opts['rel'] = 'noopener noreferrer'
        }
        return (
            <a {...opts} onClick={this.handleClick}>
                {this.props.children}
            </a>
        )
    }
}
 
export default Link;