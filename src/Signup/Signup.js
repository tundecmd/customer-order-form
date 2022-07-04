import { signup } from "state/actions/auth.actions";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = { firstName, lastName, email, password, username };
        console.log("user :>> ", user);
        dispatch(signup(user));

        console.log("auth :>> ", auth);
    };
    if (auth.authenticate) {
        return <Redirect replace={true} to="/" />;
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="formGroup">
                <label htmlFor="label" className="formLabel">
                    FirstName
                </label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="formField"
                />
            </div>
            <div className="formGroup">
                <label htmlFor="label" className="formLabel">
                    LastName
                </label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="formField"
                />
            </div>
            <div className="formGroup">
                <label htmlFor="label" className="formLabel">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="formField"
                />
            </div>
            <div className="formGroup">
                <label htmlFor="label" className="formLabel">
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="formField"
                />
            </div>
            <div className="formGroup">
                <label htmlFor="label" className="formLabel">
                    Username
                </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="formField"
                />
            </div>
            {/* <div className="formGroup">
            <label htmlFor="label" className="formLabel">Confirm Password</label>
            <input className='formField' value="" />
        </div> */}
            <button type="submit" className="formSubmitBtn">
                Register
            </button>
        </form>
    );
};

export default SignUp;
