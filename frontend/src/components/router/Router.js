import {Route, Routes} from "react-router-dom";
import Home from "../pages/frontend/home/Home";
import Login from "../pages/frontend/login/Login";
import React from "react";
import Logout from "../Logout";
import {
    adminPostsCreateRoute,
    adminPostsIndexRoute,
    adminRoute,
    homeRoute,
    loginRoute,
    logoutRoute, postRoute, postsListRoute
} from "../../constants/constants";
import Admin from "../pages/admin/index/Admin";
import PostsCreate from "../pages/admin/posts/create/PostsCreate";
import PostsIndex from "../pages/frontend/posts/PostsIndex";
import AdminPostsIndex from "../pages/admin/posts/index/PostsIndex";
import Post from "../posts/Post";


const Router = () => (
    <Routes>
        <Route exact path={homeRoute} element={<Home/>}/>
        <Route exact path={postsListRoute} element={<PostsIndex/>}/>
        <Route exact path={postRoute} element={<Post/>}/>
        <Route exact path={loginRoute} element={<Login/>}/>
        <Route exact path={logoutRoute} element={<Logout/>}/>
        <Route exact path={adminRoute} element={<Admin/>}/>
        <Route exact path={adminPostsIndexRoute} element={<AdminPostsIndex/>}/>
        <Route exact path={adminPostsCreateRoute} element={<PostsCreate/>}/>
    </Routes>
)

export default Router;