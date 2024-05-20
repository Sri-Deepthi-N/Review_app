import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Profile = () =>{
    const [user,setUser] = useState(null)
    useEffect(() => {
        const fetchData =async() => {
            try {
                const response =await axios.get("http://localhost:3000/user")
                setUser(response.data)
            }
            catch(error) {
                console.error(error);
            }
        };
        fetchData() 
    },[]);

    const [showModal, setShowModal] = useState(false);
    const [name,setName] =useState("")
    const [mobileno,setMobileno] =useState("")
    const [password,setPassword] =useState("")
    const[editId,setEditId]=useState("")

    const openModal = () => {
        setShowModal(true);
      };
      const closeModal = () => {
        setShowModal(false);
      };


      const handleEdit = (user) => {
        setShowModal(true);
        setEditId(user._id);
        setName(user.name);
        setPassword(user.password);
        setMobileno(user.mobileno);
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`http://localhost:3000/user/${editId}`, { name, mobileno, password });
          const updatedArray = user && user.map((item) => {
            return item._id === editId ? { ...item , name , mobileno , password } : item ;
          });
          setUser(updatedArray);
          setShowModal(false);
          setMobileno("");
          setName("");
          setPassword("");
          
        } catch (error) {
          console.error(error);
        }
      } 
      const { id } = useParams();
      const filteredData = user?.filter((users) => users?._id === id);
      useEffect(() => {}, [filteredData]);

    return (
        <div>
        {showModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Enter Your Details</h2>
                <div>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <input className="ipt" type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} required/><br/><br/>
                    <input className="ipt" type="number" value={mobileno} placeholder="Mobile Number" onChange={(e) => setMobileno(e.target.value)} required/><br/><br/>
                    <input className="ipt" type="text" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/><br/><br/>
                    <Link to="/profile" ><button >Cancel</button></Link>
                    <button type="submit">Edit</button>
                  </form>
                </div>
              </div>
            </div>
          )}
        {console.log(user)}
            <h1>Profile</h1>
            <div>
            {user && user?.map((users) => (
                <div>
                    <p>{users.name}</p>
                    <p>{users.mobileno}</p>
                    <button onClick={() => handleEdit(users)}>Edit</button>
                    
                </div>
                ))}
            </div>
        </div>
    )
}

export default Profile;