import { useEffect, useState } from "react";
import Nav from "./Nav";
import SidebarNav from "./SidebarNav";
import "../../assets/css/Profile.css";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../../services/axios/AuthService";
import { Button, Form, Input } from "antd";
import AvatarElement from "../../element/AvatarElement";
import { FirebaseUtil } from "../../utils/FirebaseUtil";

const ProfileRentaler = (props) => {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const [imageFile, setImageFile] = useState(null);
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue(currentUser)
        form.setFieldValue("facebook", currentUser.facebookUrl)
        form.setFieldValue("zalo", currentUser.zaloUrl)
        console.log(currentUser);

    }, [currentUser])
    const onFinish = async (value) => {
        const { address, name, phone, zalo, facebook } = value;
        const formData = new FormData();
        formData.append('zalo', zalo);
        formData.append('facebook', facebook)
        formData.append('address', address);
        formData.append('name', name);
        formData.append('phone', phone);
        if (imageFile) {
            const imageUrl = await FirebaseUtil.uploadFile("user", imageFile)
            formData.append('file', imageUrl);
        }

        AuthService.uploadProfile(formData).then(response => {
            toast.success(response.message);
            toast.success("Cập nhật thông tin cá nhân thành công.");
            props.loadCurrentUser();
        }).catch(error => {
            toast.error((error && error.response.data.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
        }
        )
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

    if (!authenticated) {
        return <Navigate
            to={{
                pathname: "/login-rental",
                state: { from: location }
            }} />;
    }


    return (
        <div className="wrapper">
            <SidebarNav />
            <div className="main">
                <Nav onLogout={onLogout} currentUser={currentUser} />
                <main style={{ margin: "20px 20px 20px 20px" }}>
                    <div className="profile-info">
                        <div className="profile-avatar">
                            <AvatarElement currentUser={currentUser} size={100} />
                        </div>
                        <div className="profile-name">
                            <h2>{currentUser && currentUser.name}</h2>
                            <p className="profile-email">{currentUser && currentUser.email}</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <Form form={form} onFinish={onFinish} layout="vertical" className="row">
                                <Form.Item className="col-6" label="Email" name={"email"} rules={[{ type: "email", message: "Vui lòng nhập đúng định dạng email" }, { required: true, message: "Vui lòng nhập email" }]}>
                                    <Input placeholder='email' readOnly />
                                </Form.Item>
                                <Form.Item className="col-6" label="Số điện thoại" name={"phone"} rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
                                    <Input placeholder='Số điện thoại' readOnly />
                                </Form.Item>
                                <Form.Item className="col-6" label="Họ và tên" name={"name"} rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}>
                                    <Input placeholder='Họ và tên' />
                                </Form.Item>
                                <Form.Item className="col-6" label="Địa chỉ" name={"address"} rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
                                    <Input placeholder='Địa chỉ' />
                                </Form.Item>
                                <Form.Item className="col-6" label="Zalo" name={"zalo"}>
                                    <Input placeholder='(Số điện thoại)' />
                                </Form.Item>
                                <Form.Item className="col-6" label="Facebook" name={"facebook"}>
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
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}



export default ProfileRentaler;