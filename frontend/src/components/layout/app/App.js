import React, {useEffect} from "react";
import Footer from "../footer/Footer";
import {BrowserRouter} from "react-router-dom";
import "./style.scss";
import Nav from "../nav/Nav";
import Router from "../../router/Router";
import Holder from "../holder/Holder";
import Alert from "../alert/Alert";
import {connect} from "react-redux";
import {loginOnAppInitThunkAction} from "../../../actions/thunk/loginOnAppInit";
import {switchModeThunkAction} from "../../../actions/thunk/switchMode";
import {setDisplayModeOnAppInit} from "../../../actions/thunk/setDisplayModeOnAppInit";
import {List} from "../common/List";

class App extends React.Component {
    constructor(props) {
        super(props);
        props.loginOnAppInit();
        //props.setDisplayModeOnAppInit();
    }

    render() {
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
        )
    }
}

const mapDispatchToProps = dispatch => (
    {
        loginOnAppInit: () => dispatch(loginOnAppInitThunkAction()),
        setDisplayModeOnAppInit:  () => dispatch(setDisplayModeOnAppInit()),
    }
)

export default connect(null, mapDispatchToProps)(App)
