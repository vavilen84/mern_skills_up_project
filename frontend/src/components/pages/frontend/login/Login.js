import React from "react";
import LoginForm from "./LoginForm";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const Login = (props) => {
    if (props.isLoggedIn) {
        return <Redirect to={'/'}/>;
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