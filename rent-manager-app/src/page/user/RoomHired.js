import React, { useEffect, useState } from 'react';
import { getAllRoomHired } from '../../services/fetch/ApiUtils';
import Pagination from './Pagnation';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import SendRequest from './SendRequest';
import RequestManagement from './RequestManagement';
import MaintenceManagement from '../rentaler/MaintenceManagement';

function RoomHired(props) {
    const { authenticated, currentUser, location, onLogout } = props;
    const history = useNavigate();
    const [showTableRequest, setShowTableRequest] = useState(false)
    const [showListMaintence, setShowListMaintence] = useState(false)
    const [contractItem, setContractItem] = useState()
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [showRequest, setShowRequest] = useState(false)
    const [totalItems, setTotalItems] = useState(0);
    const [contract, setContract] = useState()
    const [request, setRequest] = useState()
    // Fetch data from the API
    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = () => {
        getAllRoomHired(currentPage, itemsPerPage, currentUser?.id).then(response => {
            setTableData(response.content);
            setTotalItems(response.totalElements);
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    const handleSendRequest = (id) => {
        history('/send-request/' + id)
    }


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const calculateRemainingMonths = (deadlineContract) => {
        const currentDate = new Date();
        const contractDate = new Date(deadlineContract);

        const remainingMonths = (contractDate.getFullYear() - currentDate.getFullYear()) * 12 +
            (contractDate.getMonth() - currentDate.getMonth());

        return remainingMonths;
    }
    const handleCreateRequest = (contract) => {
        setShowRequest(true)
        setContract(contract)
        console.log(contract);

    }
    const handleDetailsClick = (item) => {
        setShowTableRequest(true)
        setContractItem(item)
    }
    if (!authenticated) {
        return <Navigate
            to={{
                pathname: "/login",
                state: { from: location }
            }} />;
    }
    const handleDetailsRequest = (item) => {
        setRequest(item)
        setShowTableRequest(false)
        setShowListMaintence(true)
    }

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Lịch sử thuê phòng</h5>
                <h6 className="card-subtitle text-muted"> Hiển thị lịch sử thuê phòng.</h6>
            </div>
            <div className="card-body">
                <div id="datatables-buttons_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                    <div className="row dt-row">
                        <div className="col-sm-12">
                            <table id="datatables-buttons" className="table table-striped dataTable no-footer dtr-inline" style={{ width: "100%" }} aria-describedby="datatables-buttons_info">
                                <thead>
                                    <tr>
                                        <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Tên Phòng</th>
                                        <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "180px" }} >Người cho thuê</th>
                                        <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "75px" }} >Giá</th>
                                        <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "200px" }} >Thời hạn hợp đồng</th>
                                        <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "142px" }} >Trạng Thái</th>
                                        <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "134px" }} >Chế độ</th>
                                        <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "134px" }} >Xem</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {tableData.map((item) => (
                                        <tr className="odd" key={"room-row-" + item.id}>
                                            <td><a href={`/rental-home/` + item.room.id} target='_blank'>{item.room.title}</a></td>
                                            <td>
                                                <Link className='btn btn-outline-success' to={`/profile/message?username=${item?.room?.user?.name || ''}`}>
                                                    {item.room.user.name}
                                                </Link>
                                            </td>
                                            <td>{item?.room?.price?.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}</td>
                                            <td> {item.startDate} Đến {item.endDate}</td>
                                            <td >{item.status === "RENT" ? (
                                                <span className="badge bg-success">Cho thuê</span>
                                            ) : item.status === "BOOKING" ? (
                                                <span className="badge bg-warning">Đặt trước</span>
                                            ) : item.status === "REQUEST" ? (
                                                <span className="badge bg-info">Yêu cầu</span>
                                            ) : item.status === "CHECKOUT" ? (
                                                <span className="badge bg-danger">Đã trả phòng</span>
                                            ) : (
                                                ""
                                            ) && ` |  ${item?.room.price.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}`}</td>
                                            <td>
                                                {
                                                    item.status === "CHECKOUT" || item.status === "REQUEST" ?
                                                        <span style={{ color: "red" }}>Vô hiệu hóa</span>
                                                        :
                                                        <button type="button" class="btn btn-outline-success" onClick={() => handleCreateRequest(item)}>
                                                            Gửi yêu cầu
                                                        </button>
                                                }

                                            </td>
                                            <td>
                                                <button onClick={() => handleDetailsClick(item)} className='btn btn-primary text-light'>
                                                    Xem
                                                </button>
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
            <Modal show={showRequest} size='lg' onHide={() => setShowRequest(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Danh Sách Yêu Cầu</Modal.Title>
                </Modal.Header>
                <SendRequest contractProps={contract} />
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRequest(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showTableRequest} size='lg' onHide={() => setShowTableRequest(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Danh Sách Yêu Cầu</Modal.Title>
                </Modal.Header>
                <RequestManagement handleDetailsRequest={handleDetailsRequest} contractProps={contractItem} />
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowTableRequest(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showListMaintence} size='lg' onHide={() => { setShowListMaintence(false); setShowTableRequest(true) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Danh sách bảo trì cuả yêu cầu {request?.description} của {request?.contract?.room?.title}</Modal.Title>
                </Modal.Header>
                <MaintenceManagement requestProps={request} />
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowTableRequest(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default RoomHired;