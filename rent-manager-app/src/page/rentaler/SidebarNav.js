import React from "react";
import { NavLink } from "react-router-dom";

const SidebarNav = () => {
  const hoverStyle = {
    paddingLeft: "15px",
    backgroundColor: "#f0f0f0",
    transition: "background-color 0.3s ease, padding-left 0.3s ease",
  };

  const activeStyle = {
    backgroundColor: "#0056b3",
    color: "#ffffff",
    fontWeight: "bold",
    paddingLeft: "15px",
    borderLeft: "4px solid #ffc107",
  };

  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand text-white" href="index.html">
          <span className="align-middle">Quản lý phòng trọ</span>
        </a>

        {/* Thống kê Section */}


        {/* Main Navigation Links */}
        <ul
          className="nav flex-column border-right sticky-top"
          style={{
            height: "100vh",
            borderColor: "#dee2e6",
            borderWidth: "1px",
            backgroundColor: "#ffffff",
          }}
        >
          <NavLink
            to="/rentaler"
            className="nav-link text-dark d-flex align-items-center sidebar-link"
            activeStyle={activeStyle}
            style={hoverStyle}
            exact
          >
            <i className="fas fa-chart-bar mr-2" style={{ color: "#0056b3" }}></i>
            <span className="fw-bolder">Thống kê</span>
          </NavLink>
          {[
            { to: "/rentaler/room-management", icon: "fas fa-bed", label: "Quản lý phòng trọ" },
            { to: "/rentaler/contract-management", icon: "fas fa-file-contract", label: "Quản lý hợp đồng" },
            { to: "/rentaler/request-management", icon: "fas fa-clipboard-list", label: "Quản lý yêu cầu" },
            { to: "/rentaler/message", icon: "fas fa-clipboard-list", label: "Tin nhắn" }
          ].map((item, index) => (
            <li className="nav-item py-3" key={index}>
              <NavLink
                to={item.to}
                className="nav-link text-dark d-flex align-items-center sidebar-link"
                activeStyle={activeStyle}
                style={hoverStyle}
              >
                <i className={`${item.icon} mr-2`} style={{ color: "#0056b3" }}></i>
                <span className="fw-bolder">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SidebarNav;
