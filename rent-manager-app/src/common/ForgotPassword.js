import React, { Component } from "react";
import './ForgotPassword.css';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";
import { forgotPassword } from "../services/fetch/ApiUtils";
import { toast } from "react-toastify";
import Header from "../common/Header"
import Footer from "../common/Footer";

class ForgotPassword extends Component {
    render() {
        return (
            <>
                <Header authenticated={this.props.authenticated} currentUser={this.props.currentUser} onLogout={this.props.onLogout} />
                
                <div className="body-content d-flex align-items-center" style={{ marginTop: '120px', minHeight: '80vh' }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card shadow">
                                    <div className="row no-gutters">
                                        <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
                                            <img src="../../assets/img/undraw_file_sync_ot38.svg" alt="Image" className="img-fluid p-3" />
                                        </div>
                                        <div className="col-md-6 p-4">
                                            <h3 className="card-title">Quên mật khẩu</h3>
                                            <p className="text-muted">Nhập địa chỉ email mà bạn đã sử dụng để đăng nhập trên trang web của chúng tôi.</p>
                                            <ForgotPasswordForm />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </>
        )
    }
}




function ForgotPasswordForm() {
    const history = useNavigate();
    const [formState, setFormState] = useState({
        email: '',
    });

    const handleInputChange = event => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        setFormState(prevState => ({
            ...prevState,
            [inputName]: inputValue
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();

        const emailRequest = { ...formState };

        forgotPassword(emailRequest)
            .then(response => {
                toast.success(response.message);
                history("/");
            }).catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });


    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group first">
                <span>Email</span>
                <input type="email" className="form-control" name="email" value={formState.email} onChange={handleInputChange} required />

            </div>
            <input type="submit" value="Gửi yêu cầu" className="btn text-white btn-block btn-primary" />
        </form>
    )
}

export default ForgotPassword;