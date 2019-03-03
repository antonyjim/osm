import React, { Component } from 'react'

export export class Router extends Component {
    constructor(props) {
        super(props)
        this.state = {
            routes: {},
            default: ''
        }
    }

    render() {
        let childrenWithListner = []
        this.props.children.map(child => {
          let Child = React.cloneElement(child)
          childrenWithListner.push(
            <Child registerListener />
          )
        })
        return (
          <>
            {this.props.children}
          </>
        )
    }
}