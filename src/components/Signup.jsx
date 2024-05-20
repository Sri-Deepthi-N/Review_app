import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup= ()=>{
    const [products,setProducts] = useState(null)
    const [name,setName]=useState("");
    const [mobileno,setMobileno]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate(); 

    const handleSubmit =async(e) =>{
        e.preventDefault();
          const response =await axios.post("http://localhost:3000/user",{
            name:name,
            mobileno:mobileno,
            password:password,
          })
          //setProducts([...products,response.data])
          setName("")
          setMobileno("")
          setPassword("")
          navigate(-1);
      }
 return(
    <div className="cont">
        <form onSubmit={(e)=>handleSubmit(e)}>
            <h1>Signup</h1>
            <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} required/><br/><br/>
            <input type="number" value={mobileno} placeholder="Moblile Number" onChange={(e) => setMobileno(e.target.value)} required/><br/><br/>
            <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/><br/><br/>
            <button type="submit" className="icon">Signup</button ><br/><br/>
            <p>Already have an account?</p><Link to="/" ><a>Login</a></Link>
        </form>
    </div>
    
 )
}

export default Signup;