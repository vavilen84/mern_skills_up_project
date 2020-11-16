import React from "react";
import {connect} from "react-redux";
import {List} from "./common/List";

const style = {
    display: "none",
    padding: "20px",
    border: "1px solid black"
}

class Alert extends React.Component {
    constructor(props) {

        super(props);

    }

    render (){
        return (
            <div className={'alertBlock'}>
                <div>{this.props.code}</div>
                <List items={this.props.data}/>
                <div>{this.props.message}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        code: state.rootReducer.alert.code,
        data: state.rootReducer.alert.data,
        message: state.rootReducer.alert.message,
    };
}

export default connect(mapStateToProps)(Alert);