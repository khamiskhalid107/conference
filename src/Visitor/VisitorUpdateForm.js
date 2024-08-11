import React, { useState } from 'react';

import axios from 'axios';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const VisitorUpdateForm = ({ visitor, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState(visitor);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4500/api/update/visitor${formData.id}`, formData);
      // const response = await axios.put(`http://localhost:8080/api/update/visitor${formData.id}`, formData);
      if (response.status === 200) {
        onUpdate(response.data);
      } else {
        console.error("Failed to update visitor", response);
      }
    } catch (error) {
      console.error("Error updating visitor", error);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Edit Visitor</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formUsername">
          <Form.Label column sm={2}>UserName</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} controlId="formFullname">
          <Form.Label column sm={2}>Full Name</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="fullname" value={formData.fullname} onChange={handleChange} />
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} controlId="formEmail">
          <Form.Label column sm={2}>Email</Form.Label>
          <Col sm={10}>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} controlId="formVPurpose">
          <Form.Label column sm={2}>Purpose</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="v_purpose" value={formData.v_purpose} onChange={handleChange} />
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} controlId="formPhone">
          <Form.Label column sm={2}>Phone</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} controlId="formPassword">
          <Form.Label column sm={2}>Password</Form.Label>
          <Col sm={10}>
            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
          </Col>
        </Form.Group>
        
        <Button variant="primary" type="submit" className="mr-2">Save</Button>
        <Button variant="secondary" type="button" onClick={onCancel}>Cancel</Button>
      </Form>
    </Container>
  );
};

export default VisitorUpdateForm;
