import React, { useEffect, useState } from 'react';
import SidebarNav from './SidebarNav';
import Nav from './Nav';
import { disableRoom, getAllRoomOfRentaler } from '../../services/fetch/ApiUtils';
import Pagination from './Pagnation';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import ModalRoomDetails from '../admin/modal/ModalRoomDetail';
// import ModalRoomDetails from './modal/ModalRoomDetail';

function RoomManagement(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const history = useNavigate();
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const [roomId, setRoomId] = useState(4);
    const [showModal, setShowModal] = useState(false);

    // Fetch data from the API
    useEffect(() => {
        fetchData();
    }, [currentPage, searchQuery]);

    const fetchData = () => {
        getAllRoomOfRentaler(currentPage, itemsPerPage, searchQuery).then(response => {
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

    const handleRedirectAddRoom = () => {
        history('/rentaler/add-room')
    }

    const handleEditRoom = (id) => {
        history('/rentaler/edit-room/' + id)
    }

    const handleSetRoomId = (id) => {
        setRoomId(id);
        setShowModal(true);
    }

    const handleDisableRoom = (roomId) => {
        disableRoom(roomId).then(response => {
            toast.success(response.message)
            fetchData();
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    };


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    if (!props.authenticated) {
        return <Navigate
            to={{
                pathname: "/login-rental",
                state: { from: location }
            }} />;
    }

    return (
        <>
            <div className="wrapper">
                <SidebarNav />


                <div className="main">
                    <Nav onLogout={onLogout} currentUser={currentUser} />

                    <br />
                    <div className="container-fluid p-0"></div>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Quản lý phòng trọ</h5>
                            <h6 className="card-subtitle text-muted"> Quản lý thật tốt các chức năng của phòng trọ.</h6>
                        </div>
                        <div className="card-body">

                            <div id="datatables-buttons_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer"><div className="row"><div className="col-sm-12 col-md-6"><div className="dt-buttons btn-group flex-wrap">
                                <button className="btn btn-secondary buttons-copy buttons-html5" tabindex="0" aria-controls="datatables-buttons" type="button"><a onClick={handleRedirectAddRoom}>Thêm Phòng</a></button>
                            </div></div>
                                <div className="col-sm-12 col-md-6"><div id="datatables-buttons_filter" className="dataTables_filter">
                                    <label>Search:<input type="search" className="form-control form-control-sm" placeholder=""
                                        aria-controls="datatables-buttons"
                                        value={searchQuery}
                                        onChange={handleSearch} /></label>
                                </div></div></div><div className="row dt-row"><div className="table-responsive col-sm-12"><table id="datatables-buttons" className="table table-striped dataTable no-footer dtr-inline" style={{ width: "100%" }} aria-describedby="datatables-buttons_info">
                                    <thead>
                                        <tr>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Tên Phòng</th>
                                            <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "266px" }} >Địa Chỉ</th>
                                            <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "75px" }} >Giá</th>
                                            <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "142px" }} >Trạng Thái</th>
                                            <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "90px" }} >Ẩn\Hiện</th>
                                            <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "90px" }} >Duyệt</th>
                                            <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "134px" }} >Chế độ</th></tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((item) => (
                                            <tr className="odd">
                                                <td className="dtr-control sorting_1" tabindex="0">{item.title}</td>
                                                <td>{item.location.address + ' ' + item.location.ward}</td>
                                                <td>{item.price && item.price.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}</td>
                                                <td style={{ color: "green" }}>{item.contracts.find(contract => contract.status === 'RENT') ? "Đã thuê" : "Chưa thuê"}</td>
                                                <td style={{ color: "green" }}>{item.isLocked === "ENABLE" ? "Hiện" : "Ẩn"}</td>
                                                <td style={{ color: "green" }}>{item.isApprove === false ? "Chưa duyệt" : "Đã duyệt"}</td>

                                                <td>
                                                    {
                                                        item.isRemove === true ?
                                                            (
                                                                <>
                                                                    <span style={{ color: "red" }} data-toggle="tooltip" data-placement="bottom" title="Chi tiết thông tin gỡ ở email của bạn.">Admin gỡ tin</span>
                                                                </>
                                                            )
                                                            :
                                                            (
                                                                <>
                                                                    <a href="#" onClick={() => handleEditRoom(item.id)} data-toggle="tooltip" data-placement="bottom" title="Sửa"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>
                                                                    &nbsp;&nbsp;

                                                                    &nbsp;
                                                                    <a onClick={() => handleSetRoomId(item.id)} data-bs-toggle="modal" data-bs-target=".bd-example-modal-lg" data-toggle="tooltip" data-placement="bottom" title="Xem chi tiết" >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg> </a>
                                                                    &nbsp;&nbsp;
                                                                    <a href="#" onClick={() => handleDisableRoom(item.id)} data-toggle="tooltip" data-placement="bottom" title="Ẩn phòng"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>

                                                                </>
                                                            )
                                                    }

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
            </div >
        </>
    )
}

export default RoomManagement;