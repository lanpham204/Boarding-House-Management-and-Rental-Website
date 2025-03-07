import React, { useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";
import "../style.css";
import AvatarElement from "../../../element/AvatarElement";
import dayjs from "dayjs"
const Message = ({ message, scrollToLast }) => {
  const ref = useRef();

  const accessToken = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(accessToken);
  const userId = decodedToken.sub;

  useEffect(() => {
    console.log("message", message);

    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [message]);

  return (
    <div>
      <div className="chat-messages p-4">
        {message?.content?.map((contentItem) => {
          const isSentByCurrentUser = userId == message.sender.id ? (contentItem.sendBy ? false : true) : (contentItem.sendBy ? true : false);
          return (
            <p
              key={contentItem.id}
              className={`${isSentByCurrentUser ? "chat-message-right pb-4" : "pb-4"}`}
            >
              {isSentByCurrentUser ?
                <div className="d-flex justify-content-end">
                  <div>
                    <div className="d-flex justify-content-end me-3">
                    <div className="text-dark">
                      <span className="me-5">
                        {dayjs(contentItem.sentAt).format("HH:mm/DD-MM-YYYY")}
                      </span>
                      <b>You</b>
                    </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <div className="flex-shrink-1 bg-primary rounded py-2 px-3 me-3 text-break" style={{ color: "white", display: "inline-block" }}>
                        {contentItem.content}
                      </div>
                    </div>
                  </div>
                  <AvatarElement currentUser={message.sender} size={50} />
                </div>
                :
                <div className="d-flex">
                  <AvatarElement currentUser={message.receiver} size={50} />
                  <div className="ms-3">
                    <div className="text-dark">
                      <b>{message.receiver.name}</b>
                      <span className="ms-5">
                        {dayjs(contentItem.sentAt).format("HH:mm/DD-MM-YYYY")}
                      </span>
                    </div>
                    <div className="flex-shrink-1 bg-secondary rounded py-2 px-3 me-3 text-break" style={{ color: "white", display: "inline-block" }}>
                      {contentItem.content}
                    </div>
                  </div>
                </div>
              }
            </p>
          );
        })}
        <div ref={ref} />
      </div>
    </div>
  );
};

export default Message;