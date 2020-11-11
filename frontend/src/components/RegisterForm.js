import React from "react";
import {getURL, USERS_BASE_URL} from "./Server";

class RegisterForm extends React.Component {
    constructor(props) {
        super();
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
        fetch(getURL(USERS_BASE_URL), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(json => this.handleResponse(json))
    }

    handleCreated() {

    }

    handleBadRequest(){

    }

    handleUnprocessableEntity(){

    }

    handleResponse(json) {
        switch (json.code) {
            case 201:
                this.handleCreated(json);
                break;
            case 400:
                this.handleBadRequest();
                break;
            case 422:
                this.handleUnprocessableEntity();
                break;
            default:
                this.handleError();
                break;
        }
        this.responseBlock.current.style.display = "block";
        this.responseCode.current.innerHTML = json.code;

        this.responseMessage.current.innerHTML = '';
        if (json.message) {
            this.responseMessage.current.innerHTML = json.message;
        }

        this.responseErrors.current.innerHTML = '';
        if (json.data.errors) {
            this.responseErrors.current.innerHTML = Object.entries(json.data.errors).map((item) => item[1]).join("<br>")
        }

        this.responseDataMessage.current.innerHTML = '';
        if (json.data.message) {
            this.responseDataMessage.current.innerHTML = json.data.message;
        }
    }
    render() {
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

export default RegisterForm;