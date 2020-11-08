import React from "react";

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
        console.log(this.state);
        event.preventDefault();

    }
    render() {
        return (
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
        );
    }
}

export default RegisterForm;