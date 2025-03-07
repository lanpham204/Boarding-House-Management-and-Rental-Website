import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import { checkoutRoom, getContract, getRequestById } from '../../services/fetch/ApiUtils';
import * as XLSX from 'xlsx';
import dayjs from "dayjs"

function ExportCheckoutRoom(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const { id } = useParams();
    const [errors, setErrors] = useState({});

    const [contractData, setContractData] = useState({
        nameBill: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setContractData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!contractData.nameBill) {
            newErrors.nameBill = 'Vui lòng nhập tên hóa đơn thuê phòng!';
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

    };

    useEffect(() => {
        getContract(id)
            .then(response => {
                console.log("contract", response);
                setContractData(response)
            })
            .catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });
    }, [id]);

    const handleExport = (id) => {
        if (!validateForm()) return;
        checkoutRoom(id)
            .then(response => {
                toast.success(response.message)
                exportToExcel(contractData);
            })
            .catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });
    };


    if (!authenticated) {
        return <Navigate
            to={{
                pathname: "/login-rental",
                state: { from: location }
            }} />;
    }
    return (
        <div className="wrapper">
            <SidebarNav />


            <div className="main">
                <Nav onLogout={onLogout} currentUser={currentUser} />

                <br />
                <div className="container-fluid p-0">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Xuất hóa đơn trả phòng</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="price">Tên Hóa Đơn</label>
                                    <input type="text" className={`form-control ${errors.nameBill ? 'is-invalid' : ''}`} id="price" name="nameBill" value={contractData.nameBill}
                                        onChange={handleInputChange}
                                    />
                                    {errors.nameBill && <div className="invalid-feedback">{errors.nameBill}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="price">Tên người thuê</label>
                                    <input type="text" className="form-control" id="price" name="nameUser" value={contractData.user && contractData.user.name}
                                        onChange={handleInputChange} disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="price">Tên Phòng</label>
                                    <input type="text" className="form-control" id="price" name="nameRoom" value={contractData.room && contractData.room.title}
                                        onChange={handleInputChange} disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="price">Giá Phòng</label>
                                    <input type="number" className="form-control" id="price" name="price" value={contractData.room && contractData.room.price}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="price">Thời Gian Điểm Bắt Đầu Thuê</label>
                                    <input className="form-control" id="price" name="createAt" value={contractData.startDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="price">Thời Hạn</label>
                                    <input className="form-control" id="price" name="deadlineContract" value={contractData.endDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button type="submit" onClick={() => handleExport(id)} className="btn btn-primary">Xuất hóa đơn</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}



function exportToExcel(contractData) {
    // Create an empty workbook
    const workbook = XLSX.utils.book_new();

    const formattedPrice = contractData.priceRequest ? formatCurrency(contractData.priceRequest) : '';

    const deadlineYear = parseInt(new Date(contractData.endDate).getFullYear());
    const currentYear = parseInt(new Date().getFullYear());

    const deadlineMonth = parseInt(new Date(contractData.deadlineContract).getMonth());
    const currentMonth = parseInt(new Date().getMonth());

    const pricePerMonth = parseFloat(contractData.room.price);
    const priceRequest = parseFloat(contractData.priceRequest);
const startDate = dayjs(contractData.startDate);
const endDate = dayjs(contractData.endDate);
    const result =endDate.diff(startDate, 'month') * pricePerMonth
    // Add a worksheet to the workbook
    const worksheet = XLSX.utils.aoa_to_sheet([
        ['Tên Hóa Đơn', "Người Thuê", "Tên Phòng", "Giá Phòng", 'Thời Gian Bắt Đầu', 'Thời Gian Kết Thúc', 'Tổng Tiền'],
        [contractData.nameBill, contractData.user.name ,contractData.room.title, contractData.room.price, contractData.startDate, contractData.endDate, result],
    ]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    function formatCurrency(value) {
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    }

    // Generate the Excel file data
    const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

    // Create a Blob from the Excel file data
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a download link and trigger the download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hoa_don.xlsx';
    a.click();

    // Cleanup
    URL.revokeObjectURL(url);
}

export default ExportCheckoutRoom;