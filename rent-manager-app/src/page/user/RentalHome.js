import React, { useState, useEffect } from "react";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import Pagination from "./Pagnation";
import { getAllCategoryOfAdmin, getAllRoomOfCustomer } from "../../services/fetch/ApiUtils";
import LocationSelector from "../../common/LocationSelector";
import { DatePicker, Select, Space } from 'antd';
import RoomCart from "../../element/RoomCart";
const { Option } = Select;

const RentalHome = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [totalItems, setTotalItems] = useState(0);
    const [rooms, setRooms] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [price, setPrice] = useState('');
    const [city, setCity] = useState('');
    const [district, setDisTrict] = useState('');
    const [ward, setWard] = useState('');
    const [deadlineContract, setDeadlineContract] = useState(null);
    const [cateId, setCateId] = useState(0);
    const [locationReq, setLocationReq] = useState({
        cityName: '',
        district: '',
        ward: '',
        address: '',
        user: '',
    });
    useEffect(() => {
        fetchData();
    }, [currentPage, searchQuery, price, cateId, locationReq, deadlineContract]);

    const fetchData = () => {
        if (locationReq.cityName !== undefined) {
        }
        getAllRoomOfCustomer(currentPage, itemsPerPage, searchQuery, price, cateId, locationReq.cityName, locationReq.district, locationReq.ward, deadlineContract).then(response => {
            setRooms(response.content);
            setTotalItems(response.totalElements);
            console.log(response);

        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
        getAllCategoryOfAdmin(1, 100).then(response => {
            setCategories(response.content);
        }).catch(
            error => {
                // toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }
    const onChange = (date, dateString) => {
        if (dateString !== '') {
            setDeadlineContract(dateString + "T00:00:00")
        } else {
            setDeadlineContract(null)
        }
        console.log(dateString);

    };
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleCategoryChange = (value) => {
        setCateId(value);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Header authenticated={props.authenticated} currentUser={props.currentUser} onLogout={props.onLogout} />
            <main id="main">
                <section className="intro-single">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-8">
                                <div className="title-single-box">
                                    <h1 className="title-single">PHÒNG TRỌ</h1>
                                    <span className="color-text-a">Cho thuê phòng trọ</span>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-4">
                                <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="/">Trang chủ</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="property-grid grid">
                    <div className="container">
                        <div className="row" style={{ marginBottom: "30px" }}>
                            <div className="col-sm-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="searchQuery"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    id="inputAddress"
                                    placeholder="Tên phòng"

                                />
                            </div>
                            <div className="col-sm-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    value={price}
                                    onChange={handlePriceChange}
                                    id="inputAddress"
                                    placeholder="Giá"

                                />
                            </div>
                            <div className="col-sm-3">
                                <Select
                                    placeholder="Chọn danh mục"
                                    style={{ width: 200 }}
                                    value={cateId}
                                    onChange={handleCategoryChange}
                                    allowClear
                                >
                                    {<Option key={0} value={0}>
                                        Chọn...
                                    </Option>}
                                    {categories
                                        .map(category => (
                                            <Option key={category.id} value={category.id}>
                                                {category.name}
                                            </Option>
                                        ))}
                                </Select>
                            </div>
                            <div className="col-sm-3">
                                <Space direction="vertical" >
                                    <DatePicker style={{ width: 255 }} placeholder="Chọn ngày muốn thuê" onChange={onChange} />
                                </Space>
                            </div>

                            <div className="col-sm-12 mt-3">
                                <label>Địa điểm</label>
                                <LocationSelector locationReq={locationReq}
                                    setLocationReq={setLocationReq} />
                            </div>

                        </div>
                        <div className="row">
                            {rooms.map((room, index) => (
                                <RoomCart key={index} room={room} />
                            ))}

                        </div>
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={totalItems}
                            currentPage={currentPage}
                            paginate={paginate}
                        />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default RentalHome;