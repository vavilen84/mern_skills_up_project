import React from "react";
import {showAlert, submitCreateUser} from "../../../actions";
import { connect } from 'react-redux'
import {getURL, USERS_BASE_URL} from "../../../helpers/Server";

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        const email = this.state.email;
        const password = this.state.password;
        const showAlert = this.props.showAlert;

        showAlert({code:200});
        // fetch(getURL(USERS_BASE_URL), {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username: email,
        //         password: password
        //     })
        // })
        //     .then(res => res.json())
        //     .then(json => showAlert(json))

    }

    render() {
        const a = {1:1,2:2,3:3}
        console.log(...this.props);

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" onChange={this.handleChangeEmail}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" placeholder="Password" onChange={this.handleChangePassword}/>
                    </div>
                    <input type="submit" value="Submit" className="btn btn-success"/>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = {
    showAlert
}

export default connect(null, mapDispatchToProps)(RegisterForm);