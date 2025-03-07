import React, { useEffect, useState } from 'react';
import { getAllRequireOfContract, getAllRequireOfCustomer } from '../../services/fetch/ApiUtils';
import Pagination from './Pagnation';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

function RequestManagement(props) {
    const { contractProps, handleDetailsRequest } = props;

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
        getAllRequireOfContract(currentPage, itemsPerPage, contractProps.id).then(response => {
            console.log(response);

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



    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Trạng thái yêu cầu lặp đặt</h5>
                <h6 className="card-subtitle text-muted"> Quản lý trạng thái của yêu cầu.</h6>
            </div>
            <div className="card-body">
                <div id="datatables-buttons_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <div className="dt-buttons btn-group flex-wrap">
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div id="datatables-buttons_filter" className="dataTables_filter">
                                <label>Search:<input type="search" className="form-control form-control-sm" placeholder=""
                                    aria-controls="datatables-buttons"
                                    value={searchQuery}
                                    onChange={handleSearch} /></label>
                            </div>
                        </div>
                    </div>
                    <div className="row dt-row">
                        <div className="col-sm-12">
                            <table className='w-100'>
                                <thead>
                                    <tr>
                                        <th  >Tên Phòng</th>
                                        <th  >Tên Người Thuê</th>
                                        <th  >Số điện thoại</th>
                                        <th  >Mô tả yêu cầu</th>
                                        <th  >Trạng thái</th>
                                        <th  >Xem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((item) => (
                                        <tr className="odd" key={item.id}>
                                            <td style={{ width: "150px" }} className='text-truncate d-inline-block'>{item?.contract?.room?.title}</td>
                                            <td>{item.name}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>
                                                {item.description}
                                            </td>
                                            <td className={item.answer === true ? "bg-success" : "bg-warning"}>
                                                {item.answer === true ? "Đã xử lý" : "Chưa xử lý"}
                                            </td>
                                            <td>
                                                <button className='btn btn-primary' onClick={() => handleDetailsRequest(item)}>
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
    )
}

export default RequestManagement;