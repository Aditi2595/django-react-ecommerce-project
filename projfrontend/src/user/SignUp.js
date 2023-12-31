import React, { useState } from "react";
import Base from "../core/Base";
import { signUp } from "../auth/helper";
import { Link } from "react-router-dom";

const SignUp = () => {

    const [values, setValues] = useState({
        name:"",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const {name, email, password, error, success} = values;

    const handleChange = (name)  => (event) => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false});
        signUp({name, email, password})
        .then((data) => {
            console.log("DATA", data);
            if(data.email === email) {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                })
            } else {
                setValues({
                    ...values,
                    error: true,
                    success: false
                })
            }
        })
        .catch((e) => console.log(e));
    }


    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success"
                    style={{display: success ? "" : "none"}}>
                        New account created successfully. Please <Link to="/signin">login now.</Link> 
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger"
                    style={{display: error ? "" : "none"}}>
                        All fields are required.
                    </div>
                </div>
            </div>
        )
    }

    const SignUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input value={name} onChange={handleChange("name")} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input value={email} onChange={handleChange("email")} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input value={password} onChange={handleChange("password")} type="password" className="form-control"/>
                        </div>
                        <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (<Base title="Sign Up page" description="This is a user sign up page">
        {successMessage()}
        {errorMessage()}
        {SignUpForm()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
    )
}

export default SignUp;