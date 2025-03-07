import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Nav from '../Nav';
import SidebarNav from '../SidebarNav';
import { approveRoomOfAdmin, getAllRoomApprovingOfAdmin, getNumberOfAdmin, removeRoomOfAdmin } from '../../../services/fetch/ApiUtils';
import Pagination from '../Pagnation';
import { toast } from 'react-toastify';
import ModalRoomDetails from '../modal/ModalRoomDetail';
import { Button, Modal } from 'react-bootstrap';

const DashboardAdmin = (props) => {
  const { authenticated, roleName, location, currentUser, onLogout } = props;

  const history = useNavigate();
  const [roomId, setRoomId] = useState(4);
  const [showModal, setShowModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [number, setNumber] = useState({
    numberOfAccount: '',
    numberOfApprove: '',
    numberOfApproving: '',
    numberOfAccountLocked: '',
  });

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    getAllRoomApprovingOfAdmin(currentPage, itemsPerPage, false).then(response => {
      setTableData(response.content);
      setTotalItems(response.totalElements);
    }).catch(
      error => {
        toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
      }
    )
  }

  const handleSetRoomId = (id) => {
    console.log(id);

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

  useEffect(() => {
    getNumberOfAdmin()
      .then(response => {
        const number = response;
        setNumber(prevState => ({
          ...prevState,
          ...number
        }));
      })
      .catch(error => {
        console.log(error)
      });

  }, []);

  if (!authenticated) {
    return <Navigate
      to={{
        pathname: "/login-admin",
        state: { from: location }
      }} />;
  }

  return (

    <main style={{ margin: "20px 20px 20px 20px" }}>
      <div className="container-fluid p-0">
        <div class="row mb-2 mb-xl-3">
          <div class="col-auto d-none d-sm-block">
            <h3><strong> &nbsp; &nbsp;✨</strong> Thông kê</h3>
          </div>
        </div>
        <section>
          <div className="row">
            <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between px-md-1">
                    <div>
                      <h3 className="text-danger">{number.numberOfAccount}</h3>
                      <p className="mb-0 text-dark">Tài khoản</p>
                    </div>
                    <div className="align-self-center">
                      <i className="fas fa-rocket text-danger fa-3x" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between px-md-1">
                    <div>
                      <h3 className="text-success">{number.numberOfApprove}</h3>
                      <p className="mb-0 text-dark">Tin duyệt</p>
                    </div>
                    <div className="align-self-center">
                      <i className="far fa-user text-success fa-3x" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between px-md-1">
                    <div>
                      <h3 className="text-warning">{number.numberOfApproving}</h3>
                      <p className="mb-0 text-dark">Tin chưa duyệt</p>
                    </div>
                    <div className="align-self-center">
                      <i className="fas fa-chart-pie text-warning fa-3x" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between px-md-1">
                    <div>
                      <h3 className="text-info">{number.numberOfRoom}</h3>
                      <p className="mb-0">Tổng tin</p>
                    </div>
                    <div className="align-self-center">
                      <i className="far fa-life-ring text-info fa-3x" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Bài đăng và phòng trọ chưa duyệt</h5>
            <h6 className="card-subtitle text-muted"> Quản lý thật tốt các chức năng của phòng trọ và bài đăng.</h6>
          </div>
          <div className="card-body">
            <div id="datatables-buttons_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer"><div className="row"><div className="col-sm-12 col-md-6"><div className="dt-buttons btn-group flex-wrap">
            </div></div>
              <div className="col-sm-12 col-md-6"><div id="datatables-buttons_filter" className="dataTables_filter">
              </div></div></div><div className="row dt-row"><div className="col-sm-12"><table id="datatables-buttons" className="table table-striped dataTable no-footer dtr-inline" style={{ width: "100%" }} aria-describedby="datatables-buttons_info">
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
                        <button onClick={() => handleSetRoomId(item.id)} className='btn' >
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
        </div>
        <Modal show={showModal} size='lg' onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa bảo trì </Modal.Title>
          </Modal.Header>
          <ModalRoomDetails roomId={roomId} />
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </main>
  )
}

export default DashboardAdmin;