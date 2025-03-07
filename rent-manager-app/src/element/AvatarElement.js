import React from 'react'
import avatarDefault from "../assets/img/avatar-default.png"
const AvatarElement = ({ currentUser, size }) => {
  return (
    <img
      src={!currentUser?.imageUrl || currentUser.imageUrl == "null" ? avatarDefault : currentUser.imageUrl}
      alt="avatar"
      className="img-fluid rounded-circle border border-dark border-5"
      style={{
        width: `${size}px`, height: `${size}px`,
        objectFit: "cover", // Giúp nội dung hình ảnh lấp đầy khung
        overflow: "hidden", // Ẩn phần thừa bên ngoài
      }}
    />
  )
}

export default AvatarElement