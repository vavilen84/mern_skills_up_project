import React from "react";
import {connect} from "react-redux";
import {List} from "../common/List";
import "./style.scss";

class Alert extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'alertBlock ' + this.props.wrapClassName + ' ' + this.props.toggleVisibleClassName}>
                <div>{this.props.code}</div>
                <List items={this.props.data}/>
                <div>{this.props.message}</div>
            </div>
        )
    }
}

const setWrapClassName = (code) => {
    const successCodes = [200, 201, 204];
    return code && !successCodes.includes(code) ? 'error' : 'success';
}

const mapStateToProps = (state) => {
    let alert = state.rootReducer.alert;
    return {
        toggleVisibleClassName: alert.visible ? 'visible' : 'hidden',
        code: alert.code,
        data: alert.data,
        message: alert.message,
        wrapClassName: setWrapClassName(alert.code)
    };
}

export default connect(mapStateToProps)(Alert);