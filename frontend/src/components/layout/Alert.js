import React from "react";

const style = {
    display: "none",
    padding: "20px",
    border: "1px solid black"
}

class Alert extends React.Component {
    constructor(props) {
        super();
        this.responseBlock = React.createRef();
        this.responseCode = React.createRef();
        this.responseMessage = React.createRef();
        this.responseDataMessage = React.createRef();
        this.responseErrors = React.createRef();
    }

    render (){
        <div style={style} ref={this.responseBlock}>
            <div ref={this.responseCode}/>
            <div ref={this.responseMessage}/>
            <div ref={this.responseErrors}/>
            <div ref={this.responseDataMessage}/>
        </div>
    }
}

export default Alert;