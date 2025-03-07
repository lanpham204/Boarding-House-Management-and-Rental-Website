import { Navigate } from 'react-router-dom';
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { findByPhoneNumber, getRentOfHome, getRoom } from '../../services/fetch/ApiUtils';
import ContractService from '../../services/axios/ContractService';
import { FirebaseUtil } from '../../utils/FirebaseUtil';
import { DatePicker } from 'antd';
import dayjs from "dayjs"

function AddContract(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const [errorMessage, setErrorMessage] = useState();
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(false)
    const [roomOptions, setRoomOptions] = useState([]);
    const [errors, setErrors] = useState({});
    const [errorFile, setErrorFile] = useState(false);
    const initContract = {
        name: '',
        roomId: '',
        numberOfRent: '',
        phone: '',
        nameRent: "",
        startDate: undefined,
        endDate: undefined,
        contractStatus: 'RENT',
        file: undefined
    }
    const [contractData, setContractData] = useState({ ...initContract });
    useEffect(() => {
        if (contractData?.phone !== "")
            findByPhoneNumber(contractData?.phone).then(data => {
                setContractData(prev => ({ ...prev, nameRent: data?.name }))
            }).catch(error =>
                setContractData(prev => ({ ...prev, nameRent: "" }))
            )
    }, [contractData.phone])
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setContractData(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const handleFileChange = (event) => {
        setContractData(prevState => ({
            ...prevState,
            file: event.target.files[0]
        }));
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!contractData.name.trim()) {
            formErrors.name = "Tên hợp đồng không được để trống";
            isValid = false;
        }

        if (!/^\d{10,11}$/.test(contractData.phone)) {
            formErrors.phone = "Số điện thoại không hợp lệ. Vui lòng nhập 10-11 số.";
            isValid = false;
        }

        if (!contractData.roomId) {
            formErrors.roomId = "Bạn phải chọn phòng";
            isValid = false;
        }

        if (!/^\d+$/.test(contractData.numberOfRent)) {
            formErrors.numberOfRent = "Số lượng người phải là số nguyên dương";
            isValid = false;
        }
        console.log(!contractData.startDate && !contractData.endDate);

        if (!contractData.startDate && !contractData.endDate) {
            formErrors.rangeDate = "Thời hạn hợp đồng không được để trống";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        if (!contractData.file) {
            setErrorFile(true);
            return;
        }

        if (!contractData.nameRent) {
            setErrorPhoneNumber(true);
            return;
        }

        setErrorPhoneNumber(false);
        const formData = new FormData();
        formData.append('name', contractData.name);
        formData.append('roomId', contractData.roomId);
        formData.append('numberOfRent', contractData.numberOfRent);
        formData.append('phone', contractData.phone);
        formData.append('startDate', contractData.startDate);
        formData.append('endDate', contractData.endDate)
        formData.append('contractStatus', contractData.contractStatus)
        if (contractData.file) {
            const fileUrl = await FirebaseUtil.uploadFile("contract", contractData.file)
            formData.append('file', fileUrl)
        }
        ContractService.createContract(formData)
            .then(response => {
                toast.success(response.data.message);
            })
            .then(data => {
                console.log(data);
                // Do something with the response data here
                setContractData({ ...initContract });
                setErrorMessage(undefined)
            })
            .catch(error => {
                toast.error(error?.response?.data?.message ?? 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
                setErrorMessage(error?.response?.data?.message)
            });

        console.log(contractData);
    };

    useEffect(() => {
        getRentOfHome()
            .then(response => {
                const room = response.content;
                setRoomOptions(room);
            })
            .catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });
    }, []);

    console.log("Add room", authenticated);
    if (!authenticated) {
        return <Navigate
            to={{
                pathname: "/login-rental",
                state: { from: location }
            }} />;
    }
    const formatDate = "YYYY-MM-DD"
    const handleRangeDateChange = (e) => {
        if (e) {
            setContractData({ ...contractData, startDate: dayjs(e[0]).format(formatDate), endDate: dayjs(e[1]).format(formatDate) })
        } else {
            setContractData({ ...contractData, startDate: undefined, endDate: undefined })
        }

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
                            <h5 className="card-title">Thiết lập hợp đồng</h5>
                        </div>
                        <div className="card-body">
                            <h6 className='text-danger'>{errorMessage}</h6>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="status"><strong>Trạng thái</strong></label>
                                    <select
                                        className="form-control"
                                        id="contractStatus"
                                        name="contractStatus"
                                        value={contractData.contractStatus}
                                        onChange={handleInputChange}
                                    >
                                        <option value={"REQUEST"}>Yêu cầu tạo hợp đồng</option>
                                        <option value={"RENT"}>Đã thuê</option>
                                        <option value={"BOOKING"}>Đặt trước</option>
                                        <option value={"CHECKOUT"}>Trả phòng</option>
                                    </select>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="title">Tên hợp đồng</label>
                                        <input type="text" className={`form-control ${errors.name ? "is-invalid" : ""}`} id="title" name="name" value={contractData.name} onChange={handleInputChange} />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="description">Số điện thoại người thuê</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.phone ? "is-invalid" : ""} ${errorPhoneNumber ? "border border-danger" : ""}`}
                                            id="description"
                                            name="phone"
                                            value={contractData.phone}
                                            onChange={handleInputChange}
                                        />
                                        {errorPhoneNumber && <div className='text-danger'>Số điện thoại người thuê không đúng</div>}
                                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="title">Số lượng người</label>
                                        <input type="text" className={`form-control ${errors.numberOfRent ? "is-invalid" : ""}`} id="title" name="numberOfRent" value={contractData.numberOfRent} onChange={handleInputChange} />
                                        {errors.numberOfRent && <div className="invalid-feedback">{errors.numberOfRent}</div>}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="description">Tên người thuê</label>
                                        <input type="text" className="form-control" id="description" disabled={true} name="nameRent" value={contractData.nameRent} />
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className="col-6">
                                        <label className="form-label" htmlFor="locationId">Chọn phòng</label>
                                        <select className={`form-select ${errors.roomId ? "is-invalid" : ""}`} id="locationId" name="roomId" value={contractData.roomId} onChange={handleInputChange}>
                                            <option value="">Chọn...</option>
                                            {roomOptions.map(roomOption => (
                                                <option key={roomOption.id} value={roomOption.id}>{roomOption.title}</option>
                                            ))}
                                        </select>
                                        {errors.roomId && <div className="invalid-feedback">{errors.roomId}</div>}
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label" htmlFor="date">Thời hạn hợp đồng</label> <br />
                                        <DatePicker.RangePicker format={"DD/MM/YYYY"} id="date" className='w-100'
                                            // value={contractData.startDate && contractData.endDate ? [dayjs(contractData.startDate, formatDate), dayjs(contractData.endDate, formatDate)] : undefined}
                                            onChange={handleRangeDateChange} />
                                        {/* <input type="datetime-local" className={`form-control ${errors.startDate? "is-invalid" : ""}`} id="price" name="startDate"
                                            onChange={handleInputChange}
                                        /> */}
                                        {errors.rangeDate && <div className="text-danger">{errors.rangeDate}</div>}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="mb-3">
                                        <label className="form-label">Tải File Hợp Đồng</label> <br />
                                        <h6>Tải mẫu hợp đồng để tạo hợp đồng với người thuê và đẩy lên lưu trữ trên hệ thống. Sau đó chuyển sang file .pdf để upload.<a href='https://image.luatvietnam.vn/uploaded/Others/2021/04/08/hop-dong-thue-nha-o_2810144434_2011152916_0804150405.doc'>Tải Mẫu</a></h6>

                                        <input className={`form-control ${errorFile ? "is-invalid" : ""}`} type="file" accept=".pdf" name="files" onChange={handleFileChange} />
                                        {errorFile && <div className="invalid-feedback">Vui lòng tải lên file hợp đồng!</div>}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default AddContract;