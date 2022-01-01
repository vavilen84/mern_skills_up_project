import React, {useEffect} from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {logoutThunkAction} from "../actions/thunk/logout";


const Logout = (props) => {

    useEffect(() => {
        props.logout();
    });

    return (
        <Navigate to={'/'} replace={true}/>
    )
}

const mapDispatchToProps = dispatch => (
    {
        logout: () => dispatch(logoutThunkAction())
    }
)

const mapStateToProps = (state) => {
    let auth = state.rootReducer.auth;

    return {
        isLoggedIn: auth.accessToken !== null,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);