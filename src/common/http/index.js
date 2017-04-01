const http = require('superagent')
const nocache = require('superagent-no-cache')
const prefix = require('superagent-prefix')('/api')

const _ = require('lodash')
const utils = require('../utils')
const urls = require('./urls')
const adapter = require('./adapter')

module.exports = {
    query (options) {
        let opt = {}
        if (typeof options !== 'object') {
            opt = {
                url: options,
                data: '',
                type: 'GET'
            }
        } else {
            opt = _.assign({
                url: '',
                data: '',
                type: 'GET'
            }, options)
        }
        let url = opt.url.split('/')
        let page = url[0]
        let todo = url[1]
        let uri = (urls[page] && urls[page][todo]) ? urls[page][todo] : opt.url
        let func = (adapter[page] && adapter[page][todo]) ?
            adapter[page][todo] : (data) => {
                return data
            }
        let request
        if (opt.type === 'GET') {
            request = http.get(uri + opt.data)
                .set('Accept', 'application/json')
        } else if (opt.type === 'POST') {
            request = http.post(uri).send(opt.data)
                .set('Content-Type', 'application/json')
        }

        request.use(prefix).use(nocache).timeout({
            response: 30000  // Wait 5 seconds for the server to start sending,
        }).then(res => {
            if (res.status === 200) {
                if (res.body.code === 200) {
                    return func(res.body)
                } else {
                    // TODO 异常提示处理
                }
            } else {
                // TODO 异常提示处理
            }
        })

        return {
            then (func) {
                request.then(res => {
                    func(res.body)
                })
            },
            catch (func) {
                request.catch(res => {
                    func(res.body)
                })
            },
            finally (func) {
                request.finally(res => {
                    func(res.body)
                })
            }
        }
    },
    get (options) {
        let opt = {}
        if (typeof options !== 'object') {
            opt = {
                url: options,
                data: '',
                type: 'GET'
            }
        } else {
            opt = _.assign(options, {
                type: 'GET',
            })
        }
        if (opt.data) {
            opt.data = utils.dataParams(opt.data)
        }
        return this.query(opt)
    },
    post (options) {
        let opt = {}
        if (typeof options !== 'object') {
            opt = {
                url: options,
                data: {},
                type: 'GET'
            }
        } else {
            opt = _.assign({
                data: {}
            }, options, {
                type: 'POST'
            })
        }
        return this.query(opt)
    }
}