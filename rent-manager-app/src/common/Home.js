import React, { Component } from "react";
import { Link } from "react-router-dom";
import avatarDefault from "../assets/img/avatar-default.png"
import roomDefault from "../assets/img/room-default.jpeg"
import {
  getAllAccountRentalerForCustomer,
  getAllRoomOfCustomer,
} from "../services/fetch/ApiUtils";
import { toast } from "react-toastify";
import RoomCart from "../element/RoomCart";
import { render } from "@testing-library/react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: 3,
      rooms: [], // Mảng lưu trữ danh sách phòng trọ từ API
      sortingOption: "Thời gian: Mới đến cũ",
      rentaler: [],
    };
  }

  // Gọi API để lấy danh sách phòng trọ sau khi component được khởi tạo
  componentDidMount() {
    this.fetchRooms(this.state.currentPage);
  }

  // Hàm gọi API lấy danh sách phòng trọ
  fetchRooms = () => {
    //console.log(pageNo)
    getAllRoomOfCustomer(1, 3, "", "", "", "", "", "", null)
      .then((response) => {
        this.setState({
          rooms: response.content,
        });
      })
      .catch((error) => {
        toast.error(
          (error && error.message) ||
          "Oops! Có điều gì đó xảy ra. Vui lòng thử lại!"
        );
      });

    getAllAccountRentalerForCustomer(1, 7)
      .then((response) => {
        this.setState({
          rentaler: response.content,
        });
      })
      .catch((error) => {
        toast.error(
          (error && error.message) ||
          "Oops! Có điều gì đó xảy ra. Vui lòng thử lại!"
        );
      });
  };

  render() {
    const { rooms, rentaler } = this.state;

    return (
      <main id="main">
        <section className="section-services section-t8">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="title-wrap text-center mb-5">
                  <h2 className="title-a">Dịch vụ của chúng tôi</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card shadow-sm border-0">
                  <div className="card-body text-center">
                    <div className="icon-circle bg-primary mb-4">
                      <i className="fa fa-lock text-white"></i>{" "}
                      {/* Changed icon and placed in a circular background */}
                    </div>
                    <h4 className="card-title">An Toàn</h4>
                    <p className="card-text">
                      Chúng tôi đảm bảo sự an toàn tuyệt đối cho khách hàng.
                      Dịch vụ của chúng tôi luôn được bảo mật và an toàn.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card shadow-sm border-0">
                  <div className="card-body text-center">
                    <div className="icon-circle bg-danger mb-4">
                      <i className="fa fa-bolt text-white"></i>{" "}
                      {/* Changed to a lightning icon for speed */}
                    </div>
                    <h4 className="card-title">Nhanh Chóng</h4>
                    <p className="card-text">
                      Dịch vụ của chúng tôi được thực hiện nhanh chóng, mang lại
                      hiệu quả tối ưu nhất cho khách hàng.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-property section-t8">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="title-wrap d-flex justify-content-between align-items-center mb-4">
                  <div className="title-box">
                    <h2 className="title-a">Bài đăng mới nhất</h2>
                  </div>
                  <div className="title-link">
                    <a href="/rental-home" className="btn btn-outline-primary">
                      Tất cả bài đăng <i className="bi bi-chevron-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <section className="property-grid grid">
              <div className="row">
                {rooms.map((room, index) => (
                  <RoomCart key={index} room={room} />
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="section-agents section-t8">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="title-wrap d-flex justify-content-between">
                  <div className="title-box">
                    <h2 className="title-a">Người cho thuê</h2>
                  </div>
                  <div className="title-link">
                    <a href="angent-gird">
                      Tất cả người cho thuê trọ
                      <span className="bi bi-chevron-right"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {rentaler.map((rentaler) => {
                if (
                  rentaler.roles[0] &&
                  rentaler.roles[0].name === "ROLE_RENTALER"
                ) {
                  return (
                    <div className="col-md-3">
                      <div className="card-box-d">
                        <div className="card-img-d">
                          <img
                            src={rentaler?.imageUrl == "null" || !rentaler.imageUrl ? avatarDefault : rentaler.imageUrl}
                            alt=""
                            className="img-d img-fluid"
                            style={{ height: "300px", width: "250px" }}
                          />
                        </div>
                        <div className="card-overlay card-overlay-hover">
                          <div className="card-header-d">
                            <div className="card-title-d align-self-center">
                              <h3 className="title-d">
                                <Link
                                  to={`/angent-single/` + rentaler.id}
                                  className="link-two"
                                >
                                  {rentaler?.name}
                                </Link>
                              </h3>
                            </div>
                          </div>
                          <div className="card-body-d">
                            <p
                              className="content-d color-text-a"
                              style={{ color: "white" }}
                            >
                              {rentaler?.address}
                            </p>
                            <div className="info-agents color-a">
                              <p style={{ color: "white" }}>
                                <strong>Phone: </strong> {rentaler?.phone}
                              </p>
                              <p style={{ color: "white" }}>
                                <strong>Email: </strong> {rentaler?.email}
                              </p>
                            </div>
                          </div>
                          <div className="card-footer-d">
                            <div className="socials-footer d-flex justify-content-center">
                              <ul className="list-inline">
                                {rentaler?.facebookUrl ? (
                                  <li className="list-inline-item">
                                    <a
                                      href={rentaler?.facebookUrl}
                                      className="link-one"
                                      target="_blank"
                                    >
                                      <i
                                        className="bi bi-facebook"
                                        aria-hidden="true"
                                      ></i>
                                    </a>
                                  </li>
                                ) : (
                                  <></>
                                )}
                                {rentaler?.zaloUrl ? (
                                  <li className="list-inline-item">
                                    <a
                                      href={rentaler?.zaloUrl}
                                      className="link-one"
                                      target="_blank"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        width="20"
                                        height="50"
                                        viewBox="0 0 50 50"
                                      >
                                      </svg>
                                    </a>
                                  </li>
                                ) : (
                                  <></>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Home;
