const React = require('react')
const ReactRouter = require('react-router')
const Router = ReactRouter.Router

const getUser = require('common/user')

let config = require('./router-config')

class Routers extends React.Component {

    render() {
        getUser.then(data => {
            if (data.success) {
                ReactRouter.hashHistory.push('/')
            } else {
                ReactRouter.hashHistory.push('/login')
            }
        })

        return <Router routes={config} history={ReactRouter.hashHistory}>
        </Router>
    }
}

module.exports = Routers