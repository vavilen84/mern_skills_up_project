import Holder from "./Holder";
import React from "react";
import {Link} from "react-router-dom";
import {changeRoute} from "../../actions";
import {connect} from "react-redux";

const Nav = (props) => (
    <div className="navbar">
        <div className="navbar-inner">
            <div className="container">
                <Holder>
                    <Link className="brand" to='/'>Blog</Link>
                    <div className="nav-collapse">
                        <ul className="nav">
                            <li><Link to='/' onClick={props.onChangeRoute}>Home</Link></li>
                            <li><Link to='/register' onClick={props.onChangeRoute}>Register</Link></li>
                        </ul>
                    </div>
                </Holder>
            </div>
        </div>
    </div>
)

const mapDispatchToProps = dispatch => (
    {
        onChangeRoute: () => dispatch(changeRoute())
    }
)

export default connect(null, mapDispatchToProps)(Nav);