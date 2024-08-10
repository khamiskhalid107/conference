import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { FaEdit, FaTrash } from 'react-icons/fa'; 

import { Modal, Button, Table } from 'react-bootstrap';

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4500/Staff/Api/all')
      .then(response => {
        setStaffList(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching staff data');
        setLoading(false);
      });
  }, []);

  const handleEdit = (staff) => {
    setCurrentStaff(staff);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (staffId) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      axios.delete(`http://localhost:4500/Staff/Api/delete/${staffId}`)
        .then(() => {
          setStaffList(staffList.filter(staff => staff.id !== staffId));
          alert('Staff member deleted successfully.');
        })
        .catch(() => {
          alert('Error deleting staff member.');
        });
    }
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:4500/Staff/Api/update/${currentStaff.id}`, currentStaff)
      .then(() => {
        setStaffList(staffList.map(staff => (staff.id === currentStaff.id ? currentStaff : staff)));
        setShowModal(false);
        alert('Staff member updated successfully.');
      })
      .catch(() => {
        alert('Error updating staff member.');
      });
  };

  const handleAdd = () => {
    setCurrentStaff({
      id: '',
      fullname: '',
      username: '',
      pasword: '',
      role: 'Staff',
      staffNo: '',
      staffService: '',
      staffLocation: '1st room' // Default to the first room
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleSave = () => {
    if (isEditing) {
      handleUpdate();
    } else {
      axios.post('http://localhost:4500/Staff/Api/add', currentStaff)
        .then(response => {
          setStaffList([...staffList, response.data]);
          setShowModal(false);
          alert('Staff member added successfully.');
        })
        .catch(() => {
          alert('Error adding staff member.');
        });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentStaff(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h2>Staff List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
            <th>Staff Number</th>
            <th>Service</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map(staff => (
            <tr key={staff.id}>
              <td>{staff.id}</td>
              <td>{staff.fullname}</td>
              <td>{staff.username}</td>
              <td>{staff.pasword}</td>
              <td>{staff.role}</td>
              <td>{staff.staffNo}</td>
              <td>{staff.staffService}</td>
              <td>{staff.staffLocation}</td>
              <td>
                <button onClick={() => handleEdit(staff)} className="btn btn-sm btn-warning">
                  <FaEdit />
                </button>{' '}
                <button onClick={() => handleDelete(staff.id)} className="btn btn-sm btn-danger">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="success" onClick={handleAdd}>
        Add Staff
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Staff' : 'Add Staff'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentStaff && (
            <div>
              {!isEditing && <p>ID: {currentStaff.id}</p>}
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentStaff.fullname}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, fullname: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentStaff.username}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, username: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={currentStaff.pasword}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, pasword: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentStaff.role}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Staff Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentStaff.staffNo}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, staffNo: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Service</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentStaff.staffService}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, staffService: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <select
                  className="form-control"
                  value={currentStaff.staffLocation}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, staffLocation: e.target.value })}
                >
                  <option value="1st room">1st room</option>
                  <option value="2nd room">2nd room</option>
                  <option value="3rd room">3rd room</option>
                  <option value="4th room">4th room</option>
                  <option value="5th room">5th room</option>
                </select>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {isEditing ? 'Update' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Staff;
