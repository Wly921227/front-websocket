require('./style.less')

import {Form, Icon, Input, Button} from 'antd'
const FormItem = Form.Item

const React = require('react')
const {observer} = require('mobx-react')

class LoginForm extends React.Component {

    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    render() {
        const {getFieldDecorator, getFieldsError} = this.props.form

        let {
            username,
            password,
            submit
        } = this.props

        return (
            <Form onSubmit={submit}>
                <FormItem>
                    {getFieldDecorator('username', {
                        initialValue: username,
                        trigger: 'onChange',
                        rules: [{required: true, message: '请输入用户名'}],
                        validateTrigger: 'onChange'
                    })(<Input prefix={<Icon type="user"/>}
                              placeholder="用户名"/>)}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        initialValue: password,
                        trigger: 'onChange',
                        rules: [{required: true, message: '请输入密码'}],
                        validateTrigger: 'onChange'
                    })(<Input prefix={<Icon type="lock"/>} type="password"
                              placeholder="密码"/>)}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        disabled={this.hasErrors(getFieldsError())}
                        htmlType="submit">
                        登录
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

let State = require('./state')

@observer
class Login extends React.Component {

    constructor(props) {
        super(props)
        this.WrappedHorizontalLoginForm = Form.create({
            onFieldsChange: (props, fields) => {
                for (let key in fields) {
                    this.state.appState[key] = fields[key].value
                }
            }
        })(LoginForm)
    }

    componentWillMount() {
        let state = new State()
        this.setState({
            appState: state
        })
    }

    loginSubmit() {
        this.state.appState.login()
    }

    render() {
        let {
            username,
            password
        } = this.state.appState

        let WrappedHorizontalLoginForm = this.WrappedHorizontalLoginForm

        return (<div className="login">
            <WrappedHorizontalLoginForm
                username={username}
                password={password}
                submit={this.loginSubmit.bind(this)}/>
        </div>)
    }
}

module.exports = Login