import React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {loginRoute} from "../../constants/constants";
import {useLocation} from "react-router";

const RequireAuth = (props) => {
    let location = useLocation();
    if (!props.isLoggedIn) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to={loginRoute} state={{ from: location }} replace={true}/>;
    }
    return props.children;
}

const mapStateToProps = (state) => {
    let auth = state.rootReducer.auth;

    return {
        isLoggedIn: auth.accessToken !== null,
    };
}

export default connect(mapStateToProps, null)(RequireAuth);