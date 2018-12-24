import React, { Component } from 'react';

class Dashboard extends Component {
    render() { 
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 mt-4">
                        <div className="card shadow">
                            <a href="#"><div className="card-header bg-goodyear"><h4 className="card-title text-light">Transactions</h4></div></a>
                            <div className="card-body bg-light">
                            <p>Find everything you need to finalize and manage deliveries or upload and download data using the TPP POS integration system.</p>
                            <h6>Start a delivery for:</h6>
                            <a className="btn btn-goodyear m-1" href="/delivery/?type=a">National Account</a>
                            <a className="btn btn-goodyear m-1" href="/delivery/?type=b">Local Government</a>
                            <a className="btn btn-goodyear m-1" href="/delivery/?type=d">State Government</a>
                            <a className="btn btn-goodyear m-1" href="/delivery/?type=j">CA National Account</a>
                            <button className="dropdown-toggle btn-goodyear btn text-light mt-1" href="#" id="dropdownacct" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More...</button>
                                <div className="dropdown-menu" aria-labelledby="dropdownacct">
                                    <a className="dropdown-item" href="/delivery/?type=c">C - Local Price Support</a>
                                    <a className="dropdown-item" href="/delivery/?type=e">E - Federal Government</a>
                                    <a className="dropdown-item" href="/delivery/?type=f">F - Purchase &amp; Resale</a>
                                    <a className="dropdown-item" href="/delivery/?type=h">H - Direct Dealer</a>
                                </div>
                            
                            <h6 className="mt-3">Or view: </h6>
                            
                            <a className="btn btn-goodyear m-1" href="#">Deliveries On Hold</a>
                            <a className="btn btn-goodyear m-1" href="#">Deliveries Sent</a>
                            <a className="btn btn-goodyear m-1" href="#">Roadside Service Calls</a>
                            <a className="btn btn-goodyear m-1" href="#">TPP Info</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
 
export { Dashboard }