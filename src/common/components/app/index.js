require('./style.less')
const React = require('react')

class App extends React.Component {

    render() {
        return <div className="app">
            {this.props.children}
        </div>
    }
}

module.exports = App