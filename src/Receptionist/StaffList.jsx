// src/component/StaffList.js
import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Nav from '../component/Navigation/Nav';

function StaffList({ onClose }) {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:4500/Staff/Api/all');
        setStaff(response.data);
      } catch (error) {
        console.error('Error fetching staff list', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  return (
    <>
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Staff List</h5>
            {/* <button type="button" className="close" onClick={onClose}>
      <span aria-hidden="true">&times;</span>
    </button> */}
          </div>
          <div className="modal-body">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    {/* <th>Staff No</th> */}
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Location</th>
                    {/* <th>Service</th> */}
                  </tr>
                </thead>
                <tbody>
                  {staff.map((s) => (
                    <tr key={s.staffNo}>
                      {/* <td>{s.staffNo}</td> */}
                      <td>{s.fullname}</td>
                      <td>{s.username}</td>
                      <td>{s.email}</td>
                      <td>{s.staffLocation}</td>
                      {/* <td>{s.staffService}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div></>
  );
}

export default StaffList;
