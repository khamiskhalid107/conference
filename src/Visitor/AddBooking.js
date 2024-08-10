import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Button, Table, Modal } from 'react-bootstrap';

import Nav from '../component/Navigation/Nav';

const AddBooking = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);

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

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentStaff(null);
  };

  const handleAddBooking = () => {
    setShowModal(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {/* <Nav /> */}
      <div className="main"></div>
      <div className="container">
        <h2>Staff List</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
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
                <td>{staff.staffNo}</td>
                <td>{staff.staffService}</td>
                <td>{staff.staffLocation}</td>
                <td>
                  <Button variant="success" onClick={() => handleAddBooking()}>
                    Add Booking
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Booking</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Add Booking Form or Content Here */}
            <p>Booking form will be implemented here.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary">
              Save Booking
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AddBooking;
