import React, { useEffect, useState } from 'react';
import SidebarNav from '../SidebarNav';
import Nav from '../Nav';
import Pagination from '../Pagnation';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { addCategory, updateCategory, deleteCategory, getAllCategoryOfAdmin } from '../../../services/fetch/ApiUtils';

function CategoryManagement(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const history = useNavigate();

    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [newCategory, setNewCategory] = useState(''); // Quản lý input danh mục mới
    const [selectedCategory, setSelectedCategory] = useState(null); // Quản lý danh mục được chọn
    const [editingCategory, setEditingCategory] = useState(null);

    // Fetch data from the API
    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = () => {
        getAllCategoryOfAdmin(currentPage, itemsPerPage).then(response => {
            setTableData(response.content);
            setTotalItems(response.totalElements);
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    };

    const handleAddCategory = () => {
        if (!newCategory.trim()) {
            toast.error("Tên danh mục không được để trống!");
            return;
        }
        const category = { name: newCategory };
        addCategory(category)
            .then(response => {
                toast.success("Thêm danh mục thành công!");
                setNewCategory('');
                fetchData();
            })
            .catch(error => {
                console.log(error);
                if (error.message.includes("Duplicate")) {
                    toast.error('Danh mục đã tồn tại');
                } else {
                    toast.error('Không thể thêm danh mục. Vui lòng thử lại!');
                }
            });
    };

    const handleUpdateCategory = () => {
        if (!newCategory.trim()) {
            toast.error("Tên danh mục không được để trống!");
            return;
        }
        updateCategory(editingCategory.id, { name: newCategory })
            .then(response => {
                toast.success("Cập nhật danh mục thành công!");
                setNewCategory('');
                setSelectedCategory(null);
                setEditingCategory(null);
                fetchData();
            })
            .catch(error => {
                if (error.message.includes("Duplicate")) {
                    toast.error('Danh mục đã tồn tại');
                } else {
                    toast.error('Không thể sửa danh mục. Vui lòng thử lại!');
                }

            });
    };

    const handleDeleteCategory = (id) => {
        deleteCategory(id)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Server trả về lỗi");
                }
            })
            .then(() => {
                toast.success("Xóa danh mục thành công!");
                fetchData(); // Refresh dữ liệu
            })
            .catch(error => {
                console.log(error);
                fetchData();
                if (error.status == 500) {
                    toast.error("Không thể xóa danh mục có phòng đang sử dụng");
                }
            });
    };


    return (
        <div className="main">
            <div className="container-fluid p-0">
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">Quản lý Danh mục</h5>
                    </div>
                    <div className="card-body">
                        <div style={{ marginBottom: "20px" }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập tên danh mục"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                style={{ marginBottom: "10px", borderRadius: "5px" }}
                            />
                            <button
                                style={{ marginRight: "5px" }}
                                type="button"
                                className="btn btn-success"
                                onClick={handleAddCategory}
                            >
                                Thêm
                            </button>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên danh mục</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {editingCategory && editingCategory.id === item.id ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={newCategory}
                                                    onChange={(e) => setNewCategory(e.target.value)}
                                                    style={{ borderRadius: "5px", marginBottom: "5px" }}
                                                />
                                            ) : (
                                                item.name
                                            )}
                                        </td>
                                        <td>
                                            {editingCategory && editingCategory.id === item.id ? (
                                                <>
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={handleUpdateCategory}
                                                        style={{ marginRight: "5px" }}
                                                    >
                                                        Lưu
                                                    </button>
                                                    <button
                                                        className="btn btn-secondary btn-sm"
                                                        onClick={() => setEditingCategory(null)} // Hủy chỉnh sửa
                                                    >
                                                        Hủy
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="btn btn-warning btn-sm"
                                                        onClick={() => {
                                                            setEditingCategory(item); // Bắt đầu chỉnh sửa
                                                            setNewCategory(item.name); // Gán giá trị hiện tại vào input
                                                        }}
                                                        style={{ marginRight: "5px" }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDeleteCategory(item.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={totalItems}
                            currentPage={currentPage}
                            paginate={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryManagement;
