import {Link} from "react-router-dom";
import React from "react";
import {adminRoute, backendMode} from "../../../../constants/constants";
import {switchModeAction} from "../../../../actions";
import {connect} from "react-redux";

const AdminLink = (props) => {

    const onClick = () => {
        props.onChangeRoute();
        props.switchMode(backendMode);
    }
    const adminLink = props.isLoggedIn
        ? <li><Link to={adminRoute} onClick={onClick}>Admin</Link></li>
        : '';

    return (adminLink);
}

const mapDispatchToProps = dispatch => (
    {
        switchMode: (mode) => dispatch(switchModeAction(mode))
    }
)

export default connect(null, mapDispatchToProps)(AdminLink);