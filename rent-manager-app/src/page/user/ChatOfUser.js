import React from "react";
import Message from '../messages/pages/Home';
import { useLocation } from "react-router-dom";

const ChatOfUser = (props) => {
 
    return (
        <main style={{ margin: "20px 20px 20px 20px" }}>
            <Message authenticated={props.authenticated} currentUser={props.currentUser} onLogout={props.onLogout} />
        </main>
    );
};

export default ChatOfUser;