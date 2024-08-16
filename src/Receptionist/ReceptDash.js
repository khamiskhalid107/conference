// src/component/ReceptDash.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarCheck, faCogs, faUserTie } from '@fortawesome/free-solid-svg-icons';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Modal, Button } from 'react-bootstrap'; 

import Nav from '../component/Navigation/Nav';

import BookingList from './BookingList'; 
import StaffList from './StaffList';
import VisitorList from './VisitorList';// Import Bootstrap Modal and Button

function ReceptDash() {
  const [availableCount, setAvailableCount] = useState(0);
  const [unavailableCount, setUnavailableCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showVisitorList, setShowVisitorList] = useState(false);
  const [showStaffList, setShowStaffList] = useState(false);
  const [showBookingList, setShowBookingList] = useState(false);

  useEffect(() => {
    fetchStatusCounts();
    fetchBookingCount();
    fetchStaffCount();
    fetchVisitorCount();
    fetchServiceCount();
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

  const fetchServiceCount = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/count/services');
      setServiceCount(response.data);
    } catch (error) {
      console.error('Error fetching service count:', error);
    }
  };

  const handleShowVisitorList = () => setShowVisitorList(true);
  const handleCloseVisitorList = () => setShowVisitorList(false);

  const handleShowStaffList = () => setShowStaffList(true);
  const handleCloseStaffList = () => setShowStaffList(false);

  const handleShowBookingList = () => setShowBookingList(true);
  const handleCloseBookingList = () => setShowBookingList(false);

  return (
    <>
      <Nav />
      <div className='main1'>
        <h2>Admin Dashboard</h2>
        <div className='d-flex justify-content-around mt-4'>
          <div className='card text-center' style={{ backgroundColor: '#d1e7dd', color: '#0f5132' }} onClick={handleShowVisitorList}>
            <div className='card-body'>
              <h5 className='card-title'>
                <FontAwesomeIcon icon={faUsers} /> Total Visitors
              </h5>
              <p className='card-text'>{totalVisitors}</p>
            </div>
          </div>
          <div className='card text-center' style={{ backgroundColor: '#cfe2ff', color: '#003c8f' }}>
            <div className='card-body'>
              <h5 className='card-title'>
                <FontAwesomeIcon icon={faCogs} /> Total Services
              </h5>
              <p className='card-text'>{serviceCount}</p>
            </div>
          </div>
          <div className='card text-center' style={{ backgroundColor: '#fff3cd', color: '#856404' }} onClick={handleShowBookingList}>
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
          <div className='card text-center' style={{ backgroundColor: '#f8d7da', color: '#721c24' }} onClick={handleShowStaffList}>
            <div className='card-body'>
              <h5 className='card-title'>
                <FontAwesomeIcon icon={faUserTie} /> Total Staff
              </h5>
              <p className='card-text'>{staffCount}</p>
            </div>
          </div>
        </div>
        {/* Modals */}
        <Modal show={showVisitorList} onHide={handleCloseVisitorList}>
          <Modal.Header closeButton>
            <Modal.Title>Visitor List</Modal.Title>
          </Modal.Header>
          <Modal.Body><VisitorList onClose={handleCloseVisitorList} /></Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseVisitorList}>
              Close
            </Button>
          </Modal.Footer> */}
        </Modal>
        <Modal show={showStaffList} onHide={handleCloseStaffList}>
          <Modal.Header closeButton>
            <Modal.Title>Staff List</Modal.Title>
          </Modal.Header>
          <Modal.Body><StaffList onClose={handleCloseStaffList} /></Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseStaffList}>
              Close
            </Button>
          </Modal.Footer> */}
        </Modal>
        <Modal show={showBookingList} onHide={handleCloseBookingList}>
          <Modal.Header closeButton>
            <Modal.Title>Booking List</Modal.Title>
          </Modal.Header>
          <Modal.Body><BookingList onClose={handleCloseBookingList} /></Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseBookingList}>
              Close
            </Button>
          </Modal.Footer> */}
        </Modal>
      </div>
    </>
  );
}

export default ReceptDash;
