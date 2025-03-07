import React, { useEffect, useState } from 'react';
import SidebarNav from './SidebarNav';
import Nav from './Nav';
import { disableRoom, getAllRoomOfRentaler } from '../../services/fetch/ApiUtils';
import Pagination from './Pagnation';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import ModalRoomDetails from '../admin/modal/ModalRoomDetail';
// import ModalRoomDetails from './modal/ModalRoomDetail';

function ChatRentaler(props) {
    const { currentUser, location, onLogout, children } = props;
    if (!props.authenticated) {
        return <Navigate
            to={{
                pathname: "/login-rental",
                state: { from: location }
            }} />;
    }

    return (
        <div className="wrapper">
            <SidebarNav />
            <div className="main">
                <Nav onLogout={onLogout} currentUser={currentUser} />
                <div className="container-fluid p-0">
                    {children}
                </div>
            </div>
        </div >
    )
}

export default ChatRentaler;