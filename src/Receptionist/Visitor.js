import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Nav from '../component/Navigation/Nav';
import VisitorUpdateForm from '../Visitor/VisitorUpdateForm';
import AddVisitor from '../Visitor/Addvisitor';
import 'bootstrap/dist/css/bootstrap.min.css';

const Visitor = () => {
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

  const deleteVisitor = async (id) => {
    try {
      await axios.delete(`http://localhost:4500/api/visitor/delete${id}`);
      setVisitors(visitors.filter(visitor => visitor.id !== id));
    } catch (error) {
      console.error("Error deleting visitor", error);
    }
  };

  const handleUpdate = (updatedVisitor) => {
    setVisitors(visitors.map(visitor => (visitor.id === updatedVisitor.id ? updatedVisitor : visitor)));
    setEditingVisitor(null);
    setShowEditModal(false);
  };

  const handleEdit = (visitor) => {
    setEditingVisitor(visitor);
    setShowEditModal(true);
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
                <th>Visitor Username</th>
                <th>Visitor Full Name</th>
                <th>Visitor Email</th>
                <th>Visitor Purpose</th>
                <th>Visitor Phone</th>
                <th>Visitor Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map(visitor => (
                <tr key={visitor.id}>
                  <td>{visitor.id}</td>
                  <td>{visitor.username}</td>
                  <td>{visitor.fullname}</td>
                  <td>{visitor.email}</td>
                  <td>{visitor.v_purpose}</td>
                  <td>{visitor.phone}</td>
                  <td>{visitor.pasword}</td> 
                  <td>
                    <FaEdit
                      className="text-warning mr-2"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleEdit(visitor)}
                    />
                    <FaTrashAlt
                      className="text-danger"
                      style={{ cursor: 'pointer' }}
                      onClick={() => deleteVisitor(visitor.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center">
            <Button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              Add Visitor
            </Button>
          </div>

          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Visitor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {editingVisitor && (
                <VisitorUpdateForm
                  visitor={editingVisitor}
                  onUpdate={handleUpdate}
                  onCancel={() => setShowEditModal(false)}
                />
              )}
            </Modal.Body>
          </Modal>

          <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add Visitor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddVisitor onSuccess={() => {
                fetchVisitors();
                setShowAddModal(false);
              }} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Visitor;
