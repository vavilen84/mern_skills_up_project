import React from "react";
import Nav from "../Nav";
import Main from "../Main";
import Alert from "../Alert";
import "./style.scss";

function Content() {
    return (
        <div className={'content'}>
            <Nav/>
            <Alert />
            <Main/>
        </div>
    );
}

export default Content;
