import styled from 'styled-components'
import React from "react";
import Nav from "./Nav";
import Main from "./Main";
import Alert from "./Alert";

const ContentWrap = styled.section`
  padding-bottom: 90px;
`;

function Content() {
    return (
        <ContentWrap>
            <Nav/>
            <Alert />
            <Main/>
        </ContentWrap>
    );
}

export default Content;
