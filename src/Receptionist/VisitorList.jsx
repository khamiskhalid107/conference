// src/component/VisitorList.js
import React, { useEffect, useState } from 'react';

import axios from 'axios';

const VisitorList = ({ onClose }) => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axios.get('http://localhost:4500/api/all/Visitor');
        setVisitors(response.data);
      } catch (err) {
        setError('Error fetching visitor data');
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={onClose}>Close</button>
      <table className="table">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Username</th>
            <th>Email</th>
            {/* <th>Role</th> */}
            <th>Phone</th>
            {/* <th>Purpose</th> */}
          </tr>
        </thead>
        <tbody>
          {visitors.map(visitor => (
            <tr key={visitor.id}>
              {/* <td>{visitor.id}</td> */}
              <td>{visitor.username}</td>
              <td>{visitor.email}</td>
              {/* <td>{visitor.role}</td> */}
              <td>{visitor.phone}</td>
              {/* <td>{visitor.v_purpose}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorList;
