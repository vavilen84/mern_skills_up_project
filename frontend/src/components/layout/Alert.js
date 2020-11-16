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
        // this.responseCode = '';
        // this.state = {
        //
        // }
        // this.responseBlock = React.createRef();
        // this.responseCode = React.createRef();
        // this.responseMessage = React.createRef();
        // this.responseDataMessage = React.createRef();
        // this.responseErrors = React.createRef();
        //
        // console.log('constructor');
        // console.log(props);
        // console.log('end constructor');

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
        //

    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextProps);
    //     console.log(nextState);
    //     return true;
    // }


    // static getDerivedStateFromProps(nextProps, prevState){
    //     console.log(nextProps);
    //     console.log(prevState);
    // }
    //
    // shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
    //     console.log(nextProps);
    //     console.log(nextState);
    // }
    //
    // componentDidMount() {
    //     this.responseBlock.current.innerHTML = this.props[0] ? this.props[0] : '';
    // }
    //
    // componentWillUpdate(nextProps, nextState){
    //     console.log('component will update');
    //     console.log(nextProps);
    //     console.log(nextState);
    //     console.log(this.props);
    //     console.log('end component will update');
    //
    //     this.responseBlock.current.innerHTML = this.props[0];
    // }

    render (){


        return (
            // <div style={style} ref={this.responseBlock}>
            //     <div ref={this.responseCode}/>
            //     <div ref={this.responseMessage}/>
            //     <div ref={this.responseErrors}/>
            //     <div ref={this.responseDataMessage}/>
            // </div>
            <div className={'alertBlock'}>

                <div>{this.props.responseCode}</div>
                {/*<div ref={this.responseMessage}/>*/}
                {/*<div ref={this.responseErrors}/>*/}
                {/*<div ref={this.responseDataMessage}/>*/}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    let responseCode = '';
    if (state.rootReducer.payload && state.rootReducer.payload.responseCode) {
        responseCode = state.rootReducer.payload.responseCode;
    }
    return {
        responseCode: responseCode,
    };
}

export default connect(mapStateToProps)(Alert);