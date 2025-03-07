import { Navigate } from 'react-router-dom';
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import { useEffect, useState } from 'react';
import RoomService from "../../services/axios/RoomService";
import locationService from '../../services/axios/LocationService';
import { toast } from 'react-toastify';
import LocationSelector from '../../common/LocationSelector';
import { Button, Form, Input, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getAllCategoryOfAdmin } from '../../services/fetch/ApiUtils';
import { FirebaseUtil } from '../../utils/FirebaseUtil';
const { Option } = Select;
function AddRoom(props) {
  const [errorAddress, setErrorAddress] = useState(false)
  const [files, setFiles] = useState([])
  const [locations, setLocations] = useState([])
  const [seletedLocation, setSelectedLocation] = useState()
  const { authenticated, role, currentUser, location, onLogout } = props;
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm()
  const [locationReq, setLocationReq] = useState({
    cityName: '',
    district: '',
    ward: '',
    address: '',
    user: '',
  });
  useEffect(() => {
    if (currentUser && currentUser.id) {
      setLocationReq({
        ...locationReq,
        user: { id: currentUser.id }
      });
    }
    fetchData()
  }, [currentUser])
  const fetchData = () => {
    locationService.getLocationsByUserId(currentUser.id)
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        toast.error(
          (error && error.message) ||
          "Oops! Có điều gì đó xảy ra. Vui lòng thử lại!"
        );
      });
    getAllCategoryOfAdmin(1, 100).then(response => {
      setCategories(response.content);
    }).catch(
      error => {
        toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
      }
    )
  };

  const handleFileChange = (event) => {
    setFiles((prevState) => [...prevState, ...event.target.files])
  };

  function addRoom(formData) {
    RoomService.addNewRoom(formData)
      .then(response => {
        toast.success(response.message);
        setErrorAddress(false)
        form.resetFields()
        setFiles([])
        toast.success("Đăng tin thành công!!")
      })
      .catch(error => {
        toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
      });
  }
  if (!authenticated) {
    return <Navigate
      to={{
        pathname: "/login-rental",
        state: { from: location }
      }} />;
  }
  const onFinish = async (value) => {
    if (!locationReq.ward && seletedLocation === undefined) {
      setErrorAddress(true)
    } else {
      const { title, description, price, address, categoryId, assets } = value
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('latitude', 0.0);
      formData.append('longitude', 0.0);
      formData.append('address', address);
      formData.append('categoryId', categoryId);
      formData.append('asset', assets?.length ?? 0);
      assets?.forEach((asset, index) => {
        formData.append(`assets[${index}][name]`, asset.name);
        formData.append(`assets[${index}][number]`, asset.number);
      });
      const imageUrlList = await Promise.all(files.map(async image => await FirebaseUtil.uploadFile("room/images", image)));
      formData.append('files', imageUrlList);
      if (seletedLocation === undefined) {
        locationService.addLocation({ ...locationReq, address, currentUser }).then((location) => {
          formData.append('locationId', location.data.id);
          addRoom(formData)
        })
      } else {
        formData.append('locationId', seletedLocation);
        addRoom(formData)
      }
    }
  }
  return (
    <div className="wrapper">
      <SidebarNav />
      <div className="main">
        <Nav onLogout={onLogout} currentUser={currentUser} />
        <div className="container p-4">
          <h5 className="mb-4">Thêm phòng</h5>
          <Form className='row' form={form} onFinish={onFinish} layout='vertical'>
            <Form.Item className='col-6' label={"Tên phòng"} name={"title"} rules={[{ required: true, message: "Vui lòng nhập tên phòng" }]}>
              <Input placeholder='Tên phòng' />
            </Form.Item>
            <Form.Item className='col-6' label={"Giá phòng"} name={"price"} rules={[{ required: true, message: "Vui lòng nhập giá phòng" },
            {
              validator: (_, value) => {
                if (!(/^-?\d+$/.test(value))) {
                  return Promise.reject(new Error("Giá phòng phải là một số"));
                }
                if (value <= 0) {
                  return Promise.reject(new Error("Giá phòng phải lớn hơn 0"));
                }
                return Promise.resolve();
              }
            }]}>
              <Input placeholder='Giá phòng' />
            </Form.Item>
            <Form.Item name={"description"} label={"Mô tả"} rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}>
              <Input.TextArea placeholder='Mô tả' />
            </Form.Item>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: seletedLocation === undefined, message: "Vui lòng nhập địa chỉ" }]}
            >
              <div style={{ display: "flex", gap: "1rem" }}>
                {/* Selector cho tỉnh, quận, huyện */}
                <LocationSelector
                  locationReq={locationReq}
                  setLocationReq={setLocationReq}
                />
                <Input
                  style={{ flex: "1" }}
                  placeholder="Địa chỉ"
                  onChange={(e) => setLocationReq({ ...locationReq, address: e.target.value })}
                />
              </div>
              {errorAddress && <div className='text-danger'>Vui lòng nhập chọn tỉnh, quận, huyện</div>}
              {/* {form.getFieldValue("address") && "haha"} */}
            </Form.Item>
            <Form.Item label="Hoặc địa chỉ đã tạo">
              <Select
                placeholder="Chọn địa chỉ của bạn"
                value={seletedLocation}
                onChange={(value) => setSelectedLocation(value)}
                allowClear
              >
                {locations
                  .map(location => (
                    <Option key={location.id} value={location.id}>
                      {location.address + ' ' + location.ward + ' ' + location.district + ' ' + location.cityName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item label="Danh mục" className='col-6' name={"categoryId"} rules={[{ required: "true", message: "Vui lòng chọn danh mục" }, {
              validator: (_, value) => {
                if (value && value !== 0) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Vui lòng chọn một danh mục hợp lệ"));
              },
            },]}>
              <Select
                placeholder="Chọn danh mục"
                allowClear
              >
                {[<Option key={0} value={0}>
                  Chọn...
                </Option>, ...categories
                  .map(category => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))]}
              </Select>
            </Form.Item>
            <Form.Item label="Tải hình ảnh" className='col-6'>
              <Input type='file' accept='image/*' onChange={handleFileChange} multiple />
            </Form.Item>
            <Form.List name="assets">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} className='align-items-center' align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        label={`Tên tài sản ${index + 1}`}
                        rules={[{ required: true, message: 'Vui lòng nhập tên bảo trì' }]}
                      >
                        <Input placeholder={`Tên tài sản ${index + 1}`} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'number']}
                        label={"Số lượng"}
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng' }, {
                          validator: (_, value) => {
                            if (value && value > 0) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error("Giá phòng phải lớn hơn 0"));
                          },
                        }]}
                      >
                        <Input type='number' placeholder="Số lượng" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Thêm tài sản
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type='primary' htmlType='submit'>Thêm</Button>
            </Form.Item>
          </Form>
        </div>
      </div >
    </div >
  )
}

export default AddRoom;