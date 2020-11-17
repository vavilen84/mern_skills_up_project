import '../../../static/App.css';
import Content from "../content/Content";
import React from "react";
import Footer from "../footer/Footer";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
    return (
        <Router>
            <div className={'wrapper'}>
                <Content/>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
