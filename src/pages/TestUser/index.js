const React = require('react')
const Router = require('react-router')

const $http = require('common/http')

class Test extends React.Component {

    componentWillMount() {
        this.setState({
            users: []
        })
        $http.get({
            url: '/auth/getUser',
        }).then(data => {
            console.log(data)
        })
    }

    login() {
        $http.post({
            url: '/auth/login',
            data: {
                uname: 'admin',
                upassword: 'admin'
            }
        }).then(data => {
            console.log(data)
            Router.hashHistory.push('/')
        })
    }

    render() {
        return <div className="users">
            <button onClick={this.login.bind(this)}>点我</button>
        </div>
    }

}

module.exports = Test
