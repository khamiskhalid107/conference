import React, { useState } from 'react';

import axios from 'axios';

import Nav from '../component/Navigation/Nav';

import './Registration.css';

const AddVisitor = ({ onSuccess }) => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhonenumber] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');
  const [notification, setNotification] = useState('');
  const [status, setStatus] = useState("unavailable")

  const handleSubmits = (event) => {
    event.preventDefault();
    
    // Ensure status is set to "unavailable"
    const requestData = {
      username: username,
      email: email,
      phone: phone,
      password: password,
      Status: status,  
      fullname: fullname,
      v_purpose: purpose,
      role: "Visitor"
    };

    axios.post('http://localhost:4500/api/add/visitor', requestData)
    // axios.post('http://localhost:8080/api/add/visitor', requestData)
      .then(response => {
        console.log(response.data);
        setNotification('Visitor added successfully!');
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          }
        }, 1000);
      })
      .catch(error => {
        console.error("There was an error registering the user!", error);
        setNotification('There was an error registering the user.');
      });
  }

  return (
    <>
      <Nav />
      <div className="registration-container">
        <h2>Visitor Form</h2>
        <form onSubmit={handleSubmits}>
          <div className="form-group">
            <label htmlFor="fullname">Full name</label>
            <input type="text" id="fullname" value={fullname} onChange={event => setFullname(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} onChange={event => setUsername(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="text" id="phone" value={phone} onChange={event => setPhonenumber(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={event => setEmail(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="purpose">Purpose</label>
            <input type="text" id="purpose" value={purpose} onChange={event => setPurpose(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
          </div>
          <button className="submit-btn" type="submit">Add Visitor</button>
        </form>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </>
  );
}

export default AddVisitor;
