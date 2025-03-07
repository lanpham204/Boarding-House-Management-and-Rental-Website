import { useState } from 'react';
import { toast } from 'react-toastify';
import MaintenanceService from '../../services/axios/MaintenanceService';
import { FirebaseUtil } from '../../utils/FirebaseUtil';


function EditMaintenance(props) {
    const { maintenanceProps, onSuccess } = props
    const [file, setFile] = useState()
    const [contractData, setContractData] = useState({ ...maintenanceProps });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setContractData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        setFile(event?.target?.files?.[0])
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('maintenanceDate', contractData.maintenanceDate);
        formData.append('price', contractData.price);
        if (file) {
            const fileUrl = await FirebaseUtil.uploadFile("maintenance", file)
            formData.append(`file`, fileUrl);
        }
        // console.log(typeof contractData.files);
        // if (typeof contractData.files !== "string" && contractData.files != undefined) {
        //     contractData.files && contractData.files.forEach((file, index) => {
        //         formData.append(`files`, file);
        //     });
        // }
        // console.log(formData.getAll)
        MaintenanceService.editMaintenanceInfo(contractData.id, formData)
            .then(response => {
                toast.success(response.message);
                onSuccess()
                setFile(undefined)
                toast.success("Cập nhật hợp đồng thành công!!")

            })
            .catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });

        console.log(contractData);
    };



    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Chỉnh sửa phiếu bảo trì</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="price">Chi Phí Bảo Trì</label>
                        <input type="number" className="form-control" id="price" name="price" value={contractData.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="price">Thời Gian</label>
                        <input type="datetime-local" className="form-control" id="price" name="maintenanceDate" value={contractData.maintenanceDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label className="form-label">Tải Phiếu Bảo Trì</label>
                            <input className="form-control" type="file" accept=".pdf" name="files" multiple onChange={handleFileChange} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default EditMaintenance;