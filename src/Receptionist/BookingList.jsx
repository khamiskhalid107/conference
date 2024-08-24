// src/component/BookingList.js
import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Modal, Button, Table } from 'react-bootstrap';

const BookingList = ({ onClose }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:4500/Staff/Api/allBookings');
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings", error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <Modal show={true} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>All Bookings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Customer Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                {/* <td>{booking.id}</td> */}
                <td>{booking.visitor?.username}</td>
                <td>{booking.date}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingList;
