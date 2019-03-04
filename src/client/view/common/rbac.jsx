import React, { Component } from 'react'

class Can extends Component {
  constructor(props) {
    super(props)
    this.state = {
      privs: window.THQ.user.privs || []
    }
    if (this.state.privs.length === 0) {
      document.addEventListener('thq.receivedNav', (e) => {
        this.setState({ privs: window.THQ.user.privs })
      })
    }
  }

  validate() {
    if (
      this.props.role &&
      this.state.privs &&
      this.state.privs.indexOf(this.props.role) > -1
    ) {
      return true
    } else if (this.props.if) {
      return true
    } else {
      return false
    }
  }

  render() {
    if (this.validate()) {
      return <>{this.props.children}</>
    } else {
      return <></>
    }
  }
}

export default Can
