const {observable} = require('mobx')
const http = require('common/http')

class State {
    @observable username = ''
    @observable password = ''


}

module.exports = State
