import Holder from "../holder/Holder";
import {connect} from "react-redux";
import "./style.scss";
import {Link} from "react-router-dom";
import {homeRoute, loginRoute, logoutRoute, postsListRoute} from "../../../constants/constants";
import React from "react";

class Nav extends React.Component  {

    constructor(props) {
        super(props);

        this.authLinks = props.isLoggedIn
            ? <Link to={logoutRoute}>Logout</Link>
            : <Link to={loginRoute}>Login</Link>;
    }

    render(){
        return (
            <div className="navbar">
                <Holder>
                    <div className="nav-collapse">
                        <ul className="navigation">
                            <li><Link to={homeRoute}>Home</Link></li>
                            <li><Link to={postsListRoute}>Posts</Link></li>
                            <li>{this.authLinks}</li>
                        </ul>
                    </div>
                </Holder>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    let auth = state.rootReducer.auth;

    return {
        isLoggedIn: auth.accessToken !== null,
    };
}

export default connect(mapStateToProps, null)(Nav);