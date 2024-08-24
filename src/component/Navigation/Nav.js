import React from 'react';

import { Link, NavLink } from 'react-router-dom';

import { FaSignOutAlt } from 'react-icons/fa'; 

import links from '../../Dashboard/List';

import Header from './Header';// Importing the logout icon from react-icons

const Nav = ({ userRole = localStorage.getItem('userRole') }) => {
  return (
    <>
      <Header />
      <div className='navigation'>
        <ul>
          {links[userRole].map((link, index) => (
            <li key={index}>
              <Link to={link.path}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Adding the logout icon next to the logout text */}
        <NavLink to='/'>
          <FaSignOutAlt style={{ marginRight: '8px' }} /> {/* Icon with a little space to the right */}
          Log out
        </NavLink>
      </div>
    </>
  );
};

export default Nav;
