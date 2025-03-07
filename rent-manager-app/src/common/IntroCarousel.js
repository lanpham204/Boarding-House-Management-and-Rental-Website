import React from "react";
import slide1 from "../assets/img/slide1.webp";
import slide2 from "../assets/img/slide2.jpeg";
import slide3 from "../assets/img/slide3.jpg"
const IntroCarosel = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel"
      data-interval="5000"
    >
      {" "}
      {/* Set autoplay interval */}
      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to={0}
          className="active"
        />
        <li data-target="#carouselExampleIndicators" data-slide-to={1} />
        <li data-target="#carouselExampleIndicators" data-slide-to={2} />
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={slide1}
            style={{ height: "90vh" }}
            className="d-block w-100"
            alt="Slide 1"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5 className="carousel-title text-white">
              Chào mừng đến với nền tảng của chúng tôi
            </h5>
            <p className="carousel-description fs-3">
              Khám phá những bất động sản cho thuê tuyệt vời phù hợp với nhu
              cầu của bạn. Chúng tôi cung cấp đa dạng các lựa chọn từ căn hộ
              hiện đại đến nhà ở truyền thống, giúp bạn tìm được nơi an cư lý
              tưởng cho gia đình hoặc nhóm bạn của mình.
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={slide2}
            style={{ height: "90vh" }}
            className="d-block w-100"
            alt="Slide 2"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5 className="carousel-title text-white">
              Tìm ngôi nhà hoàn hảo của bạn
            </h5>
            <p className="carousel-description fs-3">
              Duyệt qua danh sách phong phú của chúng tôi để tìm kiếm lựa chọn
              phù hợp với bạn. Chúng tôi cung cấp nhiều loại hình bất động
              sản, từ căn hộ tiện nghi trong thành phố đến những ngôi nhà nghỉ
              dưỡng yên tĩnh, giúp bạn tìm được không gian sống lý tưởng cho
              gia đình và bạn bè, đồng thời đáp ứng nhu cầu của bạn về sự tiện
              lợi và thoải mái.
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={slide3}
            className="d-block w-100"
            style={{ height: "90vh" }}
            alt="Slide 3"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5 className="carousel-title text-white">
              Quy trình đặt phòng dễ dàng
            </h5>
            <p className="carousel-description fs-3">
              Nền tảng thân thiện với người dùng của chúng tôi không chỉ đảm
              bảo một trải nghiệm đặt phòng suôn sẻ mà còn cung cấp đầy đủ
              thông tin cần thiết về từng bất động sản. Chúng tôi cam kết mang
              đến cho bạn quy trình đặt phòng nhanh chóng và hiệu quả, với các
              công cụ tìm kiếm tiện lợi.
            </p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-target="#carouselExampleIndicators"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-target="#carouselExampleIndicators"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
}

export default IntroCarosel;
