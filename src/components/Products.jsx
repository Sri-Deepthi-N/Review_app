import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState(null);
  const [pname, setPName] = useState("");
  const [pdesc, setPdesc] = useState("");
  const [pspec, setPspec] = useState("");
  const [editId, setEditId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, []);

  const [review, setReview] = useState(null);
  useEffect(() => {
    const fetchreview = async () => {
      try {
        const response = await axios.get("http://localhost:3000/review");
        setReview(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchreview();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/product/${editId}`, {
        pname,
        pdesc,
        pspec,
      });
      // Update products state directly to reflect changes without refresh
      setProducts(
        products.map((item) =>
          item._id === editId ? { ...item, pname, pdesc, pspec } : item
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/product/${id}`);
      setProducts(products.filter((item) => item._id !== id));
      navigate(-1)
      console.log("Product deleted:", id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDelete2 = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/review/${id}`);
      setProducts(products.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const { id } = useParams();
  const filteredData = products?.filter((user) => user?._id === id);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleEdit = (user) => {
    setShowModal(true);
    setEditId(user._id);
    setPName(user.pname);
    setPdesc(user.pdesc);
    setPspec(user.pspec);
  };

  return (
    <div className="">
      <h1>Products</h1>
      <br />
      <br />
      <div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}> &times;</span>
              <h2>Enter Your Details</h2>
              <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <input type="text" value={pname} placeholder="Name" onChange={(e) => setPName(e.target.value)} required /><br /><br />
                  <input   type="text"  value={pdesc}  placeholder="Description"  onChange={(e) => setPdesc(e.target.value)}  required/><br /><br />
                  <input   type="text"  value={pspec}  placeholder="Specification"  onChange={(e) => setPspec(e.target.value)}  required/><br /><br />
                  <button type="submit" className="icon" >Edit</button>
                </form>
              </div>
            </div>
          </div>
        )}
        {filteredData &&
          filteredData?.map((prod) => (
            <div key={prod._id}>
              <table>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Specification</th>
                </tr>
                <tr>
                  <td>{prod.pname}</td>
                  <td>{prod.pdesc}</td>
                  <td>{prod.pspec}</td>
                </tr>
                <tr>
                  <td><button onClick={() => handleEdit(prod)} className="icon">update</button><br/></td>
                  <td><button onClick={() => handleDelete(prod._id)} className="icon">Delete</button><br/></td>
                </tr>
              </table>
              
              
            </div>
          ))}
      </div><br/><br/>
      <Link to="/addrew" ><button className="icon" style={{marginLeft:450}}>Add Review</button></Link>
      <div>
        {review &&review?.map((review) => (
            <div key={review._id}> 
              <p>{review.rat}</p>
              <p>{review.rew}</p>
              
              <button onClick={() => handleDelete2(review._id)} className="icon">Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
