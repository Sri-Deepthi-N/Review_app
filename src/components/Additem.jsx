import axios from "axios";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const Additem = () => {
    const [pname,setPName]=useState("");
    const [pdesc,setPdesc]=useState("");
    const [pspec,setPspec]=useState("");
    const navigate = useNavigate();
    
    //add
    const handleSubmit =async(e) =>{
        e.preventDefault();
          const response =await axios.post("http://localhost:3000/product",{
            pname:pname,
            pdesc:pdesc,
            pspec:pspec,
          })
          setPName("")
          setPdesc("")
          setPspec("")
          navigate(-1)
      }
      
    return (
        <div className="cont">
            <h1>Add Product</h1>
            <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" value={pname} placeholder="Name" onChange={(e) => setPName(e.target.value)} required/><br/><br/>
                <input type="text" value={pdesc} placeholder="Description" onChange={(e) => setPdesc(e.target.value)} required/><br/><br/>
                <input type="text" value={pspec} placeholder="Specification" onChange={(e) => setPspec(e.target.value)} required/><br/><br/>
                <button type="submit"  className="icon">Add</button>
            </form>
            </div>
        </div>
    )
}

export default Additem;