import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Home = () => {

    
    const [products,setProducts] = useState(null)
    const [pname,setPName]=useState("");
    const [pdesc,setPdesc]=useState("");
    const [pspec,setPspec]=useState("");
    const[editId,setEditId]=useState("")
    const[isEdit,setIsEdit]=useState(false)
    const navigate = useNavigate();
    
    
    //get
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
    useEffect(() => {
        const fetchData =async() => {
            try {
                const response =await axios.get("http://localhost:3000/product")
                setProducts(response.data)
            }
            catch(error) {
                console.error(error);
            }
        };
        fetchData() 
    },[]);


    //add
    const handleSubmit =async(e) =>{
        e.preventDefault();
        if(!isEdit){  //For create
          const response =await axios.post("http://localhost:3000/product",{
            pname:pname,
            pdesc:pdesc,
            pspec:pspec,
          })
          setProducts([...products,response.data])
          setPName("")
          setPdesc("")
          setPspec("")
        }
        else{  //For Update
    
          const response =await axios.put(`http://localhost:3000/product/${editId}`,{pname,pdesc,pspec})
          const updatedArray =product&&product?.map((item) => {
            return item._id === editId ? {...item , pname , pdesc , pspec }: item ;
          })
          setProducts(updatedArray);
          setIsEdit(false);
          setEditId("");
          setPdesc("");
          setPName("");
          setPspec("")
        }
      }
      const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:3000/product/${id}`);
          const newUser = product.filter((ele) => ele._id !== id);
          setProduct(newUser);
          navigate(-1); 
        } catch (error) {
          console.error(error);
        }
      }


    return (
        <div className="prod">
            <Link to="add" ><button className="icon">Add Product</button></Link><br/><br/>
            <div>
                {products&&products?.map((prod) => (
                  <div>
                    <Link to={`/${prod._id}`}><button className="btn">{prod.pname}</button></Link><br/><br/><br/>
                  </div>
                ))}
            </div>

        </div>
    )
}

export default Home;