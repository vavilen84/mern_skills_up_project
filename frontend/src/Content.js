import styled from 'styled-components'
import React from "react";
import {Nav} from "react-bootstrap";
import Holder from "./Holder";

const ContentWrap = styled.section`
  padding-bottom: 90px;
`;

function Content() {
    return (
        <ContentWrap>
            <Holder>
                <Nav
                    activeKey="Home"
                    onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                >
                    <Nav.Item>
                        <Nav.Link eventKey="Home" href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Register" href="/register">Register</Nav.Link>
                    </Nav.Item>
                </Nav>

            </Holder>
        </ContentWrap>
    );
}

export default Content;
