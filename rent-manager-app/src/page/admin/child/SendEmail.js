import React, { useState, useEffect } from "react";
import SidebarNav from '../SidebarNav';
import { getAccountById, sendEmailForRentaler } from "../../../services/fetch/ApiUtils";
import { toast } from "react-toastify";
import { Navigate, useParams } from "react-router-dom";
import Nav from "../Nav";

function SendEmail(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [nameOfRentaler, setNameOfRentaler] = useState('');
    const [toEmail, setToEmail] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        getAccountById(id).then(response => {
            setToEmail(response.email)
            setNameOfRentaler(response.name)
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }, []);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleRentalerChange = (event) => {
        setNameOfRentaler(event.target.value);
    };

    const handleToEmailChange = (event) => {
        setToEmail(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate the form fields
        if (!title.trim()) {
            toast.error("Tiêu đề không được để trống!");
            return;
        }
        if (!nameOfRentaler.trim()) {
            toast.error("Tên chủ bài đăng không được để trống!");
            return;
        }
        if (!toEmail.trim()) {
            toast.error("Email người nhận không được để trống!");
            return;
        }
        if (!description.trim()) {
            toast.error("Lời nhắn không được để trống!");
            return;
        }

        const sendEmailRequest = { title, nameOfRentaler, toEmail, description };
        sendEmailForRentaler(id, sendEmailRequest)
            .then(response => {
                console.log(response.message)
                toast.success(response.message)
                setTitle('');
                setDescription('');
            })
            .catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });
    };

    if (!authenticated) {
        return <Navigate
            to={{
                pathname: "/login-admin",
                state: { from: location }
            }} />;
    }


    return (
        <main style={{ margin: "20px" }}>
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Gửi mail cho người đăng</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email người nhận</label>
                            <input
                                type="email"
                                className="form-control"
                                name="toEmail"
                                value={toEmail}
                                onChange={handleToEmailChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tên chủ bài đăng</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nameOfRentaler"
                                value={nameOfRentaler}
                                onChange={handleRentalerChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tiêu đề mail</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={title}
                                onChange={handleTitleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Lời nhắn</label>
                            <textarea
                                className="form-control"
                                placeholder="Mô tả"
                                rows="1"
                                style={{ height: "65px" }}
                                name="description"
                                value={description}
                                onChange={handleDescriptionChange}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default SendEmail;