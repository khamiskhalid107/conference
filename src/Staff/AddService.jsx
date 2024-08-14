import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Form, Button, Table, Container, Alert } from 'react-bootstrap';

import Nav from '../component/Navigation/Nav';

const AddService = () => {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const userId = parseInt(localStorage.getItem('userId'));

//   const userId = 4; // Replace with the correct staff ID

  useEffect(() => {
    axios.get('http://localhost:4500/api/all/Service')
      .then(response => {
        const filteredServices = response.data.filter(service => service.staff && service.staff.id === userId);
        setServices(filteredServices);
      })
      .catch(() => {
        setError('Error fetching services');
      });
  }, [userId]);
  

  const handleAddService = (e) => {
    e.preventDefault();

    // Default staff ID set to 4
    const newService = {
      staff: { id: userId },  // Set the default staff ID
      serviceName,
      serviceDesc
    };

    axios.post('http://localhost:4500/api/add/service', newService)
      .then(response => {
        setServices([...services, response.data]); // Add the new service to the list
        setServiceName('');
        setServiceDesc('');
        setSuccess('Service added successfully');
        setError('');
      })
      .catch(() => {
        setError('Error adding service');
        setSuccess('');
      });
  };

  return (
    <>
      <Nav />
      <Container>
        <h2>Add New Service</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleAddService}>
          <Form.Group className="mb-3">
            <Form.Label>Service Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter service name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Service Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter service description"
              value={serviceDesc}
              onChange={(e) => setServiceDesc(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Service
          </Button>
        </Form>

        <h3 className="mt-5">Existing Services</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Service Name</th>
              <th>Service Description</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.S_id}>
                <td>{service.S_id}</td>
                <td>{service.serviceName}</td>
                <td>{service.serviceDesc}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default AddService;
