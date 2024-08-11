import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

import './Login.css';

const Login = () => {

  const[username, setUsername] = useState('');
  const[pasword, setPasword] = useState('');
  const[error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{

      const response = await axios.get(`http://localhost:4500/api/users/username/${username}`, {
        // const response = await axios.get(`http://localhost:8080/api/users/username/${username}`, {

      }, {
        headers: {
          'Content-Type' : 'application/json',
        }
      });

      const data = response.data;

      if(data.username === username && data.pasword === pasword){
        alert("Wellcome  " + username);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userId", data.id);

        if(data.role === "Admin"){
          navigate('/dashbords')
        }

        if(data.role === "Staff"){
          navigate('/staffdash');
        }

        if(data.role === "Visitor"){
          navigate('/visitor');
        }
      }else{
        alert("Try again");
      }
      // localStorage.setItem('storedRole', data.role);
      // localStorage.setItem('username', data.username);
      console.log(data.username);
      // navigate('/dashboard');
      // alert("Hello User");
    } catch (error) {
      setError('Invalid username or password');
      console.error('login error', error);
    }
  }
  return (
    <div className="login-container">
      <img className="zcsra1" src="zcsra1.png" />
      <h2>ZCSRA</h2>
      <h1 className="log">LOGIN FORM</h1>
      <form onSubmit={handleSubmit} className="form-container" >
        <div className="input-wrapper">
          <label htmlFor="username" className="username-label" >UserName</label>
          <input type='text' id='username' className="username-input" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>

        <div className="input-wrapper">
          <label htmlFor='password' className="password-label">Password</label>
          <input type='password' id='password' className="password-input" value={pasword} onChange={(e) => setPasword(e.target.value)}/>
        </div>
        {/* <div className="input-wrapper">
          <label htmlFor="role" className="role-label">Role</label>
          <select id="role" className="role-input">
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="visitor">Visitor</option>
          </select>
        </div> */}

        <button type='submit'>login</button>
      </form>
      <p>Dont have an account ?  <Link to="/logreg " className="register">Register</Link> </p>
    </div>
  );
};

export default Login;
