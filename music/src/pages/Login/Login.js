import React, { Component } from 'react'
import axios from 'axios'
import { Form, Input, Button } from 'antd';
import "./Login.less"
export default class Login extends Component {
    constructor(){
        super()
        this.state={
            phone:null,
            password:''
        }
    }
    login(){
        this.setState({
            phone:parseInt(this.phone.props.value),
            password:this.password.props.value
        },()=>{
            axios.get(`/login/cellphone?phone=${this.state.phone}&password=${this.state.password}`).then(res=>{
                console.log(res)
                if(res.data.code!==200){
                    return alert("账号密码错误")
                }
                window.localStorage.setItem("tooken",res.data.token)
                window.localStorage.setItem("id",res.data.account.id)
                this.props.history.push("/Home/recommend")
            })
        })
    }
    render() {
        return (
            <div className="Login">
                <h1>登入</h1>
                <Form
    >
      <Form.Item
        label="电话号码"
        name="username"
        rules={[{ required: true, message: '请输入电话号码!' }]}
      >
        <Input ref={(phone)=>{
            this.phone=phone
        }} />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password ref={(password)=>{
            this.password=password
        }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={this.login.bind(this)}>
          登入
        </Button>
      </Form.Item>
    </Form>
            </div>
        )
    }
}
