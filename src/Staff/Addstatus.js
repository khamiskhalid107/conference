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

  const toggleStatus = async (visitorId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'available' ? 'unavailable' : 'available';
      await axios.patch(`http://localhost:4500/api/users/${visitorId}/status`);
      // Update the status locally after successful request
      setVisitors(visitors.map(visitor =>
        visitor.id === visitorId ? { ...visitor, status: newStatus } : visitor
      ));
    } catch (error) {
      console.error("Error updating status", error);
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
