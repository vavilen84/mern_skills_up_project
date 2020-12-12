import {Route, Switch} from "react-router-dom";
import Home from "../../pages/frontend/home/Home";
import Login from "../../pages/frontend/login/Login";
import React from "react";
import Logout from "../../Logout";
import {
    adminPostsCreateRoute,
    adminPostsIndexRoute,
    adminRoute,
    homeRoute,
    loginRoute,
    logoutRoute
} from "../../../constants/constants";
import Admin from "../../pages/admin/index/Admin";
import PostsIndex from "../../pages/admin/posts/index/PostsIndex";
import PostsCreate from "../../pages/admin/posts/create/PostsCreate";

const Router = () => (
    <Switch>
        <Route exact path={homeRoute} component={Home}/>
        <Route exact path={loginRoute} component={Login}/>
        <Route exact path={logoutRoute} component={Logout}/>
        <Route exact path={adminRoute} component={Admin}/>
        <Route exact path={adminPostsIndexRoute} component={PostsIndex}/>
        <Route exact path={adminPostsCreateRoute} component={PostsCreate}/>
    </Switch>
)

export default Router;