import React, { useEffect, useState } from 'react';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from '../component/Navigation/Nav';

function ReceptDash() {
  const [availableCount, setAvailableCount] = useState(0);
  const [unavailableCount, setUnavailableCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0); // New state for total bookings

  useEffect(() => {
    fetchStatusCounts();
    fetchBookingCount(); // Fetch the total bookings count
  }, []);

  const fetchStatusCounts = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/statusCounts');
      setAvailableCount(response.data.available);
      setUnavailableCount(response.data.unavailable);
      setPendingCount(response.data.pending);
    } catch (error) {
      console.error("Error fetching status counts", error);
    }
  };

 
  const fetchBookingCount = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/bookingCount');
      console.log("Booking Count Data:", response.data); // Debugging line
      setBookingCount(response.data);
    } catch (error) {
      console.error("Error fetching booking count", error);
    }
  };
  

  
  return (
    <>
      <Nav />
      <div className='main1'>
        <h2>Admin Dashboard</h2>
        <div className='d-flex justify-content-around mt-4'>
          <div className='card text-center'>
            <div className='card-body'>
              <h5 className='card-title'>Available</h5>
              <p className='card-text'>{availableCount}</p>
            </div>
          </div>
          <div className='card text-center'>
            <div className='card-body'>
              <h5 className='card-title'>Unavailable</h5>
              <p className='card-text'>{unavailableCount}</p>
            </div>
          </div>
          <div className='card text-center'>
            <div className='card-body'>
              <h5 className='card-title'>Pending</h5>
              <p className='card-text'>{pendingCount}</p>
            </div>
          </div>
          <div className='card text-center'>
            <div className='card-body'>
              <h5 className='card-title'>Total Bookings</h5>
              <p className='card-text'>{bookingCount}</p> {/* Display the total bookings */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReceptDash;
