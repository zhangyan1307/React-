import "lib-flexible"
import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter} from "react-router-dom"
import "antd/dist/antd.css"
import "./App.css"
import "./fonts/iconfont.css"
import MapRouter from "./Routes/MapRouter"
import router from "./Routes/Router"
ReactDOM.render((
    <BrowserRouter>
        <MapRouter router={router}></MapRouter>
    </BrowserRouter>
),document.getElementById("root"))
