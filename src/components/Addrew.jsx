import axios from "axios";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const Addrew = () => {
    const [pname,setPname]=useState("");
    const [rat,setRating]=useState("");
    const [rew,setReview]=useState("");
    const navigate = useNavigate();
    
    //add
    const handleSubmit =async(e) =>{
        e.preventDefault();
          const response =await axios.post("http://localhost:3000/review",{
            rat:rat,
            rew:rew,
          })
          setPname("")
          setRating("")
          setReview("")
          navigate(-1)
      }
      
    return (
        <div className="cont">
            <h1>Add Review</h1>
            <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input type="Number" value={rat} placeholder="Rating" onChange={(e) => setRating(e.target.value)} required/><br/><br/>
                <input type="text" value={rew} placeholder="review" onChange={(e) => setReview(e.target.value)} required/><br/><br/>
                <button type="submit"  className="icon">Add</button>
            </form>
            </div>
        </div>
    )
}

export default Addrew;