import React, { Component } from "react";

class About extends Component {
    render() {
        return (
            <div className="container my-5">
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
                    integrity="sha384-3edNf2X8M7bKdPUPZgGY7K6mXz5kDdAk2MGGx+6HT7M5F6Zq6GF6/tQBsF1XkVsb"
                    crossOrigin="anonymous"
                />

                {/* Title Section */}
                <div className="text-center mb-5">
                    <h1 className="display-4" style={{ color: "#007bff" }}>Về Chúng Tôi</h1>
                    <p className="lead text-muted fw-bold">
                        Trang web của chúng tôi là nền tảng đặt phòng trọ hàng đầu, 
                        mang đến sự tiện lợi và nhanh chóng cho việc tìm kiếm chỗ ở phù hợp.
                    </p>
                </div>

                {/* Divider */}
                <hr className="my-5" style={{ borderTop: "2px solid #007bff", opacity: 0.3 }} />

                {/* Values Section */}
                <div className="row mb-5">
                    <div className="col-md-6 mb-4">
                        <img 
                            src="https://triciac4.sg-host.com/wp-content/uploads/2024/06/finance5.jpg" 
                            alt="Giá Trị Của Chúng Tôi" 
                            className="img-fluid rounded shadow-sm" 
                        />
                    </div>
                    <div className="col-md-6">
                        <h3 style={{ color: "#007bff" }}>Giá Trị Của Chúng Tôi</h3>
                        <p className="fw-bold fs-5 text-dark">
                            Chúng tôi đề cao sự trung thực, trách nhiệm và luôn đặt lợi ích của khách hàng lên hàng đầu.
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-5" style={{ borderTop: "2px solid #007bff", opacity: 0.3 }} />

                {/* Mission Section */}
                <div className="row mb-5 flex-md-row-reverse">
                    <div className="col-md-6 mb-4">
                        <img 
                            src="https://hipokampus.com.tr/blog/wp-content/uploads/2023/08/6-businesss-club-1.jpg" 
                            alt="Sứ Mệnh Của Chúng Tôi" 
                            className="img-fluid rounded shadow-sm" 
                        />
                    </div>
                    <div className="col-md-6">
                        <h3 style={{ color: "#007bff" }}>Sứ Mệnh Của Chúng Tôi</h3>
                        <p className="fw-bold fs-5 text-dark">
                            Chúng tôi cam kết cung cấp một nền tảng đáng tin cậy và dễ sử dụng, 
                            giúp khách hàng tìm được chỗ ở phù hợp với nhu cầu của mình.
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-5" style={{ borderTop: "2px solid #007bff", opacity: 0.3 }} />

                {/* Team Section */}
                <div className="text-center mb-4">
                    <h3 style={{ color: "#007bff" }}>Đội Ngũ Của Chúng Tôi</h3>
                    <p className="text-muted">
                        Đội ngũ chuyên nghiệp và tận tâm của chúng tôi luôn sẵn sàng hỗ trợ bạn.
                    </p>
                </div>
                <div className="row text-center">
                    {[
                        { name: "Lân Phạm", role: "Giám Đốc Điều Hành", image: "https://t4.ftcdn.net/jpg/06/34/40/27/360_F_634402775_bEI4r4gDSooIj8xyM8l0nYTiYDyS75SL.jpg" },
                        { name: "Trần Ngọc Minh", role: "Trưởng Phòng Kỹ Thuật", image: "https://t4.ftcdn.net/jpg/06/34/40/27/360_F_634402775_bEI4r4gDSooIj8xyM8l0nYTiYDyS75SL.jpg" },
                        { name: "Minh Hiếu", role: "Trưởng Phòng Kinh Doanh", image: "https://t4.ftcdn.net/jpg/06/34/40/27/360_F_634402775_bEI4r4gDSooIj8xyM8l0nYTiYDyS75SL.jpg" },
                        { name: "Nguyễn Trần Quốc Bảo", role: "Trưởng Phòng Kỹ Thuật", image: "https://t4.ftcdn.net/jpg/06/34/40/27/360_F_634402775_bEI4r4gDSooIj8xyM8l0nYTiYDyS75SL.jpg" },
                        { name: "Tô Sam Sung", role: "Trưởng Phòng Kỹ Thuật", image: "https://t4.ftcdn.net/jpg/06/34/40/27/360_F_634402775_bEI4r4gDSooIj8xyM8l0nYTiYDyS75SL.jpg" }
                    ].map((member, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <img 
                                src={member.image} 
                                alt={`Thành Viên ${index + 1}`} 
                                className="img-fluid rounded-circle mb-3 shadow-sm" 
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />
                            <h5 className="fw-bold" style={{ color: "#007bff" }}>{member.name}</h5>
                            <p className="text-muted">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default About;
