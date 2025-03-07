import React, { useEffect, useState } from 'react';
import SidebarNav from './SidebarNav';
import Nav from './Nav';
import { changeStatusOfRequest, deleteMaintenance, getAllMaintenceOfRentaler, getAllRequireOfRentaler } from '../../services/fetch/ApiUtils';
import Pagination from './Pagnation';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import ModalElement from '../../common/ModalElement';
import AddMaintence from './AddMaintence';
import MaintenceManagement from './MaintenceManagement';
import { Button, Modal } from 'react-bootstrap';
import EditMaintenance from './EditMaintence';

function RequierManagement(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const [showCreateMaintenance, setShowCreateMaintenance] = useState(false)
    const [showTableMaintenance, setShowTableMaintenance] = useState(false)
    const [showEditMaintenance, setShowEditMaintenance] = useState(false)
    const [maintenanceDate, setMaintenanceData] = useState()
    const history = useNavigate();
    const [request, setRequest] = useState()
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
        getAllRequireOfRentaler(currentPage, itemsPerPage, searchQuery).then(response => {
            setTableData(response.content);
            setTotalItems(response.totalElements);
            console.log(response.content);

        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleExportBill = (id) => {
        history('/rentaler/export-bill/' + id)
    }



    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleChangeStatus = (id) => {
        changeStatusOfRequest(id).then(response => {
            console.log(response.message)
            toast.success("Yêu cầu đã được xử lý")
            fetchData();
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    if (!props.authenticated) {
        return <Navigate
            to={{
                pathname: "/login-rental",
                state: { from: location }
            }} />;
    }
    const handleAddMaintenanceClick = (item) => {
        setShowCreateMaintenance(true)
        setRequest(item)
    }
    const handleRequestDetailClick = (item) => {
        setShowTableMaintenance(true)
        setRequest(item)
    }
    const handleCancelEditClick = () => {
        setShowTableMaintenance(true)
        setMaintenanceData(undefined)
        setShowEditMaintenance(false)
    }
    const handleEditClick = (item) => {
        setShowEditMaintenance(true)
        setShowTableMaintenance(false)
        setMaintenanceData(item)
    }
    return (
        <div className="wrapper">
            <SidebarNav />


            <div className="main">
                <Nav onLogout={onLogout} currentUser={currentUser} />

                <br />
                <div className="container-fluid p-0"></div>
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">Quản lý yêu cầu của người thuê</h5>
                        <h6 className="card-subtitle text-muted"> Quản lý các yêu cầu người thuê của phòng trọ.</h6>
                    </div>
                    <div className="card-body">
                        <div id="datatables-buttons_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer"><div className="row"><div className="col-sm-12 col-md-6"><div className="dt-buttons btn-group flex-wrap">
                        </div></div>
                            <div className="col-sm-12 col-md-6"><div id="datatables-buttons_filter" className="dataTables_filter">
                                <label>Search:<input type="search" className="form-control form-control-sm" placeholder=""
                                    aria-controls="datatables-buttons"
                                    value={searchQuery}
                                    onChange={handleSearch} /></label>
                            </div></div></div><div className="row dt-row"><div className="table-responsive col-sm-12"><table id="datatables-buttons" className="table table-striped dataTable no-footer dtr-inline" style={{ width: "100%" }} aria-describedby="datatables-buttons_info">
                                <thead>
                                    <tr>
                                        <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Tên hợp đồng</th>
                                        <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "180px" }} >Tên Người Thuê</th>
                                        <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "166px" }} >Số điện thoại</th>
                                        <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "130px" }} >Mô tả yêu cầu</th>
                                        <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "142px" }} >Trạng thái</th>
                                        <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "142px", textAlign: "center" }} >Bảo trì</th>
                                        <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "100px", textAlign: "center" }} >Hành động</th></tr>
                                </thead>
                                <tbody>
                                    {tableData?.map((item) => (
                                        <tr className="odd" key={item.id}>
                                            <td className="dtr-control sorting_1" tabindex="0">{item?.contract?.name}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.phoneNumber}</td>
                                            <td>
                                                {item?.description}
                                            </td>
                                            <td >
                                                <button type="button" class="btn btn-outline-success" onClick={() => handleChangeStatus(item.id)}>
                                                    {item?.answer === true ? "Đã xử lý" : "Chưa xử lý"}
                                                </button>
                                            </td>
                                            <td style={{ textAlign: "center" }}>
                                                <button className='btn btn-success' onClick={() => handleAddMaintenanceClick(item)} >
                                                    Thêm bảo trì
                                                </button>
                                            </td>
                                            <td style={{ display: "flex", justifyContent: "space-between" }}>
                                                <button className='btn btn-primary text-light' onClick={() => handleRequestDetailClick(item)}>
                                                    Xem
                                                </button>
                                                <button className='btn' onClick={() => handleExportBill(item.id)}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        height="1em"
                                                        viewBox="0 0 384 512"
                                                    >
                                                        <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 96H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm0 32v64H288V256H96zM240 416h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                                                    </svg>
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
                </div>
            </div>
            <ModalElement show={showCreateMaintenance} handleClose={() => setShowCreateMaintenance(false)}>
                <AddMaintence requestProps={request} />
            </ModalElement>
            <Modal show={showTableMaintenance} size='lg' onHide={() => setShowTableMaintenance(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Yêu cầu {request?.description} </Modal.Title>
                </Modal.Header>
                <MaintenceManagement requestProps={request} handleAddClick={() => { setShowCreateMaintenance(true); setShowTableMaintenance(false) }} handleEditClick={handleEditClick} />
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowTableMaintenance(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEditMaintenance} size='lg' onHide={handleCancelEditClick}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa bảo trì </Modal.Title>
                </Modal.Header>
                <EditMaintenance maintenanceProps={maintenanceDate} onSuccess={handleCancelEditClick} />
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelEditClick}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default RequierManagement;