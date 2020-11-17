import React from "react";
import Holder from "./holder/Holder";

const style = {
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

const spanStyle = {
    position: "relative",
    top: "20px"
}

function Footer() {
    return (
        <div>
            <Holder>
                <div style={style}>
                    <span style={spanStyle}>Blog @copy 2020</span>
                </div>
            </Holder>
        </div>
    );
}

export default Footer;
