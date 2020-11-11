import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import React from "react";

const Main = () => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/register' component={Register}/>
    </Switch>
)

export default Main;