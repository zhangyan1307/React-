import React, { Component } from 'react'
import {NavLink} from "react-router-dom"
import MapRouter from "../../Routes/MapRouter"
export default class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="header">
                    <div className="red">
                        <span>网易云音乐</span>
                    </div>
                    <div className="nav">
                        <NavLink to="/Home/recommend">推荐音乐</NavLink>
                        <NavLink to="/Home/hotmusic">热歌榜</NavLink>
                        <NavLink to="/Home/search">搜索</NavLink>
                    </div>
                </div>
                <div className="main">
                        <MapRouter router={this.props.router}></MapRouter>
                </div>
            </div>
        )
    }
}
