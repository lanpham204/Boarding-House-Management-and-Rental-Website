import React, { useEffect, useState } from 'react';
import SidebarNav from '../SidebarNav';
import Nav from '../Nav';
import Pagination from '../Pagnation';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { approveRoomOfAdmin, disableRoom, getAllRoomOfAdmin, removeRoomOfAdmin } from '../../../services/fetch/ApiUtils';
import ModalRoomDetails from '../modal/ModalRoomDetail';

function RoomManagement(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const history = useNavigate();

    const [roomId, setRoomId] = useState(4);
    const [showModal, setShowModal] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch data from the API
    useEffect(() => {
        fetchData();
    }, [currentPage, searchQuery]);

    const fetchData = () => {
        getAllRoomOfAdmin(currentPage, itemsPerPage, searchQuery, "REQUEST").then(response => {
            setTableData(response.content);
            setTotalItems(response.totalElements);
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSetRoomId = (id) => {
        setRoomId(id);
        setShowModal(true);
    }

    const handleSendEmail = (userId) => {
        history('/admin/send-email/' + userId)
    }

    const handleIsApprove = (id) => {
        approveRoomOfAdmin(id).then(response => {
            toast.success(response.message)
            fetchData();
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    const handleIsRemove = (id) => {
        removeRoomOfAdmin(id).then(response => {
            toast.success(response.message)
            fetchData();
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    console.log("ROOMID", roomId)

    if (!authenticated) {
        return <Navigate
            to={{
                pathname: "/login-admin",
                state: { from: location }
            }} />;
    }

    return (
        <div className="main">

            <br />
            <div className="container-fluid p-0"></div>
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Quản lý phòng trọ và bài đăng</h5>
                    <h6 className="card-subtitle text-muted"> Quản lý thật tốt các chức năng của phòng trọ.</h6>
                </div>
                <div className="card-body">
                    <div id="datatables-buttons_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer"><div className="row"><div className="col-sm-12 col-md-6"><div className="dt-buttons btn-group flex-wrap">
                    </div></div>
                        <div className="col-sm-12 col-md-6"><div id="datatables-buttons_filter" className="dataTables_filter">
                            <label>Search:<input type="search" className="form-control form-control-sm" placeholder=""
                                aria-controls="datatables-buttons"
                                value={searchQuery}
                                onChange={handleSearch} /></label>
                        </div></div></div><div className="row dt-row"><div className="col-sm-12"><table id="datatables-buttons" className="table table-striped table-sm table-bordered table-hover" style={{ width: "100%" }} aria-describedby="datatables-buttons_info">
                            <thead>
                                <tr>
                                    <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Tên Phòng</th>
                                    <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "290px" }} >Mô Tả</th>
                                    <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "156px" }} >Địa Chỉ</th>
                                    <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "75px" }} >Giá</th>
                                    <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "142px" }} >Trạng Thái</th>
                                    <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "110px" }} >Phê duyệt</th>
                                    <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "134px" }} >Gỡ tin</th>
                                    <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "54px" }} ></th></tr>
                            </thead>
                            <tbody>
                                {tableData.map((item) => (
                                    <tr className="odd">
                                        <td className="dtr-control sorting_1" tabindex="0">{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.location.address + ' ' + item.location.ward}</td>
                                        <td>{item.price && item.price.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}</td>
                                        <td style={{ color: "green" }}>{item.status === "ROOM_RENT" || item.status === "CHECKED_OUT" ? "Chưa thuê" : "Đã thuê"}</td>
                                        <td style={{ color: "green" }}>
                                            <button type="button" class="btn btn-outline-success" onClick={() => handleIsApprove(item.id)}>
                                                {item.isApprove === false ? "Duyệt" : "Đã duyệt"}
                                            </button>
                                        </td>
                                        <td style={{ color: "green" }}>
                                            <button type="button" class="btn btn-outline-danger" onClick={() => handleIsRemove(item.id)}>
                                                {item.isRemove === false ? "Gỡ" : "Đã gỡ"}
                                            </button>
                                        </td>
                                        <td>
                                            <a href="#" onClick={() => handleSendEmail(item.user.id)} data-toggle="tooltip" data-placement="bottom" title="Gửi email"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" /></svg></a>

                                            &nbsp;
                                            <a
                                                onClick={() => handleSetRoomId(item.id)}
                                                data-bs-toggle="modal"
                                                data-bs-target=".bd-example-modal-lg"
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="Xem chi tiết"
                                            >  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg> </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
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

            <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Chi tiết bài đăng tin</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body overflow-auto">
                            {showModal && <ModalRoomDetails roomId={roomId} />}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomManagement;