import React, { useState, useEffect } from 'react';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from '../component/Navigation/Nav';

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4500/API/Booking1/allBooking1')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the bookings!", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4500/API/Booking1/deleteBooking1/${id}`)
      .then(() => {
        setBookings(bookings.filter(booking => booking.bookingId !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the booking!", error);
      });
  };

  const handleUpdateStatus = (id, status) => {
    axios.put(`http://localhost:4500/API/Booking1/updateBookingStatus/${id}`, status, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
    .then(response => {
      setBookings(bookings.map(booking =>
        booking.bookingId === id ? response.data : booking
      ));
    })
    .catch(error => {
      console.error("There was an error updating the booking status!", error);
    });
  };

  return (
    <>
      <Nav />
      <div className="container mt-5" style={{ backgroundColor: "blue", width: "1100px", marginLeft: "300px" }}>
        <h2 className="text-black">Bookings</h2>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Booking ID</th>
              <th>Staff ID</th>
              <th>Date</th>
              <th>Service Name</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.bookingId}>
                <td>{booking.bookingId}</td>
                <td>{booking.staffId}</td>
                <td>{booking.date}</td>
                <td>{booking.service}</td>
                <td>{booking.notes}</td>
                <td>{booking.status}</td>
                <td>
                  <button 
                    className="btn btn-success"
                    onClick={() => handleUpdateStatus(booking.bookingId, "Accepted")}
                  >
                    Accept
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleUpdateStatus(booking.bookingId, "Rejected")}
                  >
                    Reject
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(booking.bookingId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewBooking;
