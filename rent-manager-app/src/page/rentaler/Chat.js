import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom'
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import '../../assets/css/app.css';
import Message from '../messages/pages/Home';


function Chat(props) {
    console.log("Props:", props)
    const { authenticated, role, currentUser, location, onLogout } = props;

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


                <main style={{ margin: "20px 20px 20px 20px" }}>

                    <Message authenticated={authenticated} currentUser={currentUser} onLogout={onLogout} />

                </main>

            </div>
        </div>
    )
}

export default Chat;