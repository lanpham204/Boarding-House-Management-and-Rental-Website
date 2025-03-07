import { Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getContract, getRentOfHome, getRoom } from '../../services/fetch/ApiUtils';
import ContractService from '../../services/axios/ContractService';
import { logDOM } from '@testing-library/react';
import { FirebaseUtil } from '../../utils/FirebaseUtil';
import { Button, DatePicker, Form, Input, InputNumber, Radio } from 'antd';
import dayjs from "dayjs"

function EditContract(props) {
    const [errorMessage, setErrorMessage] = useState()
    const { id } = useParams();
    const [form] = Form.useForm()
    const dateFormat = "DD/MM/YYYY";
    const formatDate = "YYYY-MM-DD"
    const { authenticated, currentUser, location, onLogout } = props;
    const [file, setFile] = useState();
    const [contractData, setContractData] = useState();
    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    };
    const locationParam = useLocation();
    const queryParams = new URLSearchParams(locationParam.search);
    const tab = queryParams.get('tab');

    useEffect(() => {
        getContract(id)
            .then(response => {
                setContractData(response)
                form.setFieldsValue({ ...response, rangeDate: [dayjs(response.startDate, formatDate), dayjs(response.endDate, formatDate)] })
            })
            .catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });
    }, [id]);

    if (!authenticated) {
        return <Navigate
            to={{
                pathname: "/login-rental",
                state: { from: location }
            }} />;
    }
    const onFinish = async (value) => {
        console.log("onfinish", value);
        const formData = new FormData();
        formData.append('name', value.name);
        formData.append('numberOfRent', value.numberOfRent);
        formData.append('startDate', dayjs(value.rangeDate[0]).format('YYYY-MM-DD'));
        formData.append('endDate', dayjs(value.rangeDate[1]).format('YYYY-MM-DD'));
        formData.append('status', value.status)
        if (file) {
            const fileUrl = await FirebaseUtil.uploadFile("contract", file);
            formData.append('file', fileUrl);
        }
        try {
            const response = await ContractService.editContractInfo(id, formData)
            console.log("response", response);
            toast.success(response.data.message);
            setErrorMessage(undefined)
        } catch (error) {
            console.log(error);
            toast.error((error && error?.response?.data?.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            setErrorMessage(error?.response?.data?.message);
        }
    }
    const handleResetClick = () => {
        form.setFieldsValue({ ...contractData, startDate: dayjs(contractData.startDate, formatDate), endDate: dayjs(contractData.endDate, formatDate) })
        setFile(undefined);
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
                            <h5 className="card-title"></h5>
                        </div>
                        <div className="container">
                            <h6 className='text-danger'>{errorMessage}</h6>
                            <Form form={form} layout='vertical' onFinish={onFinish} className='row'>
                                <Form.Item className='col-12' label="Tên hợp đồng" name={"name"}>
                                    <Input />
                                </Form.Item>
                                <Form.Item className='col-6' label="Trạng thái" name={"status"} rules={[{ required: true }]}>
                                    <Radio.Group options={
                                        tab == "Y" ?
                                            [{ label: "Yêu cầu", value: "REQUEST" }, { label: "Thuê ngay", value: "RENT" }, { label: "Đặt trước", value: "BOOKING" }]
                                            :
                                            [{ label: "Yêu cầu", value: "REQUEST" }, { label: "Thuê ngay", value: "RENT" }, { label: "Đặt trước", value: "BOOKING" }, { label: "Trả phòng", value: "CHECKOUT" }]
                                    } />
                                </Form.Item>
                                <Form.Item className='col-6' label="Số lượng người" name={"numberOfRent"} rules={[{ required: true }, { type: "number" }]}>
                                    <InputNumber className='w-100' />
                                </Form.Item>
                                <Form.Item className='col-6' label="Thời hạn hợp đồng" name={"rangeDate"} rules={[{ required: true }]}>
                                    <DatePicker.RangePicker
                                        format={dateFormat}
                                    />
                                </Form.Item>
                                <Form.Item className='col-6' label="file hợp đồng">
                                    <Input type='file' onChange={e => handleFileChange(e)} />
                                </Form.Item>
                                <Form.Item className='col-6'>
                                    <div className='d-flex align-items-end justify-content-between'>
                                        <Button htmlType='submit' type='primary'>Cập nhập</Button>
                                        <Button onClick={() => handleResetClick()}>Làm mới</Button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default EditContract;