import Holder from "../holder/Holder";
import React from "react";
import {changeRoute} from "../../../actions";
import {connect} from "react-redux";
import "./style.scss";
import {frontendMode} from "../../../constants/constants";
import FrontendNav from "./frontend/FrontendNav";
import BackendNav from "./admin/BackendNav";

const Nav = (props) => {

    let nav = props.isFrontendMode
        ? <FrontendNav onChangeRoute={props.onChangeRoute} isLoggedIn={props.isLoggedIn}/>
        : <BackendNav onChangeRoute={props.onChangeRoute}/>;

    return (
        <div className="navbar">
            <Holder>
                <div className="nav-collapse">
                    {nav}
                </div>
            </Holder>
        </div>
    )
}

const mapDispatchToProps = dispatch => (
    {
        onChangeRoute: () => dispatch(changeRoute())
    }
)

const mapStateToProps = (state) => {
    let auth = state.rootReducer.auth;
    let mode = state.rootReducer.mode;

    return {
        isFrontendMode: mode === frontendMode,
        isLoggedIn: auth.accessToken !== null,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);