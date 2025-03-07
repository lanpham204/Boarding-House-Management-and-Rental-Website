import React from "react";
import "./css/layout/bootstrap-material.css"
import "./css/layout/shreerang-material.css"
import "./css/layout/uikit.css"

const RentalerLayout = () => {


  return (
    <div className="layout-wrapper layout-2">
      <div className="layout-inner">
        <div id="layout-sidenav" className="layout-sidenav sidenav sidenav-vertical bg-dark">
          <ul className="sidenav-inner py-1">
            {/* Dashboards */}
            <li className="sidenav-item active">
              <a href="index.html" className="sidenav-link">
                <i className="sidenav-icon feather icon-home" />
                <div>Dashboards</div>
              </a>
            </li>
            {/* Layouts */}
            <li className="sidenav-divider mb-1" />
            <li className="sidenav-item">
              <a href="typography.html" className="sidenav-link">
                <i className="sidenav-icon feather icon-type" />
                <div>Typography</div>
              </a>
            </li>
            {/* Forms & Tables */}
            <li className="sidenav-divider mb-1" />
            <li className="sidenav-item">
              <a href="tables_bootstrap.html" className="sidenav-link">
                <i className="sidenav-icon feather icon-grid" />
                <div>Tables</div>
              </a>
            </li>
            {/* Pages */}
            <li className="sidenav-item">
              <a href="pages_authentication_login-v1.html" className="sidenav-link">
                <i className="sidenav-icon feather icon-lock" />
                <div>Login</div>
              </a>
            </li>
            <li className="sidenav-item">
              <a href="pages_authentication_register-v1.html" className="sidenav-link">
                <i className="sidenav-icon feather icon-user" />
                <div>Signup</div>
              </a>
            </li>
            <li className="sidenav-item">
              <a href="pages_faq.html" className="sidenav-link">
                <i className="sidenav-icon feather icon-anchor" />
                <div>FAQ</div>
              </a>
            </li>
          </ul>
        </div>
        <div className="layout-container">
          <nav className="layout-navbar navbar navbar-expand-lg align-items-lg-center bg-white container-p-x" id="layout-navbar">
            <div className="layout-sidenav-toggle navbar-nav d-lg-none align-items-lg-center mr-auto">
              <a className="nav-item nav-link px-0 mr-lg-4" href="javascript:">
                <i className="ion ion-md-menu text-large align-middle" />
              </a>
            </div>
            <div className="navbar-collapse collapse" id="layout-navbar-collapse">
              {/* Divider */}
              <hr className="d-lg-none w-100 my-2" />
              <div className="navbar-nav align-items-lg-center">
                {/* Search */}
                <label className="nav-item navbar-text navbar-search-box p-0 active">
                  <i className="feather icon-search navbar-icon align-middle" />
                  <span className="navbar-search-input pl-2">
                    <input type="text" className="form-control navbar-text mx-2" placeholder="Search..." />
                  </span>
                </label>
              </div>
              <div className="navbar-nav align-items-lg-center ml-auto">
                <div className="demo-navbar-notifications nav-item dropdown mr-lg-3">
                  <a className="nav-link dropdown-toggle hide-arrow" href="#" data-toggle="dropdown">
                    <i className="feather icon-bell navbar-icon align-middle" />
                    <span className="badge badge-danger badge-dot indicator" />
                    <span className="d-lg-none align-middle">&nbsp; Notifications</span>
                  </a>
                </div>
                <div className="demo-navbar-messages nav-item dropdown mr-lg-3">
                  <a className="nav-link dropdown-toggle hide-arrow" href="#" data-toggle="dropdown">
                    <i className="feather icon-mail navbar-icon align-middle" />
                    <span className="badge badge-success badge-dot indicator" />
                    <span className="d-lg-none align-middle">&nbsp; Messages</span>
                  </a>
                </div>
                {/* Divider */}
                <div className="nav-item d-none d-lg-block text-big font-weight-light line-height-1 opacity-25 mr-3 ml-1">
                  |</div>
                <div className="demo-navbar-user nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                    <span className="d-inline-flex flex-lg-row-reverse align-items-center align-middle">
                      <img src="assets/img/avatars/1.png" alt className="d-block ui-w-30 rounded-circle" />
                      <span className="px-1 mr-lg-2 ml-2 ml-lg-0">Cindy Deitch</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <div className="container-fluid flex-grow-1 container-p-y">
          <div class="row mb-2 mb-xl-3">
              <div class="col-auto d-none d-sm-block">
                <h3>
                  <strong>✨</strong> Thông kê
                </h3>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 col-xl-3">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col mt-0">
                        <h5 class="card-title">Tổng Phòng</h5>
                      </div>

                      <div class="col-auto">
                        <div class="stat text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-dollar-sign align-middle"
                          >
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h1 class="mt-1 mb-3">
                      {/* {number.numberOfRoom} */}
                      </h1>
                    <div class="mb-0">
                      <span class="badge badge-success-light">
                        {" "}
                        <i class="mdi mdi-arrow-bottom-right"></i> 3.65%{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xl-3">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col mt-0">
                        <h5 class="card-title">Số người thuê</h5>
                      </div>

                      <div class="col-auto">
                        <div class="stat text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-shopping-bag align-middle"
                          >
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h1 class="mt-1 mb-3">
                      {/* {number.numberOfPeople} */}
                      </h1>
                    <div class="mb-0">
                      <span class="badge badge-danger-light">
                        {" "}
                        <i class="mdi mdi-arrow-bottom-right"></i> -5.25%{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xl-3">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col mt-0">
                        <h5 class="card-title">Phòng trống</h5>
                      </div>

                      <div class="col-auto">
                        <div class="stat text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-activity align-middle"
                          >
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h1 class="mt-1 mb-3">
                      {/* {number.numberOfEmptyRoom} */}
                      </h1>
                    <div class="mb-0">
                      <span class="badge badge-success-light">
                        {" "}
                        <i class="mdi mdi-arrow-bottom-right"></i> 4.65%{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xl-3">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col mt-0">
                        <h5 class="card-title">Doanh Thu</h5>
                      </div>

                      <div class="col-auto">
                        <div class="stat text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-shopping-cart align-middle"
                          >
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h1 class="mt-1 mb-4" style={{ fontSize: "xx-large" }}>
                      {/* {number.revenue.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })} */}
                    </h1>
                    <div class="mb-0">
                      <span class="badge badge-success-light">
                        {" "}
                        <i class="mdi mdi-arrow-bottom-right"></i> 2.35%{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-lg-8 d-flex">
                <div class="card flex-fill w-100">
                  <div class="card-header">
                    <div class="float-end"></div>
                    <h5 class="card-title mb-0">Tổng Doanh Thu</h5>
                  </div>
                  <div class="card-body pt-2 pb-3">
                    <div class="chart chart-md">
                      <div class="chartjs-size-monitor">
                        <div class="chartjs-size-monitor-expand">
                          <div class=""></div>
                        </div>
                        <div class="chartjs-size-monitor-shrink">
                          <div class=""></div>
                        </div>
                      </div>
                      {/* <BarChart chartData={userData} /> */}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-4 d-flex">
                <div class="card flex-fill w-100">
                  <div class="card-header">
                    <div class="float-end"></div>
                    <h5 class="card-title mb-0">Các chi phí khác</h5>
                  </div>
                  {/* <PieChart chartData={costData} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default RentalerLayout;