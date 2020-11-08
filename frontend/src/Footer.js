import styled from 'styled-components'
import React from "react";
import Holder from "./Holder";

var style = {
    backgroundColor: "#222",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
    color: "white"
}

var spanStyle = {
    position: "relative",
    top: "20px"
}

function Footer() {
    return (
        <div>
            <div style={style}>
                <span style={spanStyle}>Blog @copy 2020</span>
            </div>
        </div>
    );
}

export default Footer;
