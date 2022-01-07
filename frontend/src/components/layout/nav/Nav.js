import Holder from "../holder/Holder";
import {changeRouteAction} from "../../../actions";
import {connect} from "react-redux";
import "./style.scss";
import {Link} from "react-router-dom";
import {homeRoute, postsListRoute} from "../../../constants/constants";
import AuthLinks from "./authLinks/AuthLinks";
import React from "react";

class Nav extends React.Component  {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="navbar">
                <Holder>
                    <div className="nav-collapse">
                        <ul className="navigation">
                            <li><Link to={homeRoute} onClick={this.props.onChangeRoute}>Home</Link></li>
                            <li><Link to={postsListRoute} onClick={this.props.onChangeRoute}>Blog</Link></li>
                            <li><AuthLinks isLoggedIn={this.props.isLoggedIn} onChangeRoute={this.props.onChangeRoute}/></li>
                        </ul>
                    </div>
                </Holder>
            </div>
        )
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);