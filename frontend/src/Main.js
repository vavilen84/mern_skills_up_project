import React from "react";
import Home from "./Home";
import Register from "./Register";
import {
    Route,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom"
import Holder from "./Holder";


const Main = () => (
    <main>
        <Holder>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/register' component={Register}/>
            </Switch>
        </Holder>
    </main>
);

export default Main;