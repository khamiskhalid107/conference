import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Button, Table, Modal, Form } from 'react-bootstrap';

import Nav from '../component/Navigation/Nav';

const AddBooking = () => {
  const today = new Date().toISOString().split('T')[0];
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);

  const [bookingDetails, setBookingDetails] = useState({
    staffId: 10,
    date: today,
    time: {
      hour: 0,
      minute: 0,
      second: 0,
      nano: 0
    },
    notes: '',
    status: '',
    bookingId: 1
  });

  const visitorId = parseInt(localStorage.getItem('userId'));

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
    setBookingDetails({
      staffId: 0,
      date: today,
      time: {
        hour: 0,
        minute: 0,
        second: 0,
        nano: 0
      },
      notes: '',
      status: '',
      bookingId: 0
    });
  };

  const handleAddBooking = (staff) => {
    setCurrentStaff(staff);
    setBookingDetails({
      ...bookingDetails,
      staffId: staff.id
    });
    setShowModal(true);
  };

  const handleSaveBooking = () => {
    if (currentStaff) {
      axios.post('http://localhost:4500/Staff/Api/addBooking', bookingDetails)
        .then(response => {
          // Handle success (e.g., close modal, show success message, etc.)
          handleCloseModal();
        })
        .catch(error => {
          // Handle error (e.g., show error message)
          console.error('There was an error saving the booking!', error);
        });
    }
  };

  const [services, setServices] = useState([]);

  useEffect(() => {
    if (currentStaff) {
      axios.get('http://localhost:4500/api/all/Service')
        .then(response => {
          const staffId = currentStaff.id;
          const staffServices = response.data.filter(service => service.staff.id === staffId);
          setServices(staffServices);
        })
        .catch(error => {
          console.error('Error fetching services:', error);
        });
    }
  }, [currentStaff]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="main1"></div>
      <div className="container">
        <h2>Add Staff Booking</h2>
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
                  <Button variant="success" onClick={() => handleAddBooking(staff)}>
                    Add Booking
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Booking for {currentStaff?.fullname} {currentStaff?.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  min={today}
                  value={bookingDetails.date}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formTime">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  value={`${bookingDetails.time.hour.toString().padStart(2, '0')}:${bookingDetails.time.minute.toString().padStart(2, '0')}`}
                  onChange={(e) => {
                    const [hour, minute] = e.target.value.split(':');
                    setBookingDetails({
                      ...bookingDetails,
                      time: {
                        ...bookingDetails.time,
                        hour: parseInt(hour, 10),
                        minute: parseInt(minute, 10)
                      }
                    });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formNotes">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={bookingDetails.notes}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, notes: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formService">
                <Form.Label>Service</Form.Label>
                <Form.Control as="select" value={bookingDetails.service} onChange={(e) => setBookingDetails({ ...bookingDetails, service: e.target.value })}>
                  {services.map(service => (
                    <option key={service.s_id} value={service.serviceName}>
                      {service.serviceName} - {service.serviceDesc}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveBooking}>
              Save Booking
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AddBooking;
