import React from "react";
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import AvatarElement from "../element/AvatarElement";

const Header = (props) => {
    return (
        <div className="container-fluid p-0">
            <nav className="navbar navbar-expand-lg bg-body-tertiary rounded shadow-sm">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-3 fw-bold text-gradient" to={"/"}>
                        Thuê Phòng
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => (isActive ? "nav-link active2 fs-5 " : "nav-link fs-5")}
                                    to="/"
                                >
                                    Trang chủ
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => (isActive ? "nav-link active2 fs-5 " : "nav-link fs-5")}
                                    to="/rental-home"
                                >
                                    Phòng cho thuê
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => (isActive ? "nav-link active2 fs-5 " : "nav-link fs-5")}
                                    to="/angent-gird"
                                >
                                    Người cho thuê
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => (isActive ? "nav-link active2 fs-5 " : "nav-link fs-5")}
                                    to="/contact"
                                >
                                    Liên hệ
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => (isActive ? "nav-link active2 fs-5 " : "nav-link fs-5")}
                                    to="/about"
                                >
                                    Giới thiệu
                                </NavLink>
                            </li>
                        </ul>
                        {!props.authenticated ? (
                            <div className="d-flex align-items-center">
                                <button type="button" className="btn btn-primary me-2 ">
                                    <Link
                                        to="/login"
                                        className="text-decoration-none"
                                        style={{ color: "white" }}
                                    >
                                        Đăng nhập
                                    </Link>
                                </button>
                                <button type="button" className="btn btn-primary me-2 ">
                                    <Link
                                        to="/signup"
                                        className="text-decoration-none"
                                        style={{ color: "white" }}
                                    >
                                        Đăng kí
                                    </Link>
                                </button>
                                <button type="button" className="btn btn-primary ">
                                    <Link
                                        to="/login-rental"
                                        className="text-decoration-none"
                                        style={{ color: "white" }}
                                    >
                                        Đăng tin
                                    </Link>
                                </button>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center">
                                <div className="profile-avatar position-relative">
                                    <AvatarElement currentUser={props.currentUser} size={50} />
                                </div>
                                <div className="ms-3">
                                    <p className="mb-2 fs-5">{props.currentUser.name}</p>
                                    <ul className="list-unstyled d-flex mb-1" style={{ color: "#1B7B2C" }}>
                                    </ul>
                                    <div>
                                        <Link to="/profile">
                                            <button
                                                type="button"
                                                className="btn btn-outline-dark btn-sm me-2"
                                            >
                                                Hồ Sơ
                                            </button>
                                        </Link>
                                        {props.role === 'ROLE_RENTALER' ?
                                            <Link to="/rentaler">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-dark btn-sm me-2"
                                                >
                                                    Trang quản trị
                                                </button>
                                            </Link> : ''
                                        }
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark btn-sm"
                                            onClick={props.onLogout}
                                        >
                                            Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header;