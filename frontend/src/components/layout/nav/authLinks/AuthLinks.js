import React from "react";
import LogoutLink from "./LogoutLink";
import LoginLink from "./LoginLink";

const AuthLinks = (props) => {

    const authLinks = props.isLoggedIn
        ? <LogoutLink onChangeRoute={props.onChangeRoute}/>
        : <LoginLink onChangeRoute={props.onChangeRoute}/>;

    return (authLinks);
}

export default AuthLinks;