import React, { Component } from 'react';

class E404 extends Component {
    render() { 
        return (
            <div className="fof-cont">
                <center>
                        <div className="fof-title">
                                <h1 className="error-code">404</h1>
                            </div>
                            <div className="fof-desc">
                                The page you were looking for could not be found. <a href="/" className="404-home">Click here to go home</a>
                            </div>
                </center>
            </div>
        )
    }
}

class E401 extends Component {
    render() { 
        return (
            <div className="fof-cont">
                <center>
                        <div className="fof-title">
                                <h1 className="error-code">401</h1>
                            </div>
                            <div className="fof-desc">
                                You are unauthorized to view the requested page. <a href="/" className="404-home">Click here to go home</a>
                            </div>
                </center>
            </div>
        )
    }
}
 
export { E404, E401 };