import React from 'react'
import links from '../../Dashboard/List'
import { Link, NavLink } from 'react-router-dom'
import Header from './Header'

const Nav = ({userRole = localStorage.getItem('userRole')}) => {
  return (
      <><Header />
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
          <NavLink to='/'>log out</NavLink>
      </div>
   
      </>

  )
}

export default Nav
