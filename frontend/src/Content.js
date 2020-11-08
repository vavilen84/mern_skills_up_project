import styled from 'styled-components'
import React from "react";
import {Nav} from "react-bootstrap";
import Holder from "./Holder";

import { Link } from "react-router-dom"
import Main from "./Main";

const ContentWrap = styled.section`
  padding-bottom: 90px;
`;

function Content() {
    return (
        <ContentWrap>
            <div className="navbar">
                <div className="navbar-inner">
                    <div className="container">
                        <Holder>
                            <a className="brand" href="#">Blog</a>
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
            <Main/>
        </ContentWrap>
    );
}

export default Content;
