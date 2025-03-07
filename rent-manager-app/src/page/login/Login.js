import React from "react";
import './Login.css';
import { ACCESS_TOKEN, GOOGLE_AUTH_URL } from "../../constants/Connect";
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { getRoleFromToken, login } from "../../services/fetch/ApiUtils";
import LoginForm from "../../common/LoginForm";
function Login(props) {
    const history = useNavigate();
    const location = useLocation();
    const handleLogin = (value) => {
        login(value)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                toast.success("Bạn đã đăng nhập thành công!!");
                const role = getRoleFromToken(response.accessToken)
                switch (role) {
                    case 'ROLE_RENTALER':
                        history("/rentaler");
                        break;
                    case 'ROLE_ADMIN':
                        history("/admin");
                        break;
                    default:
                        history("/");
                        break;
                }
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
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
            }, 100);
        }
    }, [location.state, location.pathname, history]);

    if (props.authenticated) {
        return <Navigate
            to={{
                pathname: "/",
                state: { from: location }
            }} />;
    } else if (props.authenticated && props.role === "ROLE_ADMIN") {
        return <Navigate
            to={{
                pathname: "/admin",
                state: { from: location }
            }} />;
    } else if (props.authenticated && props.role === "ROLE_RENTALER") {
        return <Navigate
            to={{
                pathname: "/rentaler",
                state: { from: location }
            }} />;
    }

    const handleGoogleLogin = () => {
        window.location.href = GOOGLE_AUTH_URL;
    };

    return (
        <section className="vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    {/* Left Column for Text */}
                    <div className="col-md-8 col-lg-7 col-xl-6 mb-5">
                        <h1 className="my-5 fw-bold ls-tight">
                            Ưu đãi tốt nhất <br />
                            <span className="text-primary">cho nhu cầu thuê phòng của bạn</span>
                        </h1>
                        <p className="text-muted">
                            Chúng tôi cung cấp các giải pháp cho thuê phòng tiện lợi và phù hợp.
                            Với nhiều lựa chọn đa dạng, bạn sẽ dễ dàng tìm được không gian lý tưởng
                            để sinh sống hoặc làm việc. Liên hệ ngay để nhận ưu đãi và hỗ trợ tận tình.
                        </p>
                    </div>

                    {/* Right Column for Login Form */}
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5">
                                <h3 className="mb-4">Đăng nhập</h3>
                                <p>Nếu bạn chưa có tài khoản, <Link to="/signup" className="text-primary">Đăng ký tài khoản mới</Link>.</p>
                                <LoginForm login={handleLogin} />
                                <div className="d-flex justify-content-center align-items-center">
                                    <hr className="flex-grow-1" />
                                    <span className="mx-2">Hoặc</span>
                                    <hr className="flex-grow-1" />
                                </div>
                                <div className="d-flex justify-content-center my-4">
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={handleGoogleLogin}
                                        style={{ width: '100%' }}
                                    >
                                        <i className="fab fa-google"></i> Đăng nhập bằng Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;