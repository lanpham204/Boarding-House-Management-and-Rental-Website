import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        <div style={{height: '20px' ,width:'100%'}}/>
        <footer className="bg-secondary text-white text-center text-lg-start">
          <div className="container p-4">
            <div className="row">
              <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                <h5 className="text-uppercase">Về Chúng Tôi</h5>
                <p className="text-white">
                  Chúng tôi cung cấp dịch vụ cho thuê nhà với nhiều lựa chọn phù hợp
                  với nhu cầu của bạn. Từ căn hộ tiện nghi đến biệt thự sang trọng, 
                  hãy khám phá và tận hưởng không gian sống lý tưởng!
                </p>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Liên Kết</h5>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Trang Chủ
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Dịch Vụ
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Giới Thiệu
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Liên Hệ
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-0">Liên Hệ</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#!" className="text-white">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Zalo
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Email
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Số Điện Thoại
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2024 Bản quyền 
            <a className="text-white" href="#!">
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
