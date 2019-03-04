import React, { Component } from 'react'

export default class Link extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onClick(e) {
    e.preventDefault()
  }

  render() {
    return <a href={this.props.to}>{this.props.children}</a>
  }
}
