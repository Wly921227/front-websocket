const {observable, action} = require('mobx')
const $http = require('common/http')

const ReactRouter = require('react-router')

class State {
    @observable username = ''
    @observable password = ''

    @action login() {
        $http.post({
            url: '/auth/login',
            data: {
                uname: this.username,
                upassword: this.password
            }
        }).then(data => {
            console.log(data)
            if (data.success) {
                ReactRouter.hashHistory.push('/')
            }
        })
    }
}

module.exports = State
