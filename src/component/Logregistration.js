import React, { useState } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const Logregistration = () => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhonenumber] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');

  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmits = (event) => {
    event.preventDefault();

    // Check if any field is empty
    if (!fullname || !username || !password || !confirmPassword || !phone || !email || !purpose) {
      toast.error("Please fill in all the fields!");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const requestData = {
      username: username,
      email: email,
      phone: phone,
      password: password,  // Corrected key from 'pasword' to 'password'
      fullname: fullname,
      v_purpose: purpose,
      status: "unavailable",
      role: "Visitor"
    };

    axios.post('http://localhost:4500/api/add/visitor', requestData)
      .then(response => {
        console.log(response.data);
        toast.success("Visitor registered successfully, please login");
        setTimeout(() => navigate('/'), 3000);
      })
      .catch(error => {
        console.error("There was an error registering the user!", error);
        toast.error("There was an error registering the user!");
      });
  }

  return (
    <> 
      <div className="container registration-container">
        <img className='zcsra' src='zcsra1.png' alt='logo'/>
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmits}>
          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="fullname">Full name</label>
              <input type="text" id="fullname" className="form-control" value={fullname} onChange={event => setFullname(event.target.value)} />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" className="form-control" value={username} onChange={event => setUsername(event.target.value)} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" className="form-control" value={phone} onChange={event => setPhonenumber(event.target.value)} />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-control" value={email} onChange={event => setEmail(event.target.value)} />
            </div>
          </div>
          <div className="row">
           
            <div className="row">
            <div className="col-md-12 form-group">
              <label htmlFor="purpose">Purpose</label>
              <select id="purpose" className="form-control" value={purpose} onChange={event => setPurpose(event.target.value)}>
                <option value="">Select Purpose</option>
                <option value="Birth Registration">Birth Registration</option>
                <option value="Marriage Registration">Marriage Registration</option>
                <option value="Death Registration">Death Registration</option>
                <option value="Change of Personal Details">Change of Personal Details</option>
                <option value="Other Services">Other Services</option>
              </select>
            </div>
           
          </div>
            <div className="col-md-6 form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className="form-control" value={password} onChange={event => setPassword(event.target.value)} />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="confirm-password">Confirm password</label>
              <input type="password" id="confirm-password" className="form-control" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} />
            </div>
          </div>



         





          
          <div className="row">
            
          </div>
          <div className="row">
            <div className="col-md-12 form-group">
              <button className="btn btn-primary submit-btn" type='submit'>Register</button>
            </div>
          </div>
        </form>
        <ToastContainer /> {/* Add ToastContainer to render the toasts */}
      </div>
    </>
  );
}

export default Logregistration;
