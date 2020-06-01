import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
export default class MapRouter extends Component {
    render() {
        return (
            <Switch>
                {
                    this.props.router.map(item => {
                        return item.path ?
                            <Route key={item.path} path={item.path} render={(props) => {
                                return item.shile ?
                                    (window.localStorage.getItem("tooken") ? <item.component {...props} router={item.children}></item.component> : (<Redirect to="/Login"></Redirect>))
                                    : <item.component {...props} router={item.children}></item.component>
                            }}></Route>
                            : <Redirect key={item.from} path={item.from} to={item.redirect}></Redirect>
                    })
                }
            </Switch>
        )
    }
}
