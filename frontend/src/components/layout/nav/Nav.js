import Holder from "../holder/Holder";
import React from "react";
import {Link} from "react-router-dom";
import {changeRoute} from "../../../actions";
import {connect} from "react-redux";
import "./style.scss";

const Nav = (props) => (
    <div className="navbar">
        <div className="container">
            <Holder>
                <div className="nav-collapse">
                    <ul className="navigation">
                        <li><Link to='/' onClick={props.onChangeRoute}>Home</Link></li>
                        <li><Link to='/about-me' onClick={props.onChangeRoute}>About me</Link></li>
                        <li><Link to='/skills' onClick={props.onChangeRoute}>Skills</Link></li>
                        <li><Link to='/case-studies' onClick={props.onChangeRoute}>Case studies</Link></li>
                        <li><Link to='/blog' onClick={props.onChangeRoute}>Blog</Link></li>
                        <li><Link to='/contacts' onClick={props.onChangeRoute}>Contacts</Link></li>
                        <li><Link to='/login' onClick={props.onChangeRoute}>Login</Link></li>
                    </ul>
                </div>
            </Holder>
        </div>
    </div>
)

const mapDispatchToProps = dispatch => (
    {
        onChangeRoute: () => dispatch(changeRoute())
    }
)

export default connect(null, mapDispatchToProps)(Nav);