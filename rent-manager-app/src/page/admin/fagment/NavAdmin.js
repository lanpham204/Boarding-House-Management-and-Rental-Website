import React from 'react'
import Nav from '../Nav'
const NavAdmin = (props) => {
  const { currentUser, onLogout } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      {/* Container wrapper */}
      <div className="container-fluid">
        {/* Toggle button */}
        <button className="navbar-toggler" type="button" data-mdb-collapse-init data-mdb-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fas fa-bars" />
        </button>
        <h4 className='text-primary'>Room Rental Admin</h4>
        <ul className="navbar-nav ms-auto d-flex flex-row">
          <Nav onLogout={onLogout} currentUser={currentUser} />
        </ul>
      </div>
      {/* Container wrapper */}
    </nav>

  )
}

export default NavAdmin