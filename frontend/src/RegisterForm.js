import React from "react";
import {USERS_BASE_URL} from "./Constants";

const responseBlockStyle = {
    display: "none",
    padding: "20px",
    border: "1px solid black"
}

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

        this.responseBlock = React.createRef();
        this.responseCode = React.createRef();
        this.responseMessage = React.createRef();
    }
    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }
    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch("http://server.react_node_blog_local:8000"+USERS_BASE_URL, {
            method: 'POST',
            body: {
                username: this.state.email,
                password: this.state.password
            }
        })
            .then(res => res.json())
            .then(json => this.handleResponse(json))
    }

    handleResponse(json) {
        this.responseBlock.current.style.display = "block";
        this.responseCode = json.code;
        this.responseMessage = json.message;
        console.log(json);
    }
    render() {
        return (
            <div>
                <div style={responseBlockStyle} ref={this.responseBlock}>
                    <div ref={this.responseCode}/>
                    <div ref={this.responseMessage}/>
                </div>
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