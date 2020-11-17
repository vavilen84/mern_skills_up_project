import React from "react";
import Holder from "../holder/Holder";
import "./style.scss";

function Footer() {
    return (
        <div>
            <Holder>
                <div className={'footer'}>
                    <span className={'text'}>Blog @copy 2020</span>
                </div>
            </Holder>
        </div>
    );
}

export default Footer;
