import {Route, Switch} from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import React from "react";
import Holder from "./holder/Holder";
import Alert from "./alert/Alert";

const Main = () => (
    <Holder>
        <Alert />
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={Login}/>
        </Switch>
    </Holder>
)

export default Main;