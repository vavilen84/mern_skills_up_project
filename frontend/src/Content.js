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
            <Holder>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                </ul>
            </Holder>
            <Main/>
        </ContentWrap>
    );
}

export default Content;
