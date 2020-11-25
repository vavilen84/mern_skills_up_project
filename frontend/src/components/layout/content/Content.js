import React from "react";
import Nav from "../nav/Nav";
import Main from "../Main";
import "./style.scss";

function Content() {
    return (
        <div className={'content'}>
            <Nav/>
            <Main/>
        </div>
    );
}

export default Content;
