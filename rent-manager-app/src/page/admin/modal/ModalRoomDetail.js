
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getRoom } from '../../../services/fetch/ApiUtils';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Map from '../map/MyMapComponent';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Button, Comment, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import Pagination from '../../user/Pagnation';
import { API_BASE_URL } from '../../../constants/Connect';


const ModalRoomDetails = ({ roomId }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [totalItems, setTotalItems] = useState(0);
    const [totalItemRates, setTotalItemsRates] = useState(0);
    const [rates, setRates] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    const [roomData, setRoomData] = useState({
        title: '',
        description: '',
        price: 0,
        latitude: 0.0,
        longitude: 0.0,
        address: '',
        locationId: 0,
        category: [{
            id: '', name: ''
        }],
        assets: [
            { name: '', number: '' }
        ],
        roomMedia: [],
        user: ''
    });

    useEffect(() => {
        getRoom(roomId)
            .then(response => {
                const room = response;
                setRoomData(prevState => ({
                    ...prevState,
                    ...room
                }));
                countAverageRating();
            })
            .catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });
        fetchRates();
    }, [roomId, currentPage]);



    const fetchRates = async () => {
        try {
            const id = window.location.pathname.split("/").pop();
            const response = await axios.get(`${API_BASE_URL}/room/${roomId}/rates?pageNo=${currentPage}&pageSize=${itemsPerPage}`);
            const rates = response.data.content;
            setRates(rates)
            setTotalItems(response.data.totalElements);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };
    const countAverageRating = async () => {
        const id = window.location.pathname.split("/").pop();
        const response = await axios.get(`${API_BASE_URL}/room/${roomId}/rates?pageNo=${1}&pageSize=${1000}`);
        const ratesAverage = response.data.content;
        setTotalItemsRates(response.data.totalElements)

        if (ratesAverage.length > 0) {
            const totalRating = ratesAverage.reduce((total, item) => total + item.rating, 0);
            const average = ratesAverage.length > 0 ? (totalRating / ratesAverage.length).toFixed(2) : 5;
            setAverageRating(Number(average));
        } else {
            setAverageRating(0)
        }


    };
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [selectImage, setSelectImage] = useState(0)
    console.log(roomData)
    return (
        <section className="bg-light d-block">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 mt-5">
                        <div className="card mb-3">
                            <a target="_blank" href={roomData?.roomMedia?.[selectImage]?.files}>
                                <img className="card-img img-fluid" style={{ width: "550px", height: "300px" }} src={roomData?.roomMedia?.[selectImage]?.files} alt="Card image cap" id="product-detail" />
                            </a>
                        </div>
                        <div className="row">
                            <div className="d-flex between">
                                {roomData?.roomMedia.map((media, index) =>
                                    <div className="col-md-4 col-lg-3" key={"image-" + media?.id}>
                                        <div className={`${index == selectImage ? "p-1 bg-primary" : ""}`}>
                                            <img className={`card-img img-fluid`} onClick={() => setSelectImage(index)} src={media?.files} alt="Product Image 1" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* col end */}
                    <div className="col-lg-7 mt-5 d-block" style={{ height: "100%" }} >
                        <div className="card">
                            <div className="card-body" style={{ height: "100%" }}>
                                <h1 className="h2">{roomData?.title}</h1>
                                <p className="h3 py-2">{roomData?.price?.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}</p>
                                <p className="py-2">
                                    <i className="fa fa-star text-warning" />
                                    <i className="fa fa-star text-warning" />
                                    <i className="fa fa-star text-warning" />
                                    <i className="fa fa-star text-warning" />
                                    <i className="fa fa-star text-secondary" />
                                    <span className="list-inline-item text-dark">Rating {averageRating} | {totalItemRates} Comments</span>
                                </p>
                                <h6>Mô tả:</h6>
                                <p>{roomData?.description}</p>
                                <ul className="list-inline">
                                    <li class="d-flex justify-content-between">
                                        <strong>Khu vực: </strong>
                                        <span>
                                            {roomData?.location?.cityName}
                                        </span>
                                    </li>
                                    <li class="d-flex justify-content-between">
                                        <strong>Loại phòng</strong>
                                        <span>{roomData && roomData.category.name}</span>
                                    </li>
                                    <li class="d-flex justify-content-between">
                                        <strong>Trạng thái:</strong>
                                        <span>{roomData && roomData.status ? (roomData.status == "ROOM_RENT" ? "Cho thuê" : "Đã cho thuê") : ""}</span>
                                    </li>
                                    <li class="d-flex justify-content-between">
                                        <strong>Địa chỉ:</strong>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span>
                                            {roomData?.location?.address + ', ' + roomData?.location?.ward + ', ' + roomData?.location?.district}
                                        </span>
                                    </li>
                                    <li>
                                        <strong>Tài sản:</strong>
                                        {roomData && roomData.assets.map((item, index) => (
                                            <li key={"li-" + index} class="d-flex justify-content-between">
                                                <span>{item.name}:</span>
                                                <span>{item.number}</span>
                                            </li>
                                        ))}
                                    </li>

                                </ul>
                                <input type="hidden" name="product-title" defaultValue="Activewear" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div class="col-md-12">
                        <div class="row section-t3">
                            <div class="col-sm-12">
                                <div class="title-box-d">
                                    <h3 class="title-d">Người cho thuê</h3>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-lg-4">
                                <img src={roomData ? roomData.user.imageUrl : ""} alt="" class="img-fluid" />                                        </div>
                            <div class="col-md-6 col-lg-4">
                                <div class="property-agent">
                                    <h4 class="title-agent">{roomData ? roomData.user.name : ""}</h4>
                                    <p class="color-text-a">
                                        Phòng luôn chất lượng đảm bảo đúng sự thật và không các chi tiết khiến người dùng thất vọng
                                        khi đến xem và kiểm tra phòng. An ninh tuyệt đối.
                                    </p>
                                    <ul class="list-unstyled">
                                        <li class="d-flex justify-content-between">
                                            <strong>Số điện thoại:</strong>
                                            <span class="color-text-a">{roomData ? roomData.user.phone : ""}</span>
                                        </li>
                                        <li class="d-flex justify-content-between">
                                            <strong>Email: </strong>
                                            <span class="color-text-a"> {roomData ? roomData.user.email : ""}</span>
                                        </li>
                                    </ul>
                                    <div class="socials-a">
                                        <ul class="list-inline">
                                            {roomData && roomData.user.facebookUrl ?
                                                <li className="list-inline-item">
                                                    <a href={roomData ? roomData.user.facebookUrl : ""} className="link-one" target="_blank">
                                                        <i className="bi bi-facebook" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                : <></>}
                                            {roomData && roomData.user.zaloUrl ?
                                                <li className="list-inline-item">
                                                    <a href={roomData ? roomData.user.zaloUrl : ""} className="link-one" target="_blank">
                                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="50" viewBox="0 0 50 50">
                                                            <path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 15.576172 6 C 12.118043 9.5981082 10 14.323627 10 19.5 C 10 24.861353 12.268148 29.748596 15.949219 33.388672 C 15.815412 33.261195 15.988635 33.48288 16.005859 33.875 C 16.023639 34.279773 15.962689 34.835916 15.798828 35.386719 C 15.471108 36.488324 14.785653 37.503741 13.683594 37.871094 A 1.0001 1.0001 0 0 0 13.804688 39.800781 C 16.564391 40.352722 18.51646 39.521812 19.955078 38.861328 C 21.393696 38.200845 22.171033 37.756375 23.625 38.34375 A 1.0001 1.0001 0 0 0 23.636719 38.347656 C 26.359037 39.41176 29.356235 40 32.5 40 C 36.69732 40 40.631169 38.95117 44 37.123047 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 18.496094 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 34.804688 C 40.72689 36.812719 36.774644 38 32.5 38 C 29.610147 38 26.863646 37.459407 24.375 36.488281 C 22.261967 35.634656 20.540725 36.391201 19.121094 37.042969 C 18.352251 37.395952 17.593707 37.689389 16.736328 37.851562 C 17.160501 37.246758 17.523335 36.600775 17.714844 35.957031 C 17.941109 35.196459 18.033096 34.45168 18.003906 33.787109 C 17.974816 33.12484 17.916946 32.518297 17.357422 31.96875 L 17.355469 31.966797 C 14.016928 28.665356 12 24.298743 12 19.5 C 12 14.177406 14.48618 9.3876296 18.496094 6 z M 32.984375 14.986328 A 1.0001 1.0001 0 0 0 32 16 L 32 25 A 1.0001 1.0001 0 1 0 34 25 L 34 16 A 1.0001 1.0001 0 0 0 32.984375 14.986328 z M 18 16 A 1.0001 1.0001 0 1 0 18 18 L 21.197266 18 L 17.152344 24.470703 A 1.0001 1.0001 0 0 0 18 26 L 23 26 A 1.0001 1.0001 0 1 0 23 24 L 19.802734 24 L 23.847656 17.529297 A 1.0001 1.0001 0 0 0 23 16 L 18 16 z M 29.984375 18.986328 A 1.0001 1.0001 0 0 0 29.162109 19.443359 C 28.664523 19.170123 28.103459 19 27.5 19 C 25.578848 19 24 20.578848 24 22.5 C 24 24.421152 25.578848 26 27.5 26 C 28.10285 26 28.662926 25.829365 29.160156 25.556641 A 1.0001 1.0001 0 0 0 31 25 L 31 22.5 L 31 20 A 1.0001 1.0001 0 0 0 29.984375 18.986328 z M 38.5 19 C 36.578848 19 35 20.578848 35 22.5 C 35 24.421152 36.578848 26 38.5 26 C 40.421152 26 42 24.421152 42 22.5 C 42 20.578848 40.421152 19 38.5 19 z M 27.5 21 C 28.340272 21 29 21.659728 29 22.5 C 29 23.340272 28.340272 24 27.5 24 C 26.659728 24 26 23.340272 26 22.5 C 26 21.659728 26.659728 21 27.5 21 z M 38.5 21 C 39.340272 21 40 21.659728 40 22.5 C 40 23.340272 39.340272 24 38.5 24 C 37.659728 24 37 23.340272 37 22.5 C 37 21.659728 37.659728 21 38.5 21 z"></path>
                                                        </svg>
                                                    </a>
                                                </li>
                                                : <></>}

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div id="rent" className="col-md-12 col-lg-4">
                                <div className="property-contact">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="row section-t3">
                            <div class="col-sm-12">
                                <div class="title-box-d">
                                    <h3 class="title-d">Bình luận và đánh giá</h3>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-lg-4">
                                <div class="property-agent">
                                    <Comment.Group>
                                        {rates?.map((rate, index) => (
                                            <Comment key={"comment-" + index}>
                                                <Comment.Content style={{ padding: '1rem' }}>
                                                    <Stack spacing={1}>
                                                        <Rating name="half-rating" defaultValue={rate.rating} precision={0.5} readOnly />
                                                    </Stack>
                                                    {rate.user.imageUrl ?
                                                        <Comment.Avatar src={rate.user.imageUrl} style={{ marginRight: "10px" }} />
                                                        :
                                                        <Comment.Avatar src="../../assets/img/agent-1.jpg" style={{ marginRight: "10px" }} />
                                                    }
                                                    <Comment.Author as='a'>{rate.user.name}</Comment.Author>
                                                    <Comment.Metadata>
                                                        <div>{rate.createdAt.split('T')[0]}</div>
                                                    </Comment.Metadata>
                                                    <Comment.Text>{rate.content}</Comment.Text>
                                                </Comment.Content>
                                            </Comment>
                                        ))}
                                    </Comment.Group>
                                </div>
                                <Pagination
                                    itemsPerPage={itemsPerPage}
                                    totalItems={totalItems}
                                    currentPage={currentPage}
                                    paginate={paginate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default ModalRoomDetails;