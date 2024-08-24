import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Card from 'react-bootstrap/Card';

import Nav from '../component/Navigation/Nav';

function Visitordash() {
  const [bookingCount, setBookingCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Fetch booking count
    axios.get('http://localhost:4500/API/Booking1/booking1Count')
      .then(response => setBookingCount(response.data))
      .catch(error => console.error('Error fetching booking count:', error));

    // Fetch visitor count
    axios.get('http://localhost:4500/api/all/Visitor')
      .then(response => {
        if (Array.isArray(response.data)) {
          setVisitorCount(response.data.length);
        } else {
          setVisitorCount(0);
        }
      })
      .catch(error => console.error('Error fetching visitor count:', error));
  }, []);

  return (
    <>
      <Nav />
      <div className="container mt-">
        <div className="row" style={{ marginTop:"10%",width:"80%",marginLeft:"20%"}}>
          <div className="col-md-6" >
            <Card>
              <Card.Body>
                <Card.Title>Booking Count</Card.Title>
                <Card.Text>
                  {bookingCount}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6">
            <Card>
              <Card.Body>
                <Card.Title>Visitor Count</Card.Title>
                <Card.Text>
                  {visitorCount}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Visitordash;
