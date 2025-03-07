import React, { useEffect, useState } from 'react';
import { deleteMaintenance, getAllMaintenceOfRentaler } from '../../services/fetch/ApiUtils';
import Pagination from './Pagnation';
import { toast } from 'react-toastify';
function MaintenceManagement(props) {
    const { requestProps, handleEditClick, handleAddClick } = props

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
        getAllMaintenceOfRentaler(currentPage, itemsPerPage, requestProps.id).then(response => {
            setTableData(response.content);
            setTotalItems(response.totalElements);
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteMaintenance = (id) => {
        deleteMaintenance(id).then(response => {
            console.log(response.message)
            toast.success("Xóa phiếu bảo trì thành công")
            fetchData();
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Quản lý bảo trì</h5>
                <h6 className="card-subtitle text-muted"> Quản lý bảo trì của phòng trọ.</h6>
            </div>
            <div className="card-body">
                {handleAddClick &&
                    <div>
                        <button className='btn btn-secondary' onClick={handleAddClick}>Thêm bảo trì</button>
                    </div>
                }
                <div className="row dt-row">
                    <div className="table-responsive col-sm-12">
                        <table id="datatables-buttons" className="table table-striped dataTable no-footer dtr-inline" style={{ width: "100%" }} aria-describedby="datatables-buttons_info">
                            <thead>
                                <tr>
                                    <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Tên Phòng</th>
                                    <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "166px" }} >Phiếu bảo trì</th>
                                    <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "90px" }} >Chi phí</th>
                                    <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "142px" }} >Thời gian</th>
                                    {handleEditClick &&
                                        <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "75px" }} >Chế độ</th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((item) => (
                                    <tr className="odd" key={item.id}>
                                        <td className="dtr-control sorting_1" tabindex="0">{requestProps?.contract?.room?.title}</td>
                                        <td>
                                            <button type="button" class="btn btn-outline-success">
                                                <a href={item.files === null ? "" : `` + item.files.replace('photographer/files/', '')} target="_blank">Xem</a>
                                            </button>
                                        </td>
                                        <td>{item.price && item.price.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}</td>
                                        <td>{item.maintenanceDate && new Date(item.maintenanceDate).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}</td>
                                        {
                                            handleEditClick &&
                                            <td>
                                                <button className='btn' onClick={() => handleEditClick(item)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></button>
                                                &nbsp;
                                                <button className='btn' onClick={() => handleDeleteMaintenance(item.id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                                            </td>
                                        }

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
    )
}

export default MaintenceManagement;