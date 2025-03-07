import React, { Component } from "react";
import './Login.css';
import { ACCESS_TOKEN, FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from "../../constants/Connect";
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { login } from "../../services/fetch/ApiUtils";
import { useState } from "react";
import LoginForm from "../../common/LoginForm";

function LoginRentaler(props) {
    const history = useNavigate();
    const location = useLocation();
    const handleLogin = (value) => {
        login(value)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                toast.success("Bạn đã đăng nhập thành công!!");
                history("/rentaler");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }).catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
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
            }, 2000);
        }
    }, [location.state, location.pathname, history]);

    if (props.authenticated && props.role === "ROLE_RENTALER") {
        return <Navigate
            to={{
                pathname: "/rentaler",
                state: { from: location }
            }} />;
    }

    return (
        <section className="vh-100 d-flex align-items-center justify-content-center">
            <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
                <div className="container">
                    <div className="row gx-lg-5 align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <h1 className="my-5 display-3 fw-bold ls-tight">
                                Ưu đãi tốt nhất <br />
                                <span className="text-primary">cho việc kinh doanh cho thuê của bạn</span>
                            </h1>
                            <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                                Chúng tôi mang đến cơ hội tuyệt vời cho những người cho thuê phòng muốn tối ưu hóa lợi nhuận.
                                Dịch vụ của chúng tôi giúp bạn tiếp cận hàng ngàn người thuê tiềm năng, tăng tỷ lệ lấp đầy phòng
                                và đảm bảo quản lý dễ dàng hơn. Hãy bắt đầu ngay để nhận những lợi ích hấp dẫn cho việc kinh doanh của bạn!
                            </p>
                        </div>
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="card">
                                <div className="card-body py-5 px-md-5">
                                    <div className="mb-4">
                                        <h3>Đăng nhập cho thuê phòng</h3>
                                        <p className="mb-4">Nếu bạn chưa có tài khoản. <Link to="/signup-rental">Đăng ký tài khoản mới</Link></p>
                                    </div>
                                    <LoginForm login={handleLogin} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginRentaler;