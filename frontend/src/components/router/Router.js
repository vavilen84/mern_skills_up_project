import {Route, Routes} from "react-router-dom";
import Home from "../pages/frontend/home/Home";
import Login from "../pages/frontend/login/Login";
import React from "react";
import Logout from "../Logout";
import {
    homeRoute,
    loginRoute,
    logoutRoute, postCreateRoute, postRoute, postsListRoute
} from "../../constants/constants";
import PostsIndex from "../pages/frontend/posts/PostsIndex";
import Post from "../posts/Post";
import PostCreate from "../pages/frontend/posts/PostCreate";


const Router = () => (
    <Routes>
        <Route exact path={homeRoute} element={<Home/>}/>
        <Route exact path={postsListRoute} element={<PostsIndex/>}/>
        <Route exact path={postRoute} element={<Post/>}/>
        <Route exact path={postCreateRoute} element={<PostCreate/>}/>
        <Route exact path={loginRoute} element={<Login/>}/>
        <Route exact path={logoutRoute} element={<Logout/>}/>
    </Routes>
)

export default Router;