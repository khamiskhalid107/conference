import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Nav from '../component/Navigation/Nav';

const Viewvisitor = () => {
  const [visitors, setVisitors] = useState([]);
  const [editingVisitor, setEditingVisitor] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [data , setData]  = useState('');

  const userId = parseInt(localStorage.getItem('userId'));

  useEffect(()=>{
    axios.get(`http://localhost:4500/api/byId${userId}`)
    // axios.get(`http://localhost:8080/api/byId${userId}`)
    .then((response)=>{
      setData(response.data);
      console.log(response.data);
    })
  })

  return (
    <>
      <Nav />
      <div className="d-flex">
        <div className="container mt-5">
          <h1 className="text-center mb-4">Visitor Dashboard</h1>

          <h1>Full Name: {data.fullname}</h1>
          <h1>UserName: {data.username}</h1>
          <h1>Email: {data.email}</h1>
          <h1>Purpose: {data.v_purpose}</h1>
          <h1>Phone number: {data.phone}</h1>
          {/* <h1>Password: {data.pasword}</h1> */}
          <h1>Status :{data.status}</h1>

 
         
          
  
        </div>
      </div>
    </>
  );
};

export default Viewvisitor;
