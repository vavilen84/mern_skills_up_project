import {Link} from "react-router-dom";
import React from "react";
import {logoutRoute} from "../../../../constants/constants";

const LogoutLink = (props) => {
    return (<Link to={logoutRoute} onClick={props.onChangeRoute}>Logout</Link>);
}

export default LogoutLink;