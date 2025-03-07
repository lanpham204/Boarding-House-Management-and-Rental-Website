import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';

const LoginForm = ({ login }) => {
    const onFinish = (values) => {
        login(values)
    };
    return (
        <Form onFinish={onFinish} layout='vertical'>
            <Form.Item label="Email" name={"email"} rules={[{ type: "email", message: "Vui lòng nhập đúng dịnh dạng email" }, { required: true, message: "Vui lòng nhập email" }]}>
                <Input placeholder='email' />
            </Form.Item>
            <Form.Item label="Mật khẩu" name={"password"} rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}>
                <Input.Password placeholder='password' />
            </Form.Item>
            <Form.Item label={null} className='d-flex justify-content-end'>
                <Link to="/forgot-password" class="mt-5">Quên mật khẩu</Link>
            </Form.Item>
            <Form.Item label={null}>
                <div className="d-flex justify-content-center">
                    <Button type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </div>
            </Form.Item>
        </Form >
    )
}

export default LoginForm;