import {Route, Switch} from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/register/Register";
import React from "react";
import Holder from "./holder/Holder";
import Alert from "./alert/Alert";

const Main = () => (
    <Holder>
        <Alert />
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/register' component={Register}/>
        </Switch>
    </Holder>
)

export default Main;