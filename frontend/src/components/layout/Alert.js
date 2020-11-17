import React from "react";
import {connect} from "react-redux";
import {List} from "./common/List";

class Alert extends React.Component {
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