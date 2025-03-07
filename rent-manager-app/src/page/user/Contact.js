import React, { useState } from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { Link } from 'react-router-dom';
import { sendEmailForContact } from '../../services/fetch/ApiUtils';
import { toast } from 'react-toastify';

const Contact = (props) => {
  const [title, setTitle] = useState('');
  const [nameOfRentaler, setNameOfRentaler] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleRentalerChange = (event) => {
    setNameOfRentaler(event.target.value);
  };

  const handleToEmailChange = (event) => {
    setToEmail(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const sendEmailRequest = { title, nameOfRentaler, toEmail, description };
    sendEmailForContact(sendEmailRequest).then(response => {
      console.log(response.message)
      toast.success(response.message)
      setTitle('');
      setDescription('');
    }).catch(
      error => {
        toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
      }
    )
  };
  return (
    <>
      <Header
        authenticated={props.authenticated}
        currentUser={props.currentUser}
        onLogout={props.onLogout}
      />
      <main id="main">
        <section className="intro-single">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="title-single-box">
                  <h1 className="title-single">Liên hệ chúng tôi</h1>
                  <span className="color-text-a">
                    Nếu bạn có thắc mắc hãy liên tới chúng tôi. Chúng tôi sẽ sớm trả lời cho bạn.
                  </span>
                </div>
              </div>
              <div className="col-md-12 col-lg-4">
                <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Trang chủ</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Liên hệ
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        <section className="contact">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="contact-map box">
                  <div id="map" className="contact-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4440936688447!2d106.62119134535017!3d10.853788130277316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b6c59ba4c97%3A0x535e784068f1558b!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1sen!2s!4v1731936528310!5m2!1sen!2s" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                  </div>
                </div>
              </div>
              <div className="col-sm-12 section-t8">
                <div className="row">
                  <div className="col-md-7">
                    <form
                      onSubmit={handleSubmit}
                    >
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="form-group">
                            <input
                              type="text"
                              name="nameOfRentaler"
                              value={nameOfRentaler}
                              onChange={handleRentalerChange}
                              className="form-control form-control-lg form-control-a"
                              placeholder="Họ Và Tên"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="form-group">
                            <input
                              name="toEmail"
                              value={toEmail}
                              onChange={handleToEmailChange}
                              type="email"
                              className="form-control form-control-lg form-control-a"
                              placeholder="Email Của Bạn"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <div className="form-group">
                            <input
                              type="text"
                              name="title"
                              value={title}
                              onChange={handleTitleChange}
                              className="form-control form-control-lg form-control-a"
                              placeholder="Tiêu đề"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <textarea
                              name="description"
                              value={description}
                              onChange={handleDescriptionChange}
                              className="form-control"
                              cols="45"
                              rows="8"
                              placeholder="Lời nhắn"
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <button
                            type="submit"
                            className="btn btn-a"
                          >
                            Gửi
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-5 section-md-t3">
                    <div className="icon-box section-b2">
                      <div className="icon-box-icon">
                        <span className="ion-ios-paper-plane"></span>
                      </div>
                      <div className="icon-box-content table-cell">
                        <div className="icon-box-title">
                          <h4 className="icon-title">Liên hệ</h4>
                        </div>
                        <div className="icon-box-content">
                          <p className="mb-1">
                            <span className="color-a">Địa chỉ:</span> 300/11 Nguyễn Thái Sơn, Gò Vấp, TP.HCM
                          </p>
                          <p className="mb-1">
                            <span className="color-a">Điện thoại:</span> 0327728207
                          </p>
                          <p className="mb-1">
                            <span className="color-a">Email:</span> quantriviennhatro@gmail.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;