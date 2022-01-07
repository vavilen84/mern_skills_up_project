import React from "react";
import LoginForm from "./LoginForm";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {useLocation} from "react-router";

const Login = (props) => {
    let location = useLocation();
    if (props.isLoggedIn) {
        let from = location.state?.from?.pathname || "/";
        return <Navigate to={from} replace={true}/>;
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginForm/>
        </div>
    )
}

const mapStateToProps = (state) => {
    let auth = state.rootReducer.auth;

    return {
        isLoggedIn: auth.accessToken !== null,
    };
}

export default connect(mapStateToProps, null)(Login);