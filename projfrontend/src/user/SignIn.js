import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Navigate } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper";

const SignIn = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        success: false,
        loading: false,
        didRedirect: false
    })
    const {email, password, error, success, loading, didRedirect} = values;

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

    const handleChange = (name)  => (event) => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});

        signin({email, password})
        .then((data) => {
            console.log("DATA", data)
            if(data.token){
               // let sessionToken = data.token
                authenticate(data, () => {
                    console.log("TOKEN ADDED")
                    setValues({...values, didRedirect: true})
                })
            } else {
                setValues({...values, loading: false})
            }
        })
        .catch((e) => console.log(e))
    }

    const performRedirect = () => {
        if(isAuthenticated()) {
            return <Navigate to="/" />
        }
    }

    const onLoading = () =>{
        return (
            loading && (
                <div className="alert slert-info">
                    <h2>Loading...</h2>
                </div>
            )
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

    const SignInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
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
    return (<Base title="Sign In Page">
        {successMessage()}
        {errorMessage()}
        {onLoading()}
        {SignInForm()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>
        {performRedirect()}
    </Base>
    )
}

export default SignIn;