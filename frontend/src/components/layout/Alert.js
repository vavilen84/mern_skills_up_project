import React from "react";
import {connect} from "react-redux";

const style = {
    display: "none",
    padding: "20px",
    border: "1px solid black"
}

class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.responseBlock = React.createRef();
        this.responseCode = React.createRef();
        this.responseMessage = React.createRef();
        this.responseDataMessage = React.createRef();
        this.responseErrors = React.createRef();

        // let state = props.store.getState();
        //
        // this.responseBlock.current.style.display = state.showAlert ? "block" : "none";
        //
        // this.responseCode.current.innerHTML = '';
        // if (state.payload.code) {
        //     this.responseCode.current.innerHTML = state.payload.code;
        // }
        //
        // this.responseMessage.current.innerHTML = '';
        // if (state.payload.message) {
        //     this.responseMessage.current.innerHTML = state.payload.message;
        // }
        //
        // this.responseErrors.current.innerHTML = '';
        // if (state.payload.data.errors) {
        //     this.responseErrors.current.innerHTML =
        //         Object
        //         .entries(state.payload.data.errors)
        //         .map((item) => item[1]).join("<br>")
        // }
        //
        // this.responseDataMessage.current.innerHTML = '';
        // if (state.payload.data.message) {
        //     this.responseDataMessage.current.innerHTML = state.payload.data.message;
        // }
    }


    render (){
        return (
            <div style={style} ref={this.responseBlock}>
                <div ref={this.responseCode}/>
                <div ref={this.responseMessage}/>
                <div ref={this.responseErrors}/>
                <div ref={this.responseDataMessage}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(Alert);