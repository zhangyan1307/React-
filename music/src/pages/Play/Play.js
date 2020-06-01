import React, { Component } from 'react'
import axios from "axios"
import "./Play.less"
import qs from "querystring"
export default class Play extends Component {
    constructor() {
        super()
        this.state = {
            Bgimg: {

            },
            imgurl: '',
            music: '',
            flag: false,//代表开始,
            TrueLyric: [],
            time: [],
            i:null,
            audio:{

            },
            arr:[]
        }
    }
    getDetail(id) {
        return axios.get(`/song/detail?ids=${id}`)
    }
    getLyric(id) {
        return axios.get(`/lyric?id=${id}`)
    }
    getUrl(id) {
        return axios.get(`/song/url?id=${id}`)
    }
    play() {
        console.log(this.audio.paused)
        if (this.audio.paused) {
            this.audio.play()
            this.setState({
                flag: true
            })
        } else {
            this.audio.pause()
            this.setState({
                flag: false
            })
        }
    }
    playNow() {
        //let duration=this.audio.duration
        let currentTime = this.audio.currentTime.toFixed(3)
        console.log(currentTime)
        let { time } = this.state
        let timer=time.map(item=>{
            return this.forData(item)
        })
        let i = timer.findIndex((item, index) => {
            return currentTime >= item && currentTime < timer[index + 1]
        })
        if(!this.state.TrueLyric[i]){
            i--
        }
        this.setState({
            audio:{
                marginTop:this.Height(i),
            },
            i
        })
    }
    Height(i){
        let height=0
        this.state.arr.slice(0,i).forEach(item=>{
            height+=item
        })
        return -height+"px"
    }
    forData(time) {
        let NewTime = time.split(":")
        let min = parseInt(NewTime[0] * 60)
        let Sec = parseFloat(NewTime[1])
        return min + Sec
    }
    componentWillMount() {
        let { id, singer, name } = qs.parse(this.props.location.search.slice(1))
        axios.all([this.getDetail(id), this.getLyric(id), this.getUrl(id)]).then(axios.spread((res1, res2, res3) => {
            let ly = res2.data.lrc.lyric.split(/\n/)
            let time = ly.map(item => {
                return item.slice(1, 10)
            })
            let TrueLyric = ly.map(item => {
                return item.slice(11)
            })
            this.setState({
                Bgimg: {
                    background: `url(${res1.data.songs[0].al.picUrl}) no-repeat center center`,
                    filter: 'blur(5px)',
                },
                imgurl: res1.data.songs[0].al.picUrl,
                music: res3.data.data[0].url,
                singer,
                name,
                TrueLyric,
                time,
            },()=>{
                let arr=[]
                this.music_list.childNodes.forEach(item=>{
                    arr.push(item.clientHeight)
                })
                this.setState({
                    arr
                })
            })
        }))
    }
    render() {
        let { Bgimg, imgurl, music, flag, singer, name, TrueLyric ,audio,i} = this.state
        return (
            <div className="Play">
                <div className="imgbox" style={Bgimg}></div>
                <div className={flag ? 'circle' : 'circle paused'}>
                    <div className="circle_pic">
                        <img src={imgurl} alt="" />
                    </div>
                </div>
                <div className="mask"></div>
                <img className="dic" src="//s3.music.126.net/mobile-new/img/needle-plus.png?994aa910ce3e4d242eb7076620b0e502=" alt="" />
                <audio src={music} onTimeUpdate={this.playNow.bind(this)} ref={(audio) => {
                    this.audio = audio
                }}></audio>
                <i className={flag ? 'iconfont icon-bofang opc' : 'iconfont icon-bofang'} onClick={this.play.bind(this)}></i>
                <div className="lyric">
                    <div className="lyric_song">
                        <span className="songname">{name} -</span>
                        <span className="singer"> {singer}</span>
                    </div>
                    <div className="lyric_main">
                        <ul className="Music_list" style={audio} ref={(music_list)=>{{
                            this.music_list=music_list
                        }}}>
                            {
                                TrueLyric.map((item, index) => {
                                    return <li key={index} className={i===index?'white':''}>{item}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
