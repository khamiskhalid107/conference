import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Nav from '../component/Navigation/Nav';
import VisitorUpdateForm from '../Visitor/VisitorUpdateForm';
import AddVisitor from '../Visitor/Addvisitor';
import 'bootstrap/dist/css/bootstrap.min.css';

const Addstatus = () => {
  const [visitors, setVisitors] = useState([]);
  const [editingVisitor, setEditingVisitor] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/all/Visitor');
      setVisitors(response.data);
    } catch (error) {
      console.error("Error fetching visitors", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="d-flex">
        <div className="container mt-5">
          <h1 className="text-center mb-4">Visitor Dashboard</h1>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Visitor ID</th>
                {/* <th>Visitor Username</th> */}
                <th>Visitor Full Name</th>
                {/* <th>Visitor Email</th> */}
                <th>Visitor Purpose</th>
                <th>Add Status</th>
                {/* <th>Visitor Phone</th> */}
                {/* <th>Visitor Password</th> */}
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {visitors.map(visitor => (
                <tr key={visitor.id}>
                  <td>{visitor.id}</td>
                  {/* <td>{visitor.username}</td> */}
                  <td>{visitor.fullname}</td>
                  {/* <td>{visitor.email}</td> */}
                  <td>{visitor.v_purpose}</td>
                  <td>
                        <button style={{ backgroundColor: 'red', border: 'none', color: 'white', padding: '5px 10px', marginRight: '5px' }}>Unavailable</button>
                        <button style={{ backgroundColor: 'yellow', border: 'none', color: 'black', padding: '5px 10px', marginRight: '5px' }}>temporary un available</button>
                        <button style={{ backgroundColor: 'green', border: 'none', color: 'white', padding: '5px 10px' }}>available</button>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        
        </div>
      </div>
    </>
  );
};

export default Addstatus;
