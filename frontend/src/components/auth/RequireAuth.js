import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {changeRouteAction} from "../../actions";
import {loginRoute} from "../../constants/constants";
import {useLocation} from "react-router";

const RequireAuth = (props) => {
    let location = useLocation();
    // TODO: do we need this?
    // useEffect(() => {
    //     if (props.isLoggedIn) {
    //         console.log(1);
    //         //props.onChangeRoute();
    //     }
    // });
    if (!props.isLoggedIn) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to={loginRoute} state={{ from: location }} replace={true}/>;
    }
    return props.children;
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

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth);