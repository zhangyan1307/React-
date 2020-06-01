import React, { Component } from 'react'
import Store from "./flux/Store"
import action from './flux/action'
export default class Right extends Component {
    constructor(){
        super()
        this.state={
            list:Store.getList()
        }
        this.getList=this.getList.bind(this)
    }
    componentWillMount(){
        Store.addListener(this.getList)
    }
    getList(){
        this.setState({
            list:Store.getList()
        })
    }
    remove(i){
        action.remove(i)
    }
    render() {
        return (
            <div>
                <ul>
                    {Store.getList().map((item,index) => {
                        return <li key={index}>
                            <p>{item.uname}说:</p>
                            <p>{item.content}</p>
                            <button onClick={this.remove.bind(this,index)}>删除</button>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}
