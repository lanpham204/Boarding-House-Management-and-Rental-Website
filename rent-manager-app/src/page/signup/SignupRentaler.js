import React, { useState } from "react";
import './Signup.css';
import { toast } from 'react-toastify';
import { signup } from "../../services/fetch/ApiUtils";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/img/register-rentaler.jpg"
import RegisterForm from "../../common/RegisterForm";
function SignupRentaler(props) {

    const history = useNavigate();
    const location = useLocation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role] = useState('ROLE_RENTALER');

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }
    const handleRegister = (value) => {
        signup({ ...value, role })
            .then(response => {
                toast.success("Tài khoản đăng kí thành công. Vui lòng kiểm tra email đễ xác thực.");
                history("/login-rental");
            })
            .catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });
    }

    if (props.authenticated) {
        return <Navigate
            to={{
                pathname: "/",
                state: { from: location }
            }} />;
    }
    return (
        <section className="min-vh-100 " >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card card-registration my-4">
                            <div className="row">
                                <div className="col-md-5 col-lg-5 col-xl-5 d-flex align-items-center order-1 order-lg-2 ">
                                    <img src={logo} alt="Sample photo" className="img-fluid" style={{ borderRadius: '.25rem' }} />
                                </div>
                                <div className="col-xl-6">
                                    <div className="card-body p-md-5 text-black">
                                        <h3 className="text-uppercase">Đăng ký cho thuê phòng</h3>
                                        <p className="mb-4">Nếu bạn có tài khoản. <Link to="/login-rental">Đăng nhập</Link></p>
                                        <RegisterForm register={handleRegister} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignupRentaler;