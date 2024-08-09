import React from 'react'
import Dashboard from '../component/Navigation/Header'
import Nav from '../component/Navigation/Nav'

function Visitordash() {
  return (
    <>
      <Nav />
      <div className='container mt-4'>
        <div className='card'>
          <div className='card-header bg-primary text-white'>
            <h2>Visitor Dashboard</h2>
          </div>
          <div className='card-body'>
            <p>Welcome to the Visitor Dashboard. Here you can manage visitor information and view reports.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Visitordash
