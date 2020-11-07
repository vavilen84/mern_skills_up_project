import React from "react";
import Home from "./Home";
import Register from "./Register";
import {
    Route,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom"


const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/register' component={Register}/>
        </Switch>
    </main>
);

export default Main;