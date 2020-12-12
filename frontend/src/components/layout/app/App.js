import '../../../static/App.css';
import React from "react";
import Footer from "../footer/Footer";
import {BrowserRouter} from "react-router-dom";
import "./style.scss";
import Nav from "../nav/Nav";
import Router from "../router/Router";
import Holder from "../holder/Holder";
import Alert from "../alert/Alert";

function App() {
    return (
        <BrowserRouter>
            <div className={'wrapper'}>
                <div className={'content'}>
                    <Nav/>
                    <Holder>
                        <div className={'container'}>
                            <Alert />
                            <Router />
                        </div>
                    </Holder>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
