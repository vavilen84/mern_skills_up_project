import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../actions";


const Logout = (props) => {

    useEffect(() => {
        props.logout();
    });

    return (
        <Redirect to={'/'}/>
    )
}

const mapDispatchToProps = dispatch => (
    {
        logout: () => dispatch(logout())
    }
)

const mapStateToProps = (state) => {
    let auth = state.rootReducer.auth;

    return {
        isLoggedIn: auth.accessToken !== null,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);