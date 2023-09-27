import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';
import "./Home.css"
import { toast } from 'react-toastify';



const Home = () => {
    const [data, setData] = useState()
    const [showAll, setShowAll] = useState(false);
  

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const response = await axios.get("http://localhost:5000/users")
        if (response.status === 200) {
            setData(response.data);
        }
    }
   
    console.log("data=>", data)

    const onDeleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
         const response = await axios.delete(`http://localhost:5000/user/${id}`)
         if(response.status === 200){
            toast.success(response.data)
         }
      }
    }
      
    return (

        <div style={{ marginTop: "130px" }}>
            <table className='style-table'>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>NO.</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>empid</th>
                        <th style={{ textAlign: "center" }}>email</th>
                        <th style={{ textAlign: "center" }}>contact</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {data &&
                        data.map((item, index) => {
                            // Use showAll state to determine whether to show all rows or only the top 10
                            if (!showAll && index > 100) {
                                return null; // Hide rows beyond the first 10 if showAll is false
                            }
                            return (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.empid}</td>
                                    <td>{item.email}</td>
                                    <td>{item.contact}</td>
                                    <td>
                                        <Link to={`/update/${item.id}`}><button className='btn btn-edit'>EDIT</button></Link>
                                        <button className='btn btn-delete' onClick={()=> onDeleteUser(item.id)}>DELETE</button>
                                        <Link to={`/view/${item.id}`}><button className='btn btn-view'>VIEW</button></Link>
                                    </td>
                                </tr>
                            );
                        })}

                </tbody>
            </table>
        </div>
    ) }

export default Home;

