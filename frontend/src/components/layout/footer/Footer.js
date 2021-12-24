import React from "react";
import Holder from "../holder/Holder";
import "./style.scss";

function Footer() {
    let date = new Date().getFullYear();
    return (
        <div className={'footer'}>
            <Holder>
                <div className={'footer-info'}>@{date} vavilen84</div>
            </Holder>
        </div>
    );
}

export default Footer;
