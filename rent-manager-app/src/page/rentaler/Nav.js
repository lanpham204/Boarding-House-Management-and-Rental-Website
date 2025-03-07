import React from "react"
import { Link, useNavigate } from "react-router-dom";
import AvatarElement from "../../element/AvatarElement";

const Nav = (props) => {
  const { currentUser, onLogout } = props;
  const navigate = useNavigate()
  const handleLogout = () => {
    onLogout();
    navigate("/login-rental")
  }
  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg ">
      <div className="navbar-collapse collapse">
        <ul className="navbar-nav navbar-align">
          {/* <li className="nav-item dropdown">
            <a className="nav-icon dropdown-toggle" href="#" id="messagesDropdown" data-bs-toggle="dropdown">
              <div className="position-relative">
                Thông báo
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="messagesDropdown">
              <div className="dropdown-menu-header">
                <div className="position-relative">
                  4 tin nhắn mới
                </div>
              </div>
              <div className="dropdown-menu-footer">
                <Link className="text-muted" to={'/rentaler/chat'}>
                  Xem tất cả tin nhắn
                </Link>
              </div>
            </div>
          </li> */}
          <li className="nav-item dropdown">
            <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
              <i className="align-middle" data-feather="settings"></i>
            </a>

            <a className="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
              <AvatarElement currentUser={currentUser} size={40} />
              <span className="text-dark">{currentUser === null ? "" : currentUser.name}</span>
            </a>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to={'/rentaler/profile'}>
                Trang cá nhân
              </Link>
              <Link className="dropdown-item" to={'/'}>
                Trang người dùng
              </Link>
              <Link className="dropdown-item" to={'/rentaler/change-password'}>
                Đổi mật khẩu
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={() => handleLogout()}>Đăng xuất</button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav;