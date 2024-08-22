import React, { useState } from 'react';

import axios from 'axios';

import Nav from '../component/Navigation/Nav';

const CheckBookingStatus = () => {
  const [bookingId, setBookingId] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [error, setError] = useState('');

  const handleCheckStatus = () => {
    axios.get(`http://localhost:4500/Staff/Api/bookingStatus/${bookingId}`)
      .then(response => {
        setBookingStatus(response.data.status);
      })
      .catch(() => {
        setError('Error fetching booking status');
      });
  };

  return (
    <><Nav />
    <div className="container" style={{ marginLeft:"300px",width:"1200px"}}>
      <h2>Check Booking Status</h2>
      <input   type="text"  value={bookingId} onChange={(e) => setBookingId(e.target.value)}
        placeholder="Enter your booking ID" style={{marginTop:"100px"}}/>
      <button onClick={handleCheckStatus}>Check Status</button>

      {bookingStatus && <div>Booking Status: {bookingStatus}</div>}
      {error && <div>{error}</div>}
    </div></>
  );
};

export default CheckBookingStatus;
