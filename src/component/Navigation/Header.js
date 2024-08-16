import React from 'react';

function Header() {
  return (
    <>
      <div
        className="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img
          src="zcsra1.png"
          alt="ZCSRA Logo"
          style={{ width: '66px', height: '66px' }}
        />
        <h3 style={{ textAlign: 'center', flex: 1 }}>
          Zanzibar Civil Service Registration Agency Visitor Management System
        </h3>
        <img
          src="zcsra1.png"
          alt="ZCSRA Logo"
          style={{ width: '66px', height: '66px' }}
        />
      </div>
    </>
  );
}

export default Header;
