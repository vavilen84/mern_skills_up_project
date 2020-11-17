import {Route, Switch} from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/register/Register";
import React from "react";
import Holder from "./holder/Holder";

const Main = () => (
    <Holder>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/register' component={Register}/>
        </Switch>
    </Holder>
)

export default Main;