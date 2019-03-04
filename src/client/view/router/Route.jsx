import React, { Component } from 'react'

export class Route extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: props.path,
      component: props.component
    }
  }

  render() {
    return <>{}</>
  }
}
