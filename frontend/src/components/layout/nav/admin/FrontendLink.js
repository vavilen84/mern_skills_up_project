import {Link} from "react-router-dom";
import React from "react";
import {frontendMode, homeRoute} from "../../../../constants/constants";
import {connect} from "react-redux";
import {switchModeAction} from "../../../../actions";

const FrontendLink = (props) => {

    function onClick() {
        props.onChangeRoute();
        props.switchMode(frontendMode);
    }

    return (<Link to={homeRoute} onClick={onClick}>Frontend</Link>);
}


const mapDispatchToProps = dispatch => (
    {
        switchMode: (mode) => dispatch(switchModeAction(mode))
    }
)

export default connect(null, mapDispatchToProps)(FrontendLink);