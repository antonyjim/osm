import React, { Component } from 'react'

class Tabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            tabs: props.tabs
        }
    }

    onSelection(index) {
        this.setState({selectedIndex: index})
    }

    render() {
        let tabs = []
        let pages = []
        if (this.props.tabs) {
            let key = 0
            this.props.tabs.forEach(tab => {
                tabs.push(<Tab
                            key={"tab" + key} 
                            onClick={() => {this.onSelection(key)}}
                            selectedTab={"tab" + this.state.selectedIndex}
                            title={tab.title}
                            />)
                pages.push(<TabPage
                                key={"tabPage" + key}
                                component={tab.component}
                                selectedPage={"tabPage" + this.state.selectedIndex}
                            />)
            })
            return (
                <div>
                    <ul className="nav nav-tabs">
                        {tabs}
                    </ul>
                    <div className="p-5">
                        {pages}
                    </div>
                </div>
    
            )
        } else {
            return null
        }
    }
}

class Tab extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let classes = ''
        if (this.props.selectedTab === this.key) {
            classes = 'nav-link active'
        } else {
            classes = 'nav-link'
        }
        return (
            <li className={classes}>
                <a className="nav-link" href="#">{this.props.title}</a>
            </li>
        )
    }
}

class TabPage extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let className = ''
        if (this.props.selectedPage === this.key) {
            className = 'active'
        }
        return React.createElement(this.props.component, {className})
    }
}

export { Tabs }