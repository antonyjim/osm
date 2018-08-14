function enterReact(name) {
    const element = <h1>Hello, {name} </h1>;

    ReactDOM.render(
        element,
        document.getElementById('root')
    )
}

function enterBillTo(props) {
    return (
        <div className="row">
            <div className="col-xl"></div>
            <div className="col-md-8 pt-4 mx-auto pb-5">
                <div className="card">
                    <div className="card-header bg-success text-light">
                        <h4 className=""> </h4>
                    </div>


                </div>
            </div>
            <div className="col-xl"></div>
        </div>
    )
}