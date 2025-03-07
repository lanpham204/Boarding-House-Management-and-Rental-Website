import React from 'react'
import roomDefault from "../assets/img/room-default.jpeg"
import { Link } from 'react-router-dom'
const RoomCart = ({ room }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
                <div className="img-container position-relative">
                    <img
                        src={room.roomMedia[0].files == "" || room.roomMedia[0].files == undefined ? roomDefault : room.roomMedia[0].files}
                        alt={room.title ?? "default image room"}
                        className="card-img-top img-fluid"
                        style={{ height: "300px", objectFit: "cover" }}
                    />
                    <div className="img-overlay">
                        <h5 className="price-tag text-white bg-dark p-2 text-right">
                            {room.price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })} / Tháng
                        </h5>
                    </div>
                </div>
                <div className="card-body">
                    <h3>
                        <Link
                            to={`/rental-home/${room.id}`}
                            className="text-dark font-weight-bold"
                        >
                            {room.title}
                        </Link>
                    </h3>
                    <p className="text-muted">{room.description}</p>
                    <Link
                        to={`/rental-home/${room.id}`}
                        className="btn btn-sm btn-primary"
                    >
                        Xem chi tiết <i className="bi bi-chevron-right"></i>
                    </Link>
                </div>
                <div className="card-footer bg-white border-0">
                    <ul className="list-unstyled d-flex justify-content-between mb-0">
                        <li>
                            <p>Vị trí:</p> {room.location.cityName}
                        </li>
                        <li>
                            <p>Loại:</p> {room.category.name}
                        </li>
                        <li>
                            <p>Người cho thuê:</p> {room.user.name}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default RoomCart