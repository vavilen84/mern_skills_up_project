import React from "react";
import { connect } from 'react-redux'
import {authenticateUserThunkAction} from "../../../actions/thunk/authenticateUser";
import {showAlertAction} from "../../../actions";
import Alert from "../../layout/alert/Alert";

class LoginForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    validateOnSubmit() {
        if(!this.state.username || !this.state.password){
            this.props.showAlert(400, {}, "Username & Password are required!");
            return false;
        }
        return true;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validateOnSubmit()) {
            this.props.authenticateUser(this.state.username, this.state.password);
        }
    }

    render() {
        return (
            <div>
                <Alert />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Username</label>
                        <input type="text" className="form-control"
                               placeholder="Enter username" onChange={this.handleChangeUsername}
                               ref={this.usernameField}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input type="password" className="form-control" placeholder="Password" onChange={this.handleChangePassword}/>
                    </div>
                    <input type="submit" value="Submit" className="btn btn-success"/>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => (
    {
        showAlert: (code, data, message) => dispatch(showAlertAction(code, data, message)),
        authenticateUser: (username, password) => dispatch(authenticateUserThunkAction(username, password))
    }
)

export default connect(null, mapDispatchToProps)(LoginForm);