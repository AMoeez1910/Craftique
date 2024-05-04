import React from 'react'
const SideBar = ({ setRender }) => {
  return (
    <nav
    className="navbar align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 navbar-dark"
    style={{
      background: "var(--bs-primary-text-emphasis)",
      marginBottom: "-51px"
    }}
  >
    <div className="container-fluid d-flex flex-column p-0">
      <hr className="sidebar-divider my-0" />
      <div className="text-center d-none d-md-inline" />
      <nav
        className="navbar align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 navbar-dark"
        style={{ background: "var(--bs-primary-text-emphasis)" }}
      >
        <div className="container-fluid d-flex flex-column p-0">
          <hr className="sidebar-divider my-0" />
          <ul className="navbar-nav text-light flex-row gap-4" id="accordionSidebar">
          <li className="nav-item">
            <button className="nav-link" onClick={() =>setRender('Profile')}>
                <i className="fas fa-user" />
                <span>Profile</span>
            </button>
            </li>
            <li className="nav-item">
            <button className="nav-link " onClick={() =>setRender('Orders')}>
                <i className="fas fa-user" />
                <span>Orders</span>
            </button>
            </li>
            <li className="nav-item">
            <button className="nav-link " onClick={() =>setRender('Address')}>
                <i className="fas fa-user" />
                <span>Address</span>
            </button>
            </li>
            
          </ul>
          <div className="text-center d-none d-md-inline" />
        </div>
      </nav>
    </div>
  </nav>
  

  )
}

export default SideBar