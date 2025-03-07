
import 'swiper/css';
import 'swiper/css/navigation';
import { toast } from 'react-toastify';
import 'semantic-ui-css/semantic.min.css'
import ContractService from '../../../services/axios/ContractService';
import { Button, DatePicker, Form, Input, InputNumber, message } from 'antd';

import dayjs from "dayjs"
import { useEffect, useState } from 'react';
const ModalAddContract = ({ props, onClose, room, contract }) => {
    const [form] = Form.useForm()
    const dateFormat = "YYYY-MM-DD"
    const [date, setDate] = useState();
    const [errorMessage, setErrorMessage] = useState()
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (contract?.endDate) {
            const dateAdd = dayjs(contract.endDate, dateFormat).add(1, "day");
            form.setFieldValue("startDate", dateAdd)
            setDate(dateAdd)
        }
    }, [contract])
    const onFinish = (value) => {
        console.log(value);
        const formData = new FormData();
        formData.append('roomId', room.id);
        formData.append('numberOfRent', value.numberOfRent);
        formData.append('numberOfMonth', value.numberOfMonth);
        formData.append('startDate', dayjs(value.startDate).format("YYYY-MM-DD"));
        formData.append("status", "REQUEST")
        ContractService.requestContract(formData)
            .then(response => {
                console.log(response);
                onClose();
                setErrorMessage(undefined)
                form.resetFields()
                toast.success("Yêu cầu tạo hợp đồng thành công!!")
            })
            .catch(error => {
                console.log("error", error);
                setErrorMessage(error?.response?.data?.message)
                // toast.error((error?.response?.data?.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });
    }
    const handleDateChange = (e) => {

        if (e && date) {

            if (e.isBefore(date)) {
                messageApi.open({
                    type: "error",
                    content: "Ngày bắt đầu thuê không hợp lên ban nên bắt đầu sau ngày " + date.format("DD/MM/YYYY")
                })
                form.setFieldValue("startDate", date)
            }
        }
        console.log(e);
        console.log(date);

    }
    return (
        <div className="wrapper">
            <div className="main-2">
                <br />
                {contextHolder}
                <div className="container-fluid p-0">
                    <div className="card">
                        <div className="card-body">
                            <h6 className='text-danger'>{errorMessage}</h6>
                            <Form form={form} initialValues={{ startDate: date }} onFinish={onFinish}>
                                <div className='row'>
                                    <Form.Item className='col-6' label={"Số người thuê"} name={"numberOfRent"} rules={[{ required: true }, { type: "number" }]}>
                                        <InputNumber className='w-100' />
                                    </Form.Item>
                                    <Form.Item className='col-6' label={"Ngày bắt đầu thuê"} name={"startDate"} rules={[{ required: true }]}>
                                        <DatePicker format={"DD/MM/YYYY"} onChange={(e) => handleDateChange(e)} />
                                    </Form.Item>
                                    <Form.Item className='col-6' label={"Số tháng thuê"} name={"numberOfMonth"} rules={[{ required: true }, { type: "number" }]}>
                                        <InputNumber className='w-100' />
                                    </Form.Item>
                                    <Form.Item className='col-6 '>
                                        <div className='d-flex justify-content-between'>
                                            <Button htmlType='submit' type='primary'>Thuê</Button>
                                            <Button htmlType='reset'>Làm mới</Button>
                                        </div>
                                    </Form.Item>
                                </div>
                            </Form>
                            {/* <form onSubmit={handleSubmit}> */}
                            {/* <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="title">Tên hợp đồng</label>
                                        <input type="text" className="form-control" disabled={true} id="title" name="name" value={contractData.name} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="description">Số điện thoại người thuê</label>
                                        <input type="text" disabled={true} className={`form-control`} id="description" name="phone" value={contractData.phone} onChange={handleInputChange} />
                                    </div>
                                </div> */}
                            {/* <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="title">Số lượng người</label>
                                        <input type="text" className={`form-control ${errors.numOfPeople ? "is-invalid" : ""}`} id="title" name="numOfPeople" value={contractData.numOfPeople} onChange={handleInputChange} />
                                        {errors.numOfPeople && <div className="invalid-feedback">{errors.numOfPeople}</div>}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="description">Tên người thuê</label>
                                        <input type="text" className="form-control" id="description" disabled={true} name="nameRentHome" value={contractData.nameRentHome} onChange={handleInputChange} />
                                    </div>
                                </div> */}

                            {/* <div className="mb-3">
                                    <label className="form-label" htmlFor="price">Ngày bắt đầu</label>
                                    <input type="date" className={`form-control ${errors.createdAt ? "is-invalid" : ""}`} id="price" name="createdAt"
                                        onChange={handleInputChange}
                                    />
                                    {errors.createdAt && <div className="invalid-feedback">{errors.createdAt}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="month">Số tháng thuê</label>
                                    <input type="number" className={`form-control ${errors.? "is-invalid" : ""}`} value={contractData.numberOfMonth} onChange={handleInputChange} id="month" name="numberOfMonth" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button> */}
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}


export default ModalAddContract;