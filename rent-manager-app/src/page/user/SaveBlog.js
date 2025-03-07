import React, { useEffect, useState } from 'react';
import { getAllBlogStore } from '../../services/fetch/ApiUtils';
import Pagination from './Pagnation';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import RoomCart from '../../element/RoomCart';
function SaveBlog(props) {
    const { authenticated, location } = props;

    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [totalItems, setTotalItems] = useState(0);

    // Fetch data from the API
    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = () => {
        getAllBlogStore(currentPage, itemsPerPage).then(response => {
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


    if (!authenticated) {
        return <Navigate
            to={{
                pathname: "/login",
                state: { from: location }
            }} />;
    }

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Lưu bài đăng</h5>
                <h6 className="card-subtitle text-muted"> Quản lý các bài đăng đã lưu.</h6>
            </div>
            <div className="card-body">
                <div className='row'>
                    {tableData.map(item => (
                        <RoomCart room={item.room} key={item.id} />
                    ))}
                </div>

            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    )
}

export default SaveBlog;