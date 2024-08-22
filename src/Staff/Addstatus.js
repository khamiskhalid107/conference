import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Modal, Button } from 'react-bootstrap';

import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import 'bootstrap/dist/css/bootstrap.min.css';

import AddVisitor from '../Visitor/Addvisitor';
import VisitorUpdateForm from '../Visitor/VisitorUpdateForm';
import Nav from '../component/Navigation/Nav';

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
      // const response = await axios.get('http://localhost:8080/api/all/visitor');
      const visitorsWithStatus = response.data.map(visitor => ({
        ...visitor,
        status: visitor.status || 'pending', // Set default status to "pending"
      }));
      setVisitors(visitorsWithStatus);
    } catch (error) {
      console.error("Error fetching visitors", error);
    }
  };

  const toggleStatus = async (visitorId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'available' ? 'unavailable' : 'available';
      await axios.patch(`http://localhost:4500/api/users/${visitorId}/status`, { status: newStatus });
      // await axios.patch(`http://localhost:8080/api/users/${visitorId}/status`, { status: newStatus });
      // Update the status locally after successful request
      setVisitors(visitors.map(visitor =>
        visitor.id === visitorId ? { ...visitor, status: newStatus } : visitor
      ));
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const setInitialStatus = async (visitorId) => {
    try {
      const newStatus = 'available'; // Default to 'available' or any initial status you prefer
      await axios.patch(`http://localhost:4500/api/users/${visitorId}/status`, { status: newStatus });
      // await axios.patch(`http://localhost:8080/api/users/${visitorId}/status`, { status: newStatus });
      setVisitors(visitors.map(visitor =>
        visitor.id === visitorId ? { ...visitor, status: newStatus } : visitor
      ));
    } catch (error) {
      console.error("Error setting initial status", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="d-flex">
        <div className="container mt-5" style={{ width:"1200px" , marginLeft:"300px"}} >
          <h1 className="text-center mb-4">Visitor Dashboard</h1>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Visitor ID</th>
                <th>Visitor Full Name</th>
                <th>Visitor Purpose</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map(visitor => (
                <tr key={visitor.id}>
                  <td>{visitor.id}</td>
                  <td>{visitor.fullname}</td>
                  <td>{visitor.v_purpose}</td>
                  <td>{visitor.status}</td>
                  <td>
                    {visitor.status === 'pending' ? (
                      <button
                        style={{
                          backgroundColor: 'blue',
                          border: 'none',
                          color: 'white',
                          padding: '5px 10px',
                          marginRight: '5px'
                        }}
                        onClick={() => setInitialStatus(visitor.id)}
                      >
                        Add Status
                      </button>
                    ) : (
                      <button
                        style={{
                          backgroundColor: visitor.status === 'available' ? 'green' : 'red',
                          border: 'none',
                          color: 'white',
                          padding: '5px 10px',
                          marginRight: '5px'
                        }}
                        onClick={() => toggleStatus(visitor.id, visitor.status)}
                      >
                        {visitor.status === 'available' ? 'Set Unavailable' : 'Set Available'}
                      </button>
                    )}
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
