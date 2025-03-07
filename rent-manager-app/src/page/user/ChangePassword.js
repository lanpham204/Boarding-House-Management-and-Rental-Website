import { changePassword } from "../../services/fetch/ApiUtils";
import { toast } from "react-toastify";
import { Button, Form, Input } from "antd";

function ChangePasswordOfUser() {
  const onFinish = (value) => {
    changePassword(value)
      .then((response) => {
        toast.success(response.message);
      })
      .catch((error) => {
        toast.error(
          (error && error.message) ||
          "Oops! Có điều gì đó xảy ra. Vui lòng thử lại!"
        );
      });
  }

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Mật khẩu cũ" name={"oldPassword"} rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ" }]}>
        <Input.Password placeholder='Mật khẩu cũ' />
      </Form.Item>

      <Form.Item label="Mật khẩu mới" name={"newPassword"} rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }]}>
        <Input.Password placeholder='Mật khẩu mới' />
      </Form.Item>
      <Form.Item label="Nhập lại mật khẩu" name={"confirmPassword"} rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu' }, ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('newPassword') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Mật khẩu không khớp'));
        },
      }),]}>
        <Input.Password placeholder='Vui lòng nhập mật khẩu' />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

}

export default ChangePasswordOfUser;
