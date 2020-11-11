import Holder from "./Holder";
import React from "react";
import {Link} from "react-router-dom";

const Nav = () => (
    <div className="navbar">
        <div className="navbar-inner">
            <div className="container">
                <Holder>
                    <Link className="brand" to='/'>Blog</Link>
                    <div className="nav-collapse">
                        <ul className="nav">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/register'>Register</Link></li>
                        </ul>
                    </div>
                </Holder>
            </div>
        </div>
    </div>
)

export default Nav;