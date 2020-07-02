import React, { Component } from 'react'
import action from "./flux/action"
export default class Left extends Component {
    constructor(){
        super()
        this.state={
            uname:'',
            content:'123'
        }
    }
    add() {
        action.add(this.state)
    }
    change(str,e){
        if(str==="uname"){
            this.setState({
                uname:e.target.value,
            })
        }else if(str==="content"){
            this.setState({
                content:e.target.value
            })
        }
    }
    render() {
        return (
            <div>
                <input type="text" value={this.state.uname} onChange={this.change.bind(this, "uname")} />
                <br />
                <input type="text" value={this.state.content} onChange={this.change.bind(this, "content")} />
                <br />
                <button onClick={this.add.bind(this)}>添加</button>
            </div>
        )
    }
}
