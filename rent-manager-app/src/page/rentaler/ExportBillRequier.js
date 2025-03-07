import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import { getRequestById, getTotalMaintenceByRequestId } from '../../services/fetch/ApiUtils';
import * as XLSX from 'xlsx';


function ExportBillRequier(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const { id } = useParams();
    const [errors, setErrors] = useState({});

    const [contractData, setContractData] = useState({
        nameBill: '',
        description: '',
        price: 0,
        nameOfRent: '',
        nameRoom: ''
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
            newErrors.nameBill = 'Vui lòng nhập tên hóa đơn bảo trì!';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        toast.success("Xuất hóa đơn thành công!!")
        setContractData({
            nameBill: "",
            price: "",

        });
    };

    useEffect(() => {
        getRequestById(id)
            .then(response => {
                const description = response.description;
                const nameOfRent = response.name;
                const nameRoom = response.contract.room.title
                setContractData({
                    description,
                    nameOfRent,
                    nameRoom
                });
            })
            .catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });
        getTotalMaintenceByRequestId(id)
            .then(response => {
                setContractData({
                    ...contractData, price: response
                })
            })
            .catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });
    }, []);

    const handleExport = () => {
        if (!validateForm()) return;
        exportToExcel(contractData, id);
    };


    if (!authenticated) {
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
                    <div className="container-fluid p-0">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Xuất hóa đơn</h5>
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
                                        <label className="form-label" htmlFor="price">Mô tả</label>
                                        <input disabled type="text" className="form-control" id="price" name="description" value={contractData.description}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="price">Chi Phí</label>
                                        <input disabled type="number" className="form-control" id="price" name="price" value={contractData.price}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="price">Tên Phòng</label>
                                        <input disabled type="text" className="form-control" id="price" name="nameRoom" value={contractData.nameRoom}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="price">Người thuê</label>
                                        <input disabled type="text" className="form-control" id="price" name="nameOfRent" value={contractData.nameOfRent}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button type="submit" onClick={handleExport} className="btn btn-primary">Xuất hóa đơn</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </div >

        </>
    )
}



function exportToExcel(contractData, id) {
    getTotalMaintenceByRequestId(id)
        .then(response => {
            const workbook = XLSX.utils.book_new();

            const formattedPrice = formatCurrency(response);

            // Add a worksheet to the workbook
            const worksheet = XLSX.utils.aoa_to_sheet([
                ['Tên Hóa Đơn', 'Mô tả', 'Chi Phí', 'Tên Người Thuê', 'Tên Phòng'],
                [contractData.nameBill, contractData.description, formattedPrice, contractData.nameOfRent, contractData.nameRoom],
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
        })
        .catch(error => {
            toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
        });

}



export default ExportBillRequier;