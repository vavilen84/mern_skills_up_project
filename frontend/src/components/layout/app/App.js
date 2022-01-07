import React from "react";
import Footer from "../footer/Footer";
import {BrowserRouter} from "react-router-dom";
import "./style.scss";
import Nav from "../nav/Nav";
import Router from "../../router/Router";
import Holder from "../holder/Holder";
import Alert from "../alert/Alert";
import {connect} from "react-redux";
import {loginOnAppInitThunkAction} from "../../../actions/thunk/loginOnAppInit";

class App extends React.Component {
    constructor(props) {
        super(props);
        props.loginOnAppInit();
    }

    render() {
        return (
            <BrowserRouter>
                <div className={'wrapper'}>
                    <div className={'content'}>
                        <Nav/>
                        <Holder>
                            <div className={'container'}>
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
    }
)

export default connect(null, mapDispatchToProps)(App)
