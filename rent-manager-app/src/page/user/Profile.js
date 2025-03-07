import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import ModalElement from "../../common/ModalElement";
import ChangePasswordOfUser from "./ChangePassword";
import ChangeInfo from "./ChangeInfo";
import { Nav } from "react-bootstrap";
import AvatarElement from "../../element/AvatarElement";
import { getCountFollower, getCountFollowing } from "../../services/fetch/ApiUtils";


const UserProfile = (props) => {
    const { authenticated, loadCurrentUser, currentUser, location } = props;
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showChangeInfo, setShowChangeInfo] = useState(false);
    const [countFollower, setCountFollower] = useState(0)
    const [countFollowing, setCountFollowing] = useState(0)
    useEffect(() => {
        getCountFollowerr()
        getCountFollowingg()
    }, [])
    const getCountFollowerr = () => {
        getCountFollower().then(data => setCountFollower(data)).catch(error => console.log(error))
    }
    const getCountFollowingg = () => {
        getCountFollowing().then(data => setCountFollowing(data)).catch(error => console.log(error))
    }
    if (!authenticated) {
        return <Navigate
            to={{
                pathname: "/login",
                state: { from: location }
            }} />;
    }
    return (
        <div className="main">
            <div className="container">
                <div className="card overflow-hidden">
                    <div className="card-body p-0">
                        <div className="row align-items-center">
                            <div className="col-lg-4 order-lg-1 order-2">
                                <div className="d-flex align-items-center justify-content-around m-4">
                                    <div className="text-center">
                                        <i className="fa fa-user fs-6 d-block mb-2" />
                                        <h4 className="mb-0 fw-semibold lh-1">{countFollower}</h4>
                                        <p className="mb-0 fs-4">Followers</p>
                                    </div>
                                    <div className="text-center">
                                        <i className="fa fa-check fs-6 d-block mb-2" />
                                        <h4 className="mb-0 fw-semibold lh-1">{countFollowing}</h4>
                                        <p className="mb-0 fs-4">Following</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mt-n3 order-lg-2 order-1 d-block">
                                <div className="d-flex align-items-center justify-content-center mb-2">
                                    <div className="linear-gradient d-flex align-items-center justify-content-center rounded-circle" style={{ width: 110, height: 110 }} >
                                        <div className="border border-4 border-white d-flex align-items-center justify-content-center rounded-circle overflow-hidden" style={{ width: 100, height: 100 }} >
                                            <AvatarElement currentUser={currentUser} size={100} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mb-4 mt-2">
                                <h5 className="fs-5 mb-0 fw-semibold">{currentUser.name}</h5>
                            </div>
                            <div className="col-lg-4 order-last">
                                <ul className="list-unstyled d-flex align-items-center justify-content-center justify-content-lg-start my-3 gap-3">
                                    <li><button className="btn btn-primary text-white" onClick={() => setShowChangePassword(true)}>Đổi mật khẩu</button></li>
                                    <li><button className="btn btn-primary text-white" onClick={() => setShowChangeInfo(true)}>Đổi thông tin</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Nav className="ms-4">
                        <Nav.Item>
                            <Link className="nav-link" to={"/profile/room-history"}>Phòng đã thuê</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link" to={"/profile/save-room"}>Phòng đã lưu</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className={"nav-link"} to={"/profile/follow-agents"}>Người theo giỏi</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className={"nav-link"} to={"/profile/message"}>Nhắn tin</Link>
                        </Nav.Item>
                    </Nav>
                    <Outlet />
                </div>
                <ModalElement title={"Đổi mật khẩu"} show={showChangePassword} handleClose={() => setShowChangePassword(false)}><ChangePasswordOfUser setCloseModal={() => setShowChangePassword(false)} /></ModalElement>
                <ModalElement title={"Đổi thông tin"} show={showChangeInfo} handleClose={() => setShowChangeInfo(false)}><ChangeInfo currentUser={currentUser} loadCurrentUser={loadCurrentUser} setCloseModal={() => (false)} /></ModalElement>
            </div>
        </div >
    );
};

export default UserProfile;
