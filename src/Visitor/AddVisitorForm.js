import React, { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <h2>Edit Visitor</h2>
      <label>
        UserName:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <br />
      <label>
        Full Name:
        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Purpose:
        <input type="text" name="v_purpose" value={formData.v_purpose} onChange={handleChange} />
      </label>
      <br />
      <label>
        Phone:
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default VisitorUpdateForm;