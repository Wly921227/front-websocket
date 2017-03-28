require('./style.less')
const React = require('react')

const http = require('common/http')

class App extends React.Component {

    componentWillMount() {
        http.get('/auth/getUser')
    }

    render() {
        return <div className="app">
            {this.props.children}
        </div>
    }
}

module.exports = App