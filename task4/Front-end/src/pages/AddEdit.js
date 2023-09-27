import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"
import axios from 'axios';
import "./AddEdit.css";
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';


const initialstate = {
  name: "",
  empid: "",
  email: "",
  contact: "",
};

const AddEdit = () => {

  const [state, setState] = useState(initialstate)
  const { name, empid, email, contact } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${id}`);
      if (response.status === 200) {
        setState({ ...response.data[0] });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  const addUser = async (data) => {
    const response = await axios.post("http://localhost:5000/user", data)
    if (response.status === 200) {
      toast.success(response.data);
      history.push("/");
      // Call the callback function to update data in Home component
    }
  }

  const updateUser = async (data, id) => {
     {
      const response = await axios.put(`http://localhost:5000/user/${id}`, data);
      if (response.status === 200) {
        toast.success(response.data);
        history.push("/");
      }
    } }

  const handleSumbit = (e) => {
    e.preventDefault();
    if (!name || !empid || !email || !contact) {
      toast.error("Please provide a value to the field!!")
    } else {
      if(!id){
        addUser(state);
      }else{
        updateUser(state, id)
      }
    setTimeout(()=> history.push("/"),500) 
    }

  }

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  }
  return (
    <div style={{ marginTop: "100px", display: "flex" }}>

      <form style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: "center",
      }}>
        <label htmlFor='Name' >Name</label>
        <input type='text'
          id='name'
          name='name'
          placeholder='Enter name...'
          onChange={handleInputChange}
          value={name}

        />

        <label htmlFor='Empid'>Empid</label>
        <input type='text'
          id='empid'
          name='empid'
          placeholder='Enter Empid...'
          onChange={handleInputChange}
          value={empid}
        />

        <label htmlFor='Email'>Email</label>
        <input type='text'
          id='email'
          name='email'
          placeholder='Enter Email...'
          onChange={handleInputChange}
          value={email}
        />

        <label htmlFor='contact'>contact</label>
        <input type='text'
          id='contact'
          name='contact'
          placeholder='Enter contact...'
          onChange={handleInputChange}
          value={contact}
        />

        <input type="sumbit" value={id ? "Update" : "Add"} onClick={handleSumbit} />
      </form>
    </div>
  )
}

export default AddEdit

