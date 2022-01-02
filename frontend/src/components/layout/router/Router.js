import {Route, Routes} from "react-router-dom";
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
    logoutRoute, postRoute, postsListRoute
} from "../../../constants/constants";
import Admin from "../../pages/admin/index/Admin";
import PostsIndex from "../../pages/admin/posts/index/PostsIndex";
import PostsCreate from "../../pages/admin/posts/create/PostsCreate";
import PostsList from "../../pages/frontend/posts/PostsList";
import Post from "../../pages/frontend/posts/Post";

const Router = () => (
    <Routes>
        <Route exact path={homeRoute} element={<Home/>}/>
        <Route exact path={postsListRoute} element={<PostsList/>}/>
        <Route exact path={postRoute} element={<Post/>}/>
        <Route exact path={loginRoute} element={<Login/>}/>
        <Route exact path={logoutRoute} element={<Logout/>}/>
        <Route exact path={adminRoute} element={<Admin/>}/>
        <Route exact path={adminPostsIndexRoute} element={<PostsIndex/>}/>
        <Route exact path={adminPostsCreateRoute} element={<PostsCreate/>}/>
    </Routes>
)

export default Router;