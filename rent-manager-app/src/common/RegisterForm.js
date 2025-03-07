import { Button, Form, Input } from "antd"

const RegisterForm = ({ register }) => {
    const onFinish = (values) => {
        register(values)
    };
    return (
        <Form onFinish={onFinish} layout='vertical'>
            <Form.Item label="Email" name={"email"} rules={[{ type: "email",message:"Vui lòng nhập đúng định dạng email" }, { required: true, message: "Vui lòng nhập email" }]}>
                <Input placeholder='email' />
            </Form.Item>
            <Form.Item label="Số điện thoại" name={"phone"} rules={[{ required: true, message:"Vui lòng nhập số điện thoại" }]}>
                <Input placeholder='Số điện thoại' />
            </Form.Item>
            <Form.Item label="Họ và tên" name={"name"} rules={[{ required: true, message:"Vui lòng nhập họ và tên" }]}>
                <Input placeholder='Họ và tên' />
            </Form.Item>
            <Form.Item label="Địa chỉ" name={"address"} rules={[{ required: true, message:"Vui lòng nhập địa chỉ" }]}>
                <Input placeholder='Địa chỉ' />
            </Form.Item>
            <Form.Item label="Mật khẩu" name={"password"} rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}>
                <Input.Password placeholder='Mật khẩu' />
            </Form.Item>
            <Form.Item label="Nhập lại mật khẩu" name={"confirmPassword"} rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu' }, ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp'));
                },
            }),]}>
                <Input.Password placeholder='Vui lòng nhập mật khẩu' />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Đăng ký
                </Button>
            </Form.Item>
        </Form >
    )
}

export default RegisterForm