import {Link} from "react-router-dom";
import React from "react";
import AdminLink from "./AdminLink";
import AuthLinks from "../authLinks/AuthLinks";
import {postsListRoute, homeRoute} from "../../../../constants/constants";

const FrontendNav = (props) => {
    return (
        <ul className="navigation">
            <li><Link to={homeRoute} onClick={props.onChangeRoute}>Home</Link></li>
            <li><Link to={postsListRoute} onClick={props.onChangeRoute}>Blog</Link></li>
            <AdminLink isLoggedIn={props.isLoggedIn} onChangeRoute={props.onChangeRoute}/>
            <li><AuthLinks isLoggedIn={props.isLoggedIn} onChangeRoute={props.onChangeRoute}/></li>
        </ul>
    );
}

export default FrontendNav;