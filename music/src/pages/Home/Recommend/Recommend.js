import React, { Component } from 'react'
import "./Recommend.less"
import axios from "axios"
export default class Recommend extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            songList: []
        }
    }
    componentWillMount() {
        axios.all([this.getRecommend(), this.getNew()]).then(axios.spread((res1, res2) => {
            this.setState({
                list: res1.data.result,
                songList: res2.data.result
            })
        }))
    }
    getRecommend() {
        return axios.get(`/personalized?limit=6`)
    }
    getNew() {
        return axios.get(`/personalized/newsong`)
    }
    play(item) {
        this.props.history.push(`/Play?id=${item.id}&name=${item.name}&singer=${item.song.artists[0].name}`)
    }
    render() {
        return (
            <div className="Recommend">
                <div className="Recommend_MusicList">
                    <div className="Recommend_MusicList_Title">
                        推荐歌单
                    </div>
                    <div className="Recommend_MusicList_main">
                        <ul>
                            {
                                this.state.list.map(item => {
                                    return <li key={item.id}>
                                        <div className="img_container">
                                            <img src={item.picUrl} alt="" />
                                        </div>
                                        <p>{item.name.length <= 10 ? item.name : (item.name.slice(0, 15) + "...")}</p>
                                        <div className="play_num">
                                            <i className="iconfont icon-erji"></i>
                                            <span>{(item.playCount / 10000).toFixed(2) + "万"}</span>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="Recommend_song">
                    <div className="Recommend_MusicList_Title">
                        最新音乐
                    </div>
                    <ul>
                        {
                            this.state.songList.map(item => {
                                return <li key={item.id} onClick={this.play.bind(this, item)}>
                                    <div className="Recommend_song_Title">
                                        <p className="songname">{item.name}</p>
                                        <p className="singer">{item.song.artists[0].name} - {item.name}</p>
                                    </div>
                                    <i className="iconfont icon-bofang"></i>
                                </li>

                            })
                        }
                    </ul>
                </div>
            </div >
        )
    }
}
