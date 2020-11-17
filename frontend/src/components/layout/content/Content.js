import React from "react";
import Nav from "../Nav";
import Router from "../Router";
import Alert from "../Alert";
import "./style.scss";
import Holder from "../holder/Holder";

function Content() {
    return (
        <Holder>
            <div className={'content'}>
                <Nav/>
                <Alert />
                <Router/>
            </div>
        </Holder>
    );
}

export default Content;
