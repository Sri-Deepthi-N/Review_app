import React from "react";
import { Link } from "react-router-dom";

const Login= ()=>{
 return(
    <div className="cont">
        <h1>Login</h1>
        <br/>
        <input placeholder="Mobile Number"/><br/>
        <br/>
        <input placeholder="Password"/><br/>
        
        <Link to="/home" ><button className="icon">Login</button></Link>
        <p>Don't have an account?</p><Link to="/signup" ><a>Signup</a></Link>
    </div>
    
 )
}

export default Login;