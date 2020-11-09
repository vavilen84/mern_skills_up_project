import './App.css';
import styled from 'styled-components'
import Content from "./Content";
import React from "react";
import Footer from "./Footer";
import {BrowserRouter as Router} from "react-router-dom";

const Wrapper = styled.section`
  position: relative;
  min-height: 100%;
`;

function App() {
  return (
      <Router>
        <Wrapper>
            <Content/>
            <Footer/>
        </Wrapper>
      </Router>
  );
}

export default App;
