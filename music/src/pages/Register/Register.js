import React, { Component } from 'react'
import axios from "axios"
import { Form, Input, Button } from 'antd';
import "./Register.less"
export default class Register extends Component {
    constructor() {
        super()
        this.state = {
            uname: '',
            phone: null,
            password: '',
            code: null
        }
    }
    register() {
        console.log(this)
        this.setState({
            uname: this.uname.state.value,
            phone: parseInt(this.phone.state.value),
            password: this.password.props.value,
            code: parseInt(this.code.state.value)
        }, () => {
            axios.get(`/register/cellphone?phone=${this.state.phone}&password=${this.state.password}&captcha=${this.state.code}&nickname=${this.state.uname}`).then(res => {
                console.log(res)
            })
        })

    }
    change(e) {
        this.setState({
            phone: parseInt(e.target.value)
        })
    }
    pull() {
        if (!this.state.phone) {
            return alert(123)
        }
        axios.get(`/captcha/sent?phone=${this.state.phone}`).then(res => {
            console.log(res)
        })
    }
    render() {
        return (
            <div className="Register">
                <h1>注册</h1>
                <Form
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                        ]}
                    >
                        <Input ref={(uname)=>{
                            this.uname=uname
                        }} />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号码',
                            },
                        ]}
                    >
                        <Input ref={(phone) => {
                            this.phone = phone
                        }} onChange={this.change.bind(this)} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input.Password ref={(password)=>{
                            this.password=password
                        }} />
                    </Form.Item>
                    <Form.Item
                        label="Code"
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                    >
                        <Input className="code" onChange={this.change.bind(this)}  ref={(code)=>{
                            this.code=code
                        }}/>
                        <Button type="primary" className="get_code" onClick={this.pull.bind(this)}>
                            获取验证码
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={this.register.bind(this)}>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
