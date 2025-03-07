import React, { useEffect, useState } from "react";
import SidebarNav from "./SidebarNav";
import Nav from "./Nav";
import { getAllContractOfRentaler } from "../../services/fetch/ApiUtils";
import Pagination from "./Pagnation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Modal, Tabs, Typography } from "antd";
import ContractService from "../../services/axios/ContractService";

const { Text } = Typography;

function ContractManagement(props) {
  const { authenticated, role, currentUser, location, onLogout } = props;
  const history = useNavigate();

  const [tableData1, setTableData1] = useState([]); // For first table
  const [tableData2, setTableData2] = useState([]); // For second table
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems1, setTotalItems1] = useState(0);
  const [totalItems2, setTotalItems2] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contractIdToDelete, setContractIdToDelete] = useState(null);
  // Fetch data from the API for both tables
  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery]);

  const fetchData = () => {
    // Fetch data for the first table
    getAllContractOfRentaler(currentPage, itemsPerPage, searchQuery, 'REQUEST')
      .then((response) => {
        setTableData1(response.content);
        setTotalItems1(response.totalElements);
        console.log(response);

      })
      .catch((error) => {
        toast.error(
          (error && error.message) ||
          "Oops! Có điều gì đó xảy ra. Vui lòng thử lại!"
        );
      });

    // Fetch data for the second table
    getAllContractOfRentaler(currentPage, itemsPerPage, searchQuery, 'REQUEST', true)
      .then((response) => {
        setTableData2(response.content);
        setTotalItems2(response.totalElements);
      })
      .catch((error) => {
        toast.error(
          (error && error.message) ||
          "Oops! Có điều gì đó xảy ra. Vui lòng thử lại!"
        );
      });
  };
  const deleteContract = (id) => {
    ContractService.deleteContract(id)
      .then((response) => {
        toast.success("Hợp đồng đã được xóa thành công!");
        fetchData();
      })
      .catch((error) => {
        toast.error("Lỗi kết nối với server.");
      });
  };
  const showDeleteModal = (id) => {
    setContractIdToDelete(id);
    setIsModalVisible(true);
  };

  const handleDeleteOk = () => {
    deleteContract(contractIdToDelete);
    setIsModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteContract = (id) => {
    showDeleteModal(id);
  };
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRedirectAddRoom = () => {
    history("/rentaler/add-contract");
  };

  const handleEditContract = (id, x) => {
    history("/rentaler/edit-contract/" + id + "?tab=" + x);
  };

  const handleExportBill = (id) => {
    history("/rentaler/export-contract/" + id);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="wrapper">
      <SidebarNav />
      <div className="main">
        <Nav onLogout={onLogout} currentUser={currentUser} />

        <br />
        <div className="container-fluid p-0"></div>
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Quản lý hợp đồng</h5>
            <h6 className="card-subtitle text-muted">
              Quản lý hợp đồng của những người thuê trọ.
            </h6>
          </div>
          <div className="card-body">
            <div className="dataTables_wrapper dt-bootstrap5 no-footer">
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="dt-buttons btn-group flex-wrap">
                    <button
                      className="btn btn-secondary buttons-copy buttons-html5"
                      type="button"
                    >
                      <a onClick={handleRedirectAddRoom}>Thêm Hợp Đồng</a>
                    </button>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="dataTables_filter">
                    <label>
                      Search:
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder=""
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <Tabs defaultActiveKey="1" type="card">
                <Tabs.TabPane tab="Yêu cầu hợp đồng" key="1">
                  <div className="table-responsive">
                    <table className="table table-striped dataTable no-footer dtr-inline">
                      <thead>
                        <tr>
                          <th>Tên Hợp Đồng</th>
                          <th>Tên Phòng</th>
                          <th>Tên người thuê</th>
                          <th>Số điện thoại</th>
                          <th>Hợp Đồng</th>
                          <th>Thời gian bắt đầu</th>
                          <th>Thời gian kết thúc</th>
                          <th>Trạng thái</th>
                          <th>Chế độ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData1.map((item) => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.room.title}</td>
                            <td>{item.user.name}</td>
                            <td>{item.user.phone}</td>
                            <td>
                              <a
                                href={item.file ?? ""}
                                className="btn btn-outline-success"
                                target="_blank"
                              >
                                {item.file ? 'Xem' : 'Chưa có'}
                              </a>
                            </td>
                            <td>{item.startDate}</td>
                            <td>{item.endDate}</td>
                            <td>
                              {item?.status === "ROOM_RENT" ? (
                                <span className="badge bg-success">Cho thuê</span>
                              ) : item?.status === "RESERVATION" ? (
                                <span className="badge bg-warning">Đặt trước</span>
                              ) : item?.status === "REQUEST" ? (
                                <span className="badge bg-info">Yêu cầu</span>
                              ) : item?.status === "CHECKOUT" ? (
                                <span className="badge bg-danger">Đã trả phòng</span>
                              ) : (
                                ""
                              )}
                            </td>
                            <td>
                              <a onClick={() => handleEditContract(item.id, "Y")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle mr-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                              </a>
                              <a href="#" onClick={() => handleDeleteContract(item.id)} data-toggle="tooltip" data-placement="bottom" title="Ẩn phòng"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>

                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems1}
                    currentPage={currentPage}
                    paginate={paginate}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Hợp đồng" key="2">
                  <div className="table-responsive">
                    <table className="table table-striped dataTable no-footer dtr-inline">
                      <thead>
                        <tr>
                          <th>Tên Hợp Đồng</th>
                          <th>Tên Phòng</th>
                          <th>Tên người thuê</th>
                          <th>Số điện thoại</th>
                          <th>Hợp Đồng</th>
                          <th>Thời gian bắt đầu</th>
                          <th>Thời gian kết thúc</th>
                          <th>Trạng thái</th>
                          <th>Chế độ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData2.map((item) => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.room.title}</td>
                            <td>{item.user.name}</td>
                            <td>{item.user.phone}</td>
                            <td>
                              <a
                                className="btn btn-outline-success"
                                href={
                                  item?.file
                                    ? item?.file
                                    : ""
                                }
                                target="_blank"
                              >
                                {item?.file ? 'Xem' : 'Chưa có'}
                              </a>
                            </td>
                            <td>{item.startDate}</td>
                            <td>{item.endDate}</td>
                            <td>
                              {item.status === "RENT" ? (
                                <span className="badge bg-success">Cho thuê</span>
                              ) : item.status === "BOOKING" ? (
                                <span className="badge bg-warning">Đặt trước</span>
                              ) : item.status === "REQUEST" ? (
                                <span className="badge bg-info">Yêu cầu</span>
                              ) : item.status === "CHECKOUT" ? (
                                <span className="badge bg-danger">Đã trả phòng</span>
                              ) : (
                                ""
                              )}
                            </td>
                            <td>
                              <a className={item.status == "CHECKOUT" ? "d-none" : ""} onClick={() => handleEditContract(item.id, "H")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                              </a>
                              <a onClick={() => handleExportBill(item.id)}>
                                <svg height="1em" viewBox="0 0 384 512">
                                  <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 96H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm0 32v64H288V256H96zM240 416h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                                </svg>
                              </a>

                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems2}
                    currentPage={currentPage}
                    paginate={paginate}
                  />
                </Tabs.TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Xóa hợp đồng"
        visible={isModalVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa hợp đồng này?</p>
      </Modal>
    </div>
  );
}

export default ContractManagement;
