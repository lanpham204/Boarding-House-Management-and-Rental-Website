import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { sendRequestForRentaler } from '../../services/fetch/ApiUtils';
import { Button, Form, Input } from 'antd';


function SendRequest(props) {
    const { contractProps } = props;
    const [form] = Form.useForm()
    useEffect(() => {
        console.log(contractProps);
        form.setFieldValue("nameOfRent", contractProps.user.name)
        form.setFieldValue("nameRoom", contractProps.room.title)
        form.setFieldValue("phone", contractProps.user.phone)
    }, [contractProps])
    const onFinish = (value) => {
        sendRequestForRentaler({ ...value, contractId: contractProps.id })
            .then(response => {
                toast.success(response.message)
                form.setFieldValue("description", "")
            })
            .catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });
    }

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Yêu cầu lắp đặt</h5>
            </div>
            <div className="card-body">
                <Form onFinish={onFinish} form={form} layout='vertical'>
                    <Form.Item label={"Mô tả yêu cầu"} rules={[{ required: true, message: "Vui lòng nhập mô tà yêu cầu" }]} name={"description"}>
                        <Input placeholder='Mô tả yêu cầu' />
                    </Form.Item>
                    <Form.Item label={"Tên phòng"} name={"nameRoom"} >
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item label={"Người thuê"} name={"nameOfRent"}>
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item label={"Số điện thoại"} name={"phone"} >
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit'>Gửi</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default SendRequest;