import React, { Component } from 'react'
import axios from "axios"
import "./Hot.less"
export default class Hot extends Component {
    constructor() {
        super()
        this.state = {
            list: []
        }
    }
    componentWillMount() {
        axios.get("/top/list?idx=1").then(res => {
            this.setState({
                list: res.data.playlist.tracks.slice(0, 20)
            })
        })
    }
    render() {
        return (
            <div className="Hot">
                <header>
                    <p>热歌榜</p>
                </header>
                <main>
                    <ul>
                        {
                            this.state.list.map((item, index) => {
                                return <li key={item.id}>
                                    <span className={(index+1)<4?"red":""}>{(index+1)<10?"0"+(index+1):(index+1)}</span>
                                    <div className="right">
                                        <div className="Recommend_song_Title">
                                            <p className="songname">{item.name}</p>
                                            <p className="singer">{item.ar[0].name} - {item.name}</p>
                                        </div>
                                        <i className="iconfont icon-bofang"></i>
                                    </div>
                                </li>

                            })
                        }
                    </ul>
                </main>
            </div>
        )
    }
}
