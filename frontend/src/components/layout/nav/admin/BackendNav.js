import {Link} from "react-router-dom";
import React from "react";
import FrontendLink from "./FrontendLink";
import LogoutLink from "../authLinks/LogoutLink";
import {adminRoute, adminPostsRoute} from "../../../../constants/constants";

const BackendNav = (props) => {
    return (
        <ul className="navigation">
            <li><Link to={adminRoute} onClick={props.onChangeRoute}>Admin</Link></li>
            <li><Link to={adminPostsRoute} onClick={props.onChangeRoute}>Posts</Link></li>
            <li><FrontendLink onChangeRoute={props.onChangeRoute}/></li>
            <li><LogoutLink onChangeRoute={props.onChangeRoute}/></li>
        </ul>
    );
}

export default BackendNav;