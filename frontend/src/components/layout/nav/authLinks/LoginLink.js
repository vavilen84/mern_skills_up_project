import {Link} from "react-router-dom";
import React from "react";
import {loginRoute} from "../../../../constants/constants";

const LoginLink = (props) => {
    return (<Link to={loginRoute} onClick={props.onChangeRoute}>Login</Link>);
}

export default LoginLink;