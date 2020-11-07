import './App.css';
import styled from 'styled-components'
import Content from "./Content";
import React from "react";
import Footer from "./Footer";

const Wrapper = styled.section`
  position: relative;
  min-height: 100%;
`;

function App() {
  return (
    <Wrapper>
        <Content/>
        <Footer/>
    </Wrapper>
  );
}

export default App;
