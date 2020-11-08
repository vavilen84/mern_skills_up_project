import React from "react";
import RegisterForm from "./RegisterForm";
import RegisterFormErrors from "./RegisterFormErrors";

const Register = () => (
    <div>
        <h1>Welcome to the register page!</h1>
        <RegisterFormErrors/>
        <RegisterForm/>
    </div>
)

export default Register;