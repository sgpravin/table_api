import React, { useState } from "react";

const Login = ({ handleLogin }) => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = () => {
        if(user == "admin" && pass == "admin"){
            handleLogin();
        }
    }
    return(
        <div className="container">
            <form className="was-validated">
                <div className="my-3">
                    <label for="userName" className="form-label">UserName:</label>
                    <input type="text" className="form-control" placeholder="Enter User Name" onChange={(e) => setUser(e.target.value)} required />
                    <div className="invalid-feedback">Please fill this field</div>
                </div>
                <div className="my-3">
                    <label for="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" placeholder="Enter Password" onChange={(e) => setPass(e.target.value)} required />
                    <div className="invalid-feedback">Please enter password</div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
};

export default Login;