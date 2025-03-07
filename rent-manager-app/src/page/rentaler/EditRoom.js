import { Navigate, useParams } from 'react-router-dom';
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import { useEffect, useState } from 'react';
import RoomService from "../../services/axios/RoomService";
import { toast } from 'react-toastify';
import { getAllCategoryOfAdmin, getRoom } from '../../services/fetch/ApiUtils';
import LocationService from '../../services/axios/LocationService';
import { Button, Form, Input, Select, Space } from 'antd';
import LocationSelector from '../../common/LocationSelector';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FirebaseUtil } from '../../utils/FirebaseUtil';
const { Option } = Select;
function EditRoom(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const { id } = useParams();
    const [form] = Form.useForm()
    const [files, setFiles] = useState([])
    const [errorAddress, setErrorAddress] = useState(false)
    const [locations, setLocations] = useState([])
    const [seletedLocation, setSelectedLocation] = useState()
    const [categories, setCategories] = useState([]);
    const [roomData, setRoomData] = useState({
        latitude: 0.0,
        longitude: 0.0,
    });
    const [locationReq, setLocationReq] = useState({
        cityName: '',
        district: '',
        ward: '',
        address: '',
        user: '',
    });

    const fetchData = () => {
        LocationService.getLocationsByUserId(currentUser.id)
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
        setFiles(prevState => [...prevState, ...event.target.files])
    };

    useEffect(() => {
        getRoom(id)
            .then(response => {
                const room = response;
                form.setFieldsValue({ ...room })
                form.setFieldValue("categoryId", room.category.id)
                setRoomData(room);
                setSelectedLocation(room.location.id)
            })
            .catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });
        fetchData()
    }, [id, currentUser]);

    function editRoom(formData) {
        RoomService.updateRoom(id, formData)
            .then(response => {
                setErrorAddress(false)
                toast.success(response.message);
                toast.success("Cập nhật thông tin phòng thành công.");
            })
            .catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });
    }
    const onFinish = async (value) => {
        const { title, description, price, address, categoryId, assets } = value
        if (!locationReq.ward && seletedLocation === undefined) {
            setErrorAddress(true)
        } else {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('latitude', roomData.latitude);
            formData.append('longitude', roomData.longitude);
            formData.append('address', address);
            formData.append('categoryId', categoryId);
            formData.append('asset', assets?.length ?? 0);
            assets.forEach((asset, index) => {
                formData.append(`assets[${index}][name]`, asset.name);
                formData.append(`assets[${index}][number]`, asset.number);
            });
            if (files.length > 0) {
                const imageUrlList = await Promise.all(files.map(async image => await FirebaseUtil.uploadFile("room/images", image)));
                formData.append('files', imageUrlList);
            }
            // if (files.length > 0)
            //     files.forEach((file) => {
            //         formData.append(`files`, file);
            //     });
            if (seletedLocation === undefined) {
                LocationService.addLocation({ ...locationReq, address, user: currentUser }).then((location) => {
                    formData.append('locationId', location.data.id);
                    editRoom(formData)
                })
            } else {
                formData.append('locationId', seletedLocation);
                editRoom(formData)
            }
        }
    }
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
                <br />
                <div className="container-fluid p-0">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Cập nhật thông tin phòng</h5>
                        </div>
                        <div className="card-body">
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
                                        {/* Ô nhập địa chỉ */}

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
                                </Form.Item>
                                <Form.Item label="Hoặc địa chỉ đã tạo">
                                    <Select
                                        placeholder="Hoặc chọn địa chỉ của bạn"
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
                                    <Input type='file' onChange={handleFileChange} multiple />
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
                                    <Button type='primary' htmlType='submit'>Cập nhập</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default EditRoom;