import React, { Component } from 'react';
import Can from './../common/rbac.jsx'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menus: window.THQ.menus || []
        }
        document.addEventListener('thq.receivedNav', () => {
            this.setState({menus: window.THQ.menus})
        })
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 mt-4">
                        <div className="card shadow mb-3">
                            <a href="#"><div className="card-header bg-goodyear"><h4 className="card-title text-light">Transactions</h4></div></a>
                            <div className="card-body bg-light">
                            <p>Find everything you need to finalize and manage deliveries or upload and download data using the TPP POS integration system.</p>
                            <h6>Start a delivery for:</h6>
                            <a className="btn btn-goodyear m-1" href="/delivery/?type=a">National Account</a>
                            <a className="btn btn-goodyear m-1" href="/delivery/?type=b">Local Government</a>
                            <a className="btn btn-goodyear m-1" href="/delivery/?type=d">State Government</a>
                            <Can role="Create-CA-Delivery">
                                <a className="btn btn-goodyear m-1" href="/delivery/?type=j">CA National Account</a>
                            </Can>
                            <Can role="View-More">
                                <a className="btn btn-goodyear m-1" href="#">Deliveries On Hold</a>
                                <a className="btn btn-goodyear m-1" href="#">Deliveries Sent</a>
                                <a className="btn btn-goodyear m-1" href="#">Roadside Service Calls</a>
                                <a className="btn btn-goodyear m-1" href="#">TPP Info</a>
                            </Can>
                            <button className="dropdown-toggle btn-goodyear btn text-light mt-1" href="#" id="dropdownacct" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More...</button>
                                <div className="dropdown-menu" aria-labelledby="dropdownacct">
                                    <a className="dropdown-item" href="/delivery/?type=c">C - Local Price Support</a>
                                    <a className="dropdown-item" href="/delivery/?type=e">E - Federal Government</a>
                                    <a className="dropdown-item" href="/delivery/?type=f">F - Purchase &amp; Resale</a>
                                    <a className="dropdown-item" href="/delivery/?type=h">H - Direct Dealer</a>
                                </div>
                            </div>
                        </div>
                        <Can if={this.state.menus.indexOf('Tires And Ordering') > -1}>
                            <div className="card shadow mb-3">
                                <a href="#"><div className="card-header bg-info shadow-sm"><h4 className="card-title text-light">Order Tires</h4></div></a>
                                <div className="card-body bg-light">
                                    <p>Search tire inventory and determine product availability using the Tire Finder. Plus, order tires to capitalize on the selling power of Goodyear®, Dunlop® and Kelly® tires.</p>
                                    <a className="btn btn-info m-1" href="#">Find Tires</a>
                                    <a className="btn btn-info m-1" href="#">Check Order Status</a>
                                    <a className="btn btn-info m-1" href="#">View Tire Price Book</a>
                                    <a className="btn btn-info m-1" href="#">Quotes</a>
                                </div>
                            </div>
                        </Can>
                        <Can if={this.state.menus.indexOf('Financial') > -1}>
                            <div className="card shadow mb-3">
                                <a href="#"><div className="card-header bg-secondary"><h4 className="card-title text-light">Financial Information</h4></div></a>
                                <div className="card-body bg-light">
                                <p>Check your account balance and remit payments. Retrieve invoices, statements, and Sales Status reports in Financials.</p>
                                <h6>Or view:</h6>
                                <a className="btn btn-secondary m-1" href="#">Invoices</a>
                                <a className="btn btn-secondary m-1" href="#">Account Payable Summary</a>
                                <a className="btn btn-secondary m-1" href="#">Account Claim Form</a>
                                <a className="btn btn-secondary m-1" href="#">Ultimate Purchaser Certificate</a>
                                </div>
                            </div>
                        </Can>
                        <Can if={this.state.menus.indexOf('Dealer Programs') > -1}>
                            <div className="card mb-3 mb-4">
                                <a href="#"><div className="card-header bg-warning"><h4 className="card-title text-dark">Dealer Programs</h4></div></a>
                                <div className="card-body bg-light">
                                <p>Access valuable information and documents designed to help you effectively manage your business while supporting National Accounts and Government Sales customers.</p>
                                <a className="btn btn-warning m-1" href="#">Service Price Book</a>
                                <a className="btn btn-warning m-1" href="#">Government Approval Info</a>
                                <a className="btn btn-warning m-1" href="#">View Online Orders</a>
                                </div>
                            </div>
                        </Can>
                    </div>
                    <div className="col-md-4">
                        <div className="card mt-4 h-50">
                            <div className="card-header bg-gold">
                                <h4 className="card-title">News</h4>
                            </div>
                            <div className="card-body bg-darkish">
                                <div id="news-carousel" className="carousel" data-ride="carousel">
                                    <div className="carousel-inner">
                                    
                                        <div className="carousel-item active">
                                            <a href="#"><img className="d-block w-100" src="public/images/tirehub.png" alt="TireHub News"/></a>
                                        </div>
                                        
                                        <div className="carousel-item">
                                            <a href="#"><img className="d-block w-100" src="public/images/logo.png" alt="THQ"/></a>
                                        </div>
                                        
                                        <div className="carousel-item">
                                        
                                        </div>
                                        
                                    </div>
                                    
                                    <a className="carousel-control-prev" href="#news-carousel" rol="button" data-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                    <a className="carousel-control-next" href="#news-carousel" role="button" data-slide="next">
                                        <span className="carousel-control-next-icon text-dark" aria-hidden="true"></span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}