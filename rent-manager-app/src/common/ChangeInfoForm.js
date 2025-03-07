import { Button, Form, Input } from "antd";
import AuthService from "../../services/axios/AuthService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ChangeInfoForm = ({ loadCurrentUser, currentUser, setCloseModal }) => {
    const [imageFile, setImageFile] = useState(null);
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue(currentUser)
    }, [currentUser])
    const onFinish = (value) => {
        const { address, name, phone } = value;
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('address', address);
        formData.append('name', name);
        formData.append('phone', phone);
        AuthService.uploadProfile(formData).then(response => {
            toast.success(response.message);
            toast.success("Cập nhật thông tin cá nhân thành công.");
            setCloseModal();
            loadCurrentUser();
        }).catch(error => {
            console.log(error);

            toast.error((error && error.response.data.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
        });
    }
    const onFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Perform file validation
            const allowedTypes = ["image/jpeg", "image/png"];
            const maxFileSize = 1 * 1024 * 1024; // 1MB

            // Check file type
            if (!allowedTypes.includes(file.type)) {
                toast.error("Only JPEG and PNG images are allowed.");
                return;
            }

            // Check file size
            if (file.size > maxFileSize) {
                toast.error("File size exceeds the maximum limit of 1MB.");
                return;
            }

            setImageFile(file);
        }
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item label="Email" name={"email"} rules={[{ type: "email", message: "Vui lòng nhập đúng định dạng email" }, { required: true, message: "Vui lòng nhập email" }]}>
                <Input placeholder='email' readOnly />
            </Form.Item>
            <Form.Item label="Số điện thoại" name={"phone"} rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
                <Input placeholder='Số điện thoại' readOnly />
            </Form.Item>
            <Form.Item label="Họ và tên" name={"name"} rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}>
                <Input placeholder='Họ và tên' />
            </Form.Item>
            <Form.Item label="Địa chỉ" name={"address"} rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
                <Input placeholder='Địa chỉ' />
            </Form.Item>
            <Form.Item label="Zalo" name={"zalo"}>
                <Input placeholder='https://zalo.me/(Số điện thoại)' />
            </Form.Item>
            <Form.Item label="Facebook" name={"facebook"}>
                <Input placeholder='https://www.facebook.com/profile.php?id={id trang cá nhân}' />
            </Form.Item>
            <Form.Item
                label="Tải Hình ảnh"
                value={imageFile}
                onChange={onFileChange}
            >
                <Input type="file" />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" type="primary">
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ChangeInfoForm