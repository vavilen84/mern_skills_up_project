import styled from 'styled-components'
import React from "react";
import Nav from "./Nav";
import Main from "./Main";

const ContentWrap = styled.section`
  padding-bottom: 90px;
`;

function Content() {
    return (

        <ContentWrap>
            <Nav/>
            <Main/>
        </ContentWrap>
    );
}

export default Content;
