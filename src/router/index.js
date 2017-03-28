const React = require('react')
const ReactRouter = require('react-router')
const Router = ReactRouter.Router

let config = require('./router-config')

class Routers extends React.Component {

    render() {
        return <Router routes={config} history={ReactRouter.hashHistory}>
        </Router>
    }
}

module.exports = Routers