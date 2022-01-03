import React, {useEffect} from "react";
import LoginForm from "./LoginForm";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {changeRouteAction} from "../../../../actions";

const Login = (props) => {

    useEffect(()=>{
        if (props.isLoggedIn) {
            props.onChangeRoute();
        }
    });
    if (props.isLoggedIn) {
        return <Navigate to={'/'} replace={true}/>;
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginForm/>
        </div>
    )
}

const mapDispatchToProps = dispatch => (
    {
        onChangeRoute: () => dispatch(changeRouteAction())
    }
)

const mapStateToProps = (state) => {
    let auth = state.rootReducer.auth;

    return {
        isLoggedIn: auth.accessToken !== null,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);