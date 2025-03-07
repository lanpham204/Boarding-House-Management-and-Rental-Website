import React from "react"
import { Link } from "react-router-dom";
import AvatarElement from "../../element/AvatarElement";

const Nav = (props) => {
  const { currentUser, onLogout } = props;
  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">

      <div className="navbar-collapse collapse">
        <ul className="navbar-nav navbar-align">
          <li className="nav-item dropdown">
            <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
              <i className="align-middle" data-feather="settings"></i>
            </a>

            <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" data-bs-toggle="dropdown">
              <AvatarElement currentUser={currentUser} size={30} />
              <span className="text-dark ms-2">{currentUser === null ? "" : currentUser.name}</span>
            </a>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to={'/admin/profile'}>Hồ sơ</Link>

              <Link className="dropdown-item" to={'/admin/change-password'}>Đổi mật khẩu</Link>
              <button className="dropdown-item" onClick={onLogout}>Đăng xuất</button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav;