import {Route, Routes} from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import React from "react";
import Logout from "../Logout";
import {
    homeRoute,
    loginRoute,
    logoutRoute, postCreateRoute, postRoute, postsListRoute, postAdminUpdateRoute
} from "../../constants/constants";
import PostsIndex from "../pages/posts/PostsIndex";
import PostDetails from "../pages/posts/PostDetails";
import PostCreate from "../pages/posts/PostCreate";
import RequireAuth from "../auth/RequireAuth";
import PostUpdate from "../pages/posts/PostUpdate";


const Router = () => (
    <Routes>
        <Route exact path={homeRoute} element={<Home/>} />
        <Route exact path={postsListRoute} element={<PostsIndex/>}/>
        <Route exact path={postRoute} element={<PostDetails/>}/>
        <Route exact path={postCreateRoute} element={<RequireAuth><PostCreate/></RequireAuth>}/>
        <Route exact path={postAdminUpdateRoute} element={<RequireAuth><PostUpdate/></RequireAuth>}/>
        <Route exact path={loginRoute} element={<Login/>}/>
        <Route exact path={logoutRoute} element={<Logout/>}/>
    </Routes>
)

export default Router;