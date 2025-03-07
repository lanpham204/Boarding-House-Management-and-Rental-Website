import React, { Component, useEffect, useState } from "react";
import axios from "axios"; // Import axios for making API requests
import "react-alice-carousel/lib/alice-carousel.css";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Button, Comment, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { checkBlog, deleteBlog, getCurrentUser, saveBlog, sendEmailForContact } from "../../services/fetch/ApiUtils";
import { toast } from "react-toastify";
import Pagination from "./Pagnation";
import avatarDefault from "../../assets/img/avatar-default.png"
import { API_BASE_URL } from "../../constants/Connect";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModalAddContract from "./modal/ModalAddContract";
import roomDefault from "../../assets/img/room-default.jpeg"
import { Modal } from "antd";
const RentailHomeDetail = (props) => {
    const { id } = useParams();
    const { authenticated, role, currentUser, location, onLogout } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [totalItems, setTotalItems] = useState(0);
    const [totalItemRates, setTotalItemsRates] = useState(0);
    const [rooms, setRooms] = useState();
    const [contract, setContract] = useState()
    const [user, setUser] = useState()
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [content, setContent] = useState("")
    const [rate, setRate] = useState(5);
    const [submittingComment, setSubmittingComment] = useState(false);
    const [rates, setRates] = useState([]);
    const [toEmail, setToEmail] = useState("")
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [nameOfRentaler, setNameOfRentaler] = useState("")
    const [selectImage, setSelectImage] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [check, setCheck] = useState(false);
    const history = useNavigate();
    useEffect(() => {
        fetchRooms(); // Call the fetchRooms function when component mounts
        fetchRates();
        if (id) {
            fetchCheckBlog(id)
        }
    }, [id]);
    const fetchCheckBlog = (id) => {
        checkBlog(id).then(response => {
            console.log(response.success);
            setCheck(response.success)
        }).catch(err => console.log(err)
        )
    }

    const handleReset = () => {
        setTitle("")
        setNameOfRentaler("")
        setDescription("")
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const sendEmailRequest = { title, nameOfRentaler, toEmail, description };
        sendEmailForContact(sendEmailRequest).then(response => {
            console.log(response.message)
            toast.success(response.message)
            handleReset()
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    };
    const handleShowModal = () => {
        if (currentUser==null || currentUser.phone == null || currentUser.phone == undefined) {
            toast.error('Vui lòng thêm số điện thoại trước khi thuê phòng')
            history("/profile")
            return;
        }
        if (authenticated) {
            setShowModal(true)
        } else {
            setShowModal(false)
            history("/login")
        }
    }
    const handleCancel = () => {
        setShowModal(false); // Close modal
    };
    const fetchRooms = async () => {
        try {
            const id = window.location.pathname.split("/").pop();
            const response = await axios.get(`${API_BASE_URL}/room/${id}`);
            const data = response.data;
            const roomRentContract = response.data.contracts.find(contract => contract.status === 'RENT');
            setContract(roomRentContract);
            setRooms(data)
            setToEmail(data.user.email)
            countAverageRating();
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
    };

    const fetchRates = async () => {
        try {
            const id = window.location.pathname.split("/").pop();
            const response = await axios.get(`${API_BASE_URL}/room/${id}/rates?pageNo=${currentPage}&pageSize=${itemsPerPage}`);
            const rates = response.data.content;

            setRates(rates)
            setTotalItems(response.data.totalElements);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };
    const countAverageRating = async () => {
        const id = window.location.pathname.split("/").pop();
        const response = await axios.get(`${API_BASE_URL}/room/${id}/rates?pageNo=${1}&pageSize=${1000}`);
        const ratesAverage = response.data.content;
        setTotalItemsRates(response.data.totalElements)

        if (ratesAverage.length > 0) {
            const totalRating = ratesAverage.reduce((total, item) => total + item.rating, 0);
            const average = ratesAverage.length > 0 ? (totalRating / ratesAverage.length).toFixed(2) : 5;
            setAverageRating(Number(average));
        }


    };
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleSaveBlog = () => {
        saveBlog(id)
            .then(response => {
                if (response.success) {
                    toast.success("Lưu thành công")
                    setCheck(true)
                }
            })
            .catch(error => {
                toast.error((error && error.message) || 'Vui lòng đăng nhập để có thể lưu bài đăng.');
            });
    }
    const handleDeleteBlog = () => {
        deleteBlog(id).then(response => {
            if (response.success) {
                setCheck(false)
                toast.success("Hủy lưu thành công")

            }
        }).catch(error => console.log(error))
    }

    const handleSubmitComment = async (event) => {
        event.preventDefault();
        const roomId = window.location.pathname.split("/").pop();; // Assuming room id is available
        console.log(content);

        // Construct the comment data
        const commentData = {
            content: content,
            rating: rate,
            room_id: roomId,
        };

        // Replace with your JWT token retrieval logic from localStorage
        const accessToken = localStorage.getItem("accessToken");

        try {
            setSubmittingComment(true);
            // Make the API request to submit the comment
            const response = await axios.post(
                `${API_BASE_URL}/room/${roomId}/rates`,
                commentData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            // Handle success and reset the form
            console.log("Comment submitted:", response.data);
            setContent("")
            setRate(5)
            setSubmittingComment(false)
            setShowCommentForm(false)
            fetchRates();
        } catch (error) {
            console.log(commentData)
            console.error("Error submitting comment:", error);
            setSubmittingComment(false)
        }
    };


    return (
        <section className="bg-light d-block">
            {/* <div style={{ height: "150px" }}></div> */}
            <div className="container">
                <div class="row">
                    <div class="col-md-12 col-lg-8">
                        <div class="title-single-box mt-4" >
                            <sup></sup>
                            <span class="color-text-a">Khu vực: {rooms?.location?.address + ' ' + rooms?.location?.ward + ' ' + rooms?.location?.district + ' ' + rooms?.location?.cityName ?? ""}</span> &nbsp;&nbsp;
                            <button type="button" onClick={() => check ? handleDeleteBlog() : handleSaveBlog()} class="btn btn-outline-success rounded-pill">{check ? "Hủy lưu -" : "Lưu +"}</button>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-4">
                        <nav aria-label="breadcrumb" class="breadcrumb-box d-flex justify-content-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="/">Trang chủ</a>
                                </li>
                                <li class="breadcrumb-item">
                                    {rooms?.category?.name ?? ""}
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">

                    <div className="col-lg-5 mt-5">
                        <div className="card mb-3">
                            <a target="_blank" href={rooms?.roomMedia?.[selectImage]?.files == "" ? roomDefault : rooms?.roomMedia?.[selectImage]?.files}>
                                <img className="card-img img-fluid" style={{ width: "500px", height: "300px" }} src={rooms?.roomMedia?.[selectImage]?.files == "" ? roomDefault : rooms?.roomMedia?.[selectImage]?.files} alt="Card image cap" id="product-detail" />
                            </a>
                        </div>
                        <div className="row">
                            {/*Start Controls*/}
                            {/* <div className="col-1 align-self-center">
                                <a href="#multi-item-example" role="button" data-bs-slide="prev">
                                    <i className="text-dark fas fa-chevron-left" />
                                    <span className="sr-only">Previous</span>
                                </a>
                            </div> */}
                            <div className="d-flex between">
                                {rooms?.roomMedia.map((media, index) =>
                                    <div className="col-md-4 col-lg-3" key={"image-" + media?.id}>
                                        <div className={`${index == selectImage ? "p-1 bg-primary" : ""}`}>
                                            <img className={`card-img img-fluid`} onClick={() => setSelectImage(index)} src={media?.files == "" ? roomDefault : media?.files} alt="Product Image 1" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* <div className="col-1 align-self-center">
                                <a href="#multi-item-example" role="button" data-bs-slide="next">
                                    <i className="text-dark fas fa-chevron-right" />
                                    <span className="sr-only">Next</span>
                                </a>
                            </div> */}
                            {/*End Controls*/}
                        </div>
                    </div>
                    {/* col end */}
                    <div className="col-lg-7 mt-5 d-block" style={{ height: "100%" }} >
                        <div className="card">
                            <div className="card-body" style={{ height: "100%" }}>
                                <h1>{rooms?.title}</h1>
                                <p className="h3 py-2">{rooms?.price?.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}/Tháng</p>
                                <p className="py-2">
                                    <Stack spacing={1}>
                                        <Rating
                                            name="half-rating"
                                            value={averageRating}
                                            precision={0.5}
                                            readOnly
                                        />
                                    </Stack>
                                    <span className="list-inline-item text-dark">Rating {averageRating} | {totalItemRates} Comments</span>
                                </p>
                                <h6>Mô tả:</h6>
                                <p>{rooms?.description}</p>
                                <ul className="list-inline">
                                    <li class="d-flex justify-content-between">
                                        <strong>Địa chỉ: </strong>
                                        <span>
                                            {rooms?.location?.address + ' ' + rooms?.location?.ward + ' ' + rooms?.location?.district + ' ' + rooms?.location?.cityName ?? ""}
                                        </span>
                                    </li>
                                    <li class="d-flex justify-content-between">
                                        <strong>Loại phòng</strong>
                                        <span>{rooms && rooms.category.name}</span>
                                    </li>
                                    <li class="d-flex justify-content-between">
                                        <strong>Ngày hết hạn thuê:</strong>
                                        <span>{contract ? contract.endDate : 'Chưa có người thuê'}</span>
                                    </li>
                                    <li>
                                        <strong>Tài sản</strong>
                                        {rooms && rooms.assets.map((item, index) => (
                                            <li key={"li-" + index} class="d-flex justify-content-between">
                                                <span>{item.name}:</span>
                                                <span>{item.number}</span>
                                            </li>
                                        ))}
                                    </li>

                                </ul>
                                <input type="hidden" name="product-title" defaultValue="Activewear" />
                                <div className="row pb-3">
                                    <div className="col d-grid">
                                        <button className="btn btn-success btn-lg" name="submit" value="buy"

                                            onClick={() => handleShowModal()}
                                        >Thuê</button>
                                    </div>
                                    <div className="col d-grid">
                                        <button onClick={() => check ? handleDeleteBlog() : handleSaveBlog()} className="btn btn-success btn-lg">{check ? "Hủy lưu" : "Lưu"}</button>
                                    </div>
                                </div>
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
                                <Link to={"/angent-single/" + rooms?.user?.id}>
                                    <img src={rooms?.user?.imageUrl == "null" || !rooms?.user?.imageUrl ? avatarDefault : rooms?.user?.imageUrl} alt="" class="img-fluid" />
                                </Link>
                            </div>
                            <div class="col-md-6 col-lg-4">
                                <div class="property-agent">
                                    <h4 class="title-agent">{rooms ? rooms.user.name : ""} <Link className='mx-3 btn btn-outline-success rounded-pill' to={`/profile/message?username=${rooms?.user.name || ''}`}>
                                        Nhắn tin
                                    </Link></h4>

                                    <p class="color-text-a">
                                        Phòng luôn chất lượng đảm bảo đúng sự thật và không các chi tiết khiến người dùng thất vọng
                                        khi đến xem và kiểm tra phòng. An ninh tuyệt đối.
                                    </p>
                                    <ul class="list-unstyled">
                                        <li class="d-flex justify-content-between">
                                            <strong>Số điện thoại:</strong>
                                            <span class="color-text-a">{rooms ? rooms.user.phone : ""}</span>
                                        </li>
                                        <li class="d-flex justify-content-between">
                                            <strong>Địa chỉ:</strong>
                                            <span class="color-text-a">{rooms ? rooms.user.address : ""}</span>
                                        </li>
                                        <li class="d-flex justify-content-between">
                                            <strong>Email: </strong>
                                            <span class="color-text-a"> {rooms ? rooms.user.email : ""}</span>
                                        </li>
                                    </ul>
                                    <div class="socials-a">
                                        <ul class="list-inline">
                                            {rooms && rooms.user.facebookUrl ?
                                                <li className="list-inline-item">
                                                    <a href={rooms ? rooms.user.facebookUrl : ""} className="link-one" target="_blank">
                                                        <i className="bi bi-facebook" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                : <></>}
                                            {rooms && rooms.user.zaloUrl ?
                                                <li className="list-inline-item">
                                                    <a href={rooms ? rooms.user.zaloUrl : ""} className="link-one" target="_blank">
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
                                    <form className="form-a" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-12 mb-1">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg form-control-a"
                                                        id="inputName"
                                                        placeholder="Tên *"
                                                        name="nameOfRentaler"
                                                        value={nameOfRentaler}
                                                        onChange={(e) => setNameOfRentaler(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-1">
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-lg form-control-a"
                                                        id="inputEmail1"
                                                        placeholder="Email *"
                                                        name="title"
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-1">
                                                <div className="form-group">
                                                    <textarea
                                                        id="textMessage"
                                                        className="form-control"
                                                        placeholder="Bình luận *"
                                                        name="description"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        cols="45"
                                                        rows="8"
                                                        required
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-3">
                                                <button type="submit" className="btn btn-a">
                                                    Gửi tin nhắn
                                                </button>
                                            </div>
                                        </div>
                                    </form>
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
                                    {props.authenticated ?
                                        <>
                                            {showCommentForm ? (
                                                <Form onSubmit={handleSubmitComment}>
                                                    <h1>Đánh giá chất lượng</h1>
                                                    <Stack spacing={1}>
                                                        <Rating
                                                            name="half-rating"
                                                            value={rate}
                                                            precision={0.5}
                                                            onChange={(event, newValue) => setRate(newValue)}
                                                        />
                                                    </Stack>
                                                    <Form.TextArea
                                                        label="Chất lượng nhà trọ"
                                                        placeholder="Để lại cảm nhận của bạn tại đây...."
                                                        value={content}
                                                        onChange={(event) => setContent(event.target.value)}
                                                    />
                                                    <div className="col-md-12 mt-3">
                                                        <Button
                                                            type="submit"
                                                            className="btn btn-a"
                                                            disabled={submittingComment}
                                                        >
                                                            {submittingComment ? "Đang gửi..." : "Bình luận"}
                                                        </Button>
                                                    </div>
                                                </Form>
                                            ) : (
                                                <div class="col-md-12 mt-3">
                                                    <button onClick={() => setShowCommentForm(true)} class="btn btn-a">Thêm bình luận</button>
                                                </div>
                                            )}
                                        </> : "Vui lòng đăng nhập bình luận và đánh giá"}
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
            <Modal
                title="Yêu cầu hợp đồng"
                // visible={showModal}
                open={showModal}
                onCancel={handleCancel}
                footer={null} // You can customize footer or remove it if not needed
                width={800} // Customize the modal width if needed
            >
                <div className="modal-body overflow-auto">
                    {showModal && <ModalAddContract onClose={handleCancel} contract={contract} room={rooms} />}
                </div>
                <div className="modal-footer">
                    <Button type="default" onClick={handleCancel}>
                        Close
                    </Button>
                </div>
            </Modal>
        </section>
    )
}

export default RentailHomeDetail;