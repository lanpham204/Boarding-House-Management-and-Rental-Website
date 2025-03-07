import React, { Component } from "react";
import './Login.css';
import { ACCESS_TOKEN, FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from "../../constants/Connect";
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { login } from "../../services/fetch/ApiUtils";
import LoginForm from "../../common/LoginForm";

function LoginAdmin(props) {
    const history = useNavigate();
    const location = useLocation();
    const handleLogin = (value) => {
        login(value)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                toast.success("Bạn đã đăng nhập thành công!!");
                history("/admin");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }).catch(error => {
                toast.error('Tài khoản mật khẩu không đúng!');
            });
    }
    useEffect(() => {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if (location.state && location.state.error) {
            setTimeout(() => {
                toast.error(location.state.error, {
                    timeout: 5000
                });
                history.replace({
                    pathname: location.pathname,
                    state: {}
                });
            }, 100);
        }
    }, [location.state, location.pathname, history]);

    if (props.authenticated && props.role === "ROLE_ADMIN") {
        return <Navigate
            to={{
                pathname: "/admin",
                state: { from: location }
            }} />;
    }

    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src="https://base.vn/wp-content/uploads/2024/06/ky-nang-admin-1024x628.webp" className="img-fluid" alt="Phone image" />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <h3 >Đăng nhập Admin</h3>
                        <LoginForm login={handleLogin} />
                    </div>
                </div>
            </div>
        </section>

    )
}

export default LoginAdmin;