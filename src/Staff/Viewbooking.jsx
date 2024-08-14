import React, { useState, useEffect } from 'react';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings from the Spring Boot backend
    axios.get('http://localhost:4500/Staff/Api/allBookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the bookings!", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-black">Bookings</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Staff ID</th>
            <th>Date</th>
            {/* <th>Time</th> */}
            <th>Service name</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.bookingId}</td>
              <td>{booking.id}</td>
              <td>{booking.date}</td>
              {/* <td>{booking.time}</td> */}
              <td>{booking.serviceName}</td>
              <td>{booking.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewBooking;
