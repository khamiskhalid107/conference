import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faClock, faCalendarCheck, faUserTie } from '@fortawesome/free-solid-svg-icons';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from '../component/Navigation/Nav';

function ReceptDash() {
  const [availableCount, setAvailableCount] = useState(0);
  const [unavailableCount, setUnavailableCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatusCounts();
    fetchBookingCount();
    fetchStaffCount();
    fetchVisitorCount();
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
      const response = await axios.get('http://localhost:4500/Staff/Api/bookingCount');
      setBookingCount(response.data);
    } catch (error) {
      console.error("Error fetching booking count", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffCount = async () => {
    try {
      const response = await axios.get('http://localhost:4500/Staff/Api/count');
      setStaffCount(response.data);
    } catch (error) {
      console.error("Error fetching staff count", error);
    }
  };

  const fetchVisitorCount = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/count/visitors');
      setTotalVisitors(response.data);
    } catch (error) {
      console.error('Error fetching visitor count', error);
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
              <h5 className='card-title'>
                <FontAwesomeIcon icon={faUsers} /> Total Visitors
              </h5>
              <p className='card-text'>{totalVisitors}</p>
            </div>
          </div>
          <div className='card text-center'>
            <div className='card-body'>
              <h5 className='card-title'>
                <FontAwesomeIcon icon={faClock} /> Unavailable
              </h5>
              <p className='card-text'>{unavailableCount}</p>
            </div>
          </div>
          <div className='card text-center'>
            <div className='card-body'>
              <h5 className='card-title'>
                <FontAwesomeIcon icon={faCalendarCheck} /> Total Bookings
              </h5>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <p className='card-text'>{bookingCount}</p>
              )}
            </div>
          </div>
          <div className='card text-center'>
            <div className='card-body'>
              <h5 className='card-title'>
                <FontAwesomeIcon icon={faUserTie} /> Total Staff
              </h5>
              <p className='card-text'>{staffCount}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReceptDash;
