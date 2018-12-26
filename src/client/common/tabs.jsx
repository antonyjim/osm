import React, { Component } from 'react'

class Tabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'tab0',
            tabs: props.tabs
        }
    }

    onSelection(tab, e) {
        console.log('Setting selectedTab to ', tab)
        this.setState({selectedTab: tab})
    }

    render() {
        console.log('Selected tab is ', this.state.selectedTab)
        let tabs = []
        let pages = []
        if (this.props.tabs) {
            let key = 0
            this.props.tabs.forEach(tab => {
                tabs.push(<Tab
                            key={"tab" + key} 
                            onClick={this.onSelection.bind(this, "tab" + key)}
                            selectedTab={this.state.selectedTab}
                            title={tab.title}
                            thisKey={"tab" + key}
                            />)
                pages.push(<TabPage
                                key={"pagetab" + key}
                                component={tab.component}
                                selectedPage={"pagetab" + this.state.selectedTab}
                                isHidden={!("page" + this.state.selectedTab === "pagetab" + key)}
                            />)
                key++
            })
            return (
                <div className="mt-1 ml-1">
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
        return (
            <li className="nav-item" id={this.props.thisKey} onClick={this.props.onClick}>
                <a 
                    className={this.props.selectedTab !== this.props.thisKey ? 'nav-link' : 'nav-link active'} 
                    href="#" 
                >
                    {this.props.title}
                </a>
            </li>
        )
    }
}

class TabPage extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let className = this.props.isHidden ? 'tab-page' : 'tab-page active'
        return React.createElement(this.props.component, {className})
    }
}

export { Tabs }