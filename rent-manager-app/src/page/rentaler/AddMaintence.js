import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FirebaseUtil } from '../../utils/FirebaseUtil';
import MaintenanceService from '../../services/axios/MaintenanceService';

function AddMaintence(props) {
    const { requestProps } = props;
    const [errors, setErrors] = useState({});

    const [contractData, setContractData] = useState({
        maintenanceDate: '', // This will be set to the current date and time
        requestId: requestProps.id,
        price: '',
        files: undefined
    });

    // Set default date and time when the component mounts
    useEffect(() => {
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:MM"
        setContractData(prevState => ({
            ...prevState,
            maintenanceDate: formattedDate
        }));
    }, []);

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
            files: event.target.files[0]
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!contractData.maintenanceDate) {
            newErrors.maintenanceDate = 'Vui lòng nhập thời gian bảo trì!';
        }
        if (!contractData.price) {
            newErrors.price = 'Vui lòng nhập chi phí bảo trì!';
        } else if (Number(contractData.price) <= 0) {
            newErrors.price = 'Chi phí phải lớn hơn 0!';
        }
        if (!contractData.files) {
            newErrors.files = 'Vui lòng tải lên file!';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        const formData = new FormData();
        formData.append('maintenanceDate', contractData.maintenanceDate);
        formData.append('requestId', contractData.requestId);
        formData.append('price', contractData.price);
        if (contractData.files) {
            const fileUrl = await FirebaseUtil.uploadFile("maintenance", contractData.files);
            formData.append('file', fileUrl);
        }

        MaintenanceService.addNewMaintenance(formData)
            .then(response => {
                toast.success(response.message);
                toast.success("Phiếu bảo trì lưu thành công!!");
            })
            .catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });

        // Reset form data after submission
        setContractData({
            maintenanceDate: '',
            roomId: '',
            price: '',
            file: undefined
        });
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Thiết lập phiếu bảo trì</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="price">Chi Phí Bảo Trì</label>
                        <input type="number" className={`form-control ${errors.price ? 'is-invalid' : ''}`} id="price" name="price"
                            onChange={handleInputChange}
                        />
                        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="maintenanceDate">Thời Gian</label>
                        <input type="datetime-local" className={`form-control ${errors.maintenanceDate ? 'is-invalid' : ''}`} id="maintenanceDate" name="maintenanceDate"
                            value={contractData.maintenanceDate} // Set the default value here
                            onChange={handleInputChange}
                        />
                        {errors.maintenanceDate && <div className="invalid-feedback">{errors.maintenanceDate}</div>}
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label className="form-label">Tải Phiếu Bảo Trì</label>
                            <input className={`form-control ${errors.files ? 'is-invalid' : ''}`} type="file" accept=".pdf" name="files" onChange={handleFileChange} />
                            {errors.files && <div className="invalid-feedback">{errors.files}</div>}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddMaintence;
