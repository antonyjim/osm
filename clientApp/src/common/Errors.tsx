import * as React from 'react'
import { Component } from 'react'
interface IErrorBoundary {
  hasError: boolean
  error?: Error
}

function E404() {
  return (
    <div className='fof-cont mx-a'>
      <div className='fof-title'>
        <h1 className='error-code'>404</h1>
      </div>
      <div className='fof-desc'>
        The page you were looking for could not be found.{' '}
        <a href='/' className='404-home'>
          Click here to go home
        </a>
      </div>
    </div>
  )
}

function E401() {
  return (
    <div className='fof-cont mx-a'>
      <div className='fof-title'>
        <h1 className='error-code'>401</h1>
      </div>
      <div className='fof-desc'>
        You are unauthorized to view the requested page.{' '}
        <a href='/' className='404-home'>
          Click here to go home
        </a>
      </div>
    </div>
  )
}

class ErrorBoundary extends Component<{}, IErrorBoundary> {
  constructor(props: {}) {
    super(props)
    this.state = { hasError: false }
  }

  public componentDidCatch(err: Error, info: any) {
    this.setState({
      hasError: true,
      error: err
    })
    console.error(err, ' ', info)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className='fof-cont mx-a'>
          <div className='fof-title'>
            <h1 className='error-code'>Fuck</h1>
          </div>
          <br />
          <div className='fof-desc'>
            An unexpected error occurred.{' '}
            <a href='/' className='404-home'>
              Click here to go home
            </a>
            <br />
            <>{this.state.error && this.state.error.toString()}</>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default E404
export { E404, E401, ErrorBoundary }
