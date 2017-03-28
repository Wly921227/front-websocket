require('./style.less')

import {Form, Icon, Input} from 'antd'
const FormItem = Form.Item

const React = require('react')
const {observer} = require('mobx-react')

let State = require('./state')

@observer
class LoginForm extends React.Component {

    componentWillMount() {
        let state = new State()
        this.setState({
            appState: state
        })
    }

    inputUserName(event) {
        this.state.appState.username = event.target.value
    }

    inputPassword(event) {
        this.state.appState.password = event.target.value
    }

    loginSubmit() {
        console.log('submit')
    }

    render() {
        const {getFieldDecorator} = this.props.form
        let {
            username,
            password
        } = this.state.appState

        return (
            <Form onSubmit={this.loginSubmit.bind(this)}>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入用户名'}]
                    })(<Input prefix={<Icon type="user"/>}
                              placeholder="用户名"
                              onInput={this.inputUserName.bind(this)}/>)}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码'}]
                    })(<Input prefix={<Icon type="lock"/>}
                              placeholder="密码"
                              onInput={this.inputPassword.bind(this)}/>)}
                </FormItem>
            </Form>
        )
    }
}

const WrappedHorizontalLoginForm = Form.create()(LoginForm)

class Login extends React.Component {

    render() {
        return (<div className="login">
            <WrappedHorizontalLoginForm/>
        </div>)
    }
}

module.exports = Login