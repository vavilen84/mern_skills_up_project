import styled from 'styled-components'
import React from "react";
import Holder from "./Holder";

var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    // padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
    display: 'block',
    // padding: '20px',
    height: '60px',
    width: '100%',
}
function Footer() {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                Vlad Teplov @copy 2020
            </div>
        </div>
    );
}

export default Footer;
