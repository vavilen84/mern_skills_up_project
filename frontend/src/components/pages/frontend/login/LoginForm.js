import React from "react";
import { connect } from 'react-redux'
import {authenticateUser} from "../../../../actions/async/authenticateUser";

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

    handleSubmit(event) {
        event.preventDefault();
        this.props.authenticateUser(this.state.username, this.state.password);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Username</label>
                        <input type="text" className="form-control" placeholder="Enter username" onChange={this.handleChangeUsername}/>
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
        authenticateUser: (username, password) => dispatch(authenticateUser(username, password))
    }
)

export default connect(null, mapDispatchToProps)(LoginForm);