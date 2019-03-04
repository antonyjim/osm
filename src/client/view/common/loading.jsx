import React, { Component } from 'react'

export class Loading extends Component {
  render() {
    return (
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    )
  }
}
