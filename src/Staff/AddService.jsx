import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Form, Button, Table, Container, Alert, Modal } from 'react-bootstrap';

import Nav from '../component/Navigation/Nav';

const AddService = () => {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);

  const userId = parseInt(localStorage.getItem('userId'));

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

    const newService = {
      staff: { id: userId },
      serviceName,
      serviceDesc
    };

    axios.post('http://localhost:4500/api/add/service', newService)
      .then(response => {
        setServices([...services, response.data]);
        setServiceName('');
        setServiceDesc('');
        setSuccess('Service added successfully');
        setError('');
        setShowModal(false); // Close the modal on success
      })
      .catch(() => {
        setError('Error adding service');
        setSuccess('');
      });
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Nav />
      <Container  style={{ width:"1100px" , marginLeft:"300px"}}>
        <h2>Add New Service</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Button variant="primary" onClick={handleShowModal}>
          Add Service
        </Button>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                Save Service
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

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
