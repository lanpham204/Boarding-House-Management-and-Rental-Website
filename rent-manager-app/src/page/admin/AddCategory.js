import { Navigate } from 'react-router-dom';
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import { useEffect, useState } from 'react';
import RoomService from "../../services/axios/RoomService";
import locationService from '../../services/axios/LocationService';
import { toast } from 'react-toastify';
import PlacesWithStandaloneSearchBox from './map/StandaloneSearchBox';
import LocationSelector from '../../common/LocationSelector';

function AddCategory(props) {
  const { authenticated, role, currentUser, location, onLogout } = props;

  const [roomData, setRoomData] = useState({
    title: '',
    description: '',
    price: 0,
    latitude: 0.0,
    longitude: 0.0,
    address: '',
    locationId: 0,
    categoryId: 0,
    assets: [
      { name: '', number: '' }
    ],
    files: []
  });
  const [locationReq, setLocationReq] = useState({
    cityName: '',
    district: '',
    ward: '',
    address: '',
    user: '', // assuming user is identified by an ID
  });
  useEffect(() => {
    if (currentUser && currentUser.id) {
      setLocationReq({
        ...locationReq,
        user: { id: currentUser.id }
      });
    }

  }, [currentUser])
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoomData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRemoveAsset = (indexToRemove) => {
    setRoomData(prevState => ({
      ...prevState,
      assets: prevState.assets.filter((asset, index) => index !== indexToRemove)
    }));
  }

  const handleAssetChange = (event, index) => {
    const { name, value } = event.target;
    setRoomData(prevState => ({
      ...prevState,
      assets: prevState.assets.map((asset, i) =>
        i === index ? { ...asset, [name]: value } : asset
      )
    }));
  };

  const handleFileChange = (event) => {
    setRoomData(prevState => ({
      ...prevState,
      files: [...prevState.files, ...event.target.files]
    }));
  };

  const setLatLong = (lat, long, address) => {
    setRoomData((prevRoomData) => ({
      ...prevRoomData,
      latitude: lat,
      longitude: long,
      address: address,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', roomData.title);
    formData.append('description', roomData.description);
    formData.append('price', roomData.price);
    formData.append('latitude', roomData.latitude);
    formData.append('longitude', roomData.longitude);
    formData.append('address', roomData.address);
    formData.append('categoryId', roomData.categoryId);
    formData.append('asset', roomData.assets.length);
    roomData.assets.forEach((asset, index) => {
      formData.append(`assets[${index}][name]`, asset.name);
      formData.append(`assets[${index}][number]`, asset.number);
    });
    roomData.files.forEach((file, index) => {
      formData.append(`files`, file);
    });

    locationService.addLocation(locationReq).then((location) => {
      formData.append('locationId', location.data.id);      
      RoomService.addNewRoom(formData)
        .then(response => {
          toast.success(response.message);
          toast.success("Đăng tin thành công!!")

        })
        .then(data => {
          console.log(data);
          // Do something with the response data here
          setRoomData({
            title: '',
            description: '',
            price: 0,
            latitude: 0.0,
            longitude: 0.0,
            address: '',
            locationId: 0,
            categoryId: 0,
            assets: [
              { name: '', number: '' }
            ],
            files: []
          });
        })
        .catch(error => {
          toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
        });
    })


    console.log(roomData);
  };
  if (!authenticated) {
    return <Navigate
      to={{
        pathname: "/login-rental",
        state: { from: location }
      }} />;
  }
  return (
    <>
      <div className="wrapper">
        <SidebarNav />


        <div className="main">
          <Nav onLogout={onLogout} currentUser={currentUser} />

          <br />
          <div className="container p-4">
            <h5 className="mb-4">Thêm phòng</h5>
            <form onSubmit={handleSubmit}>
              {/* Room Details Section */}
              <h6 className="mb-3">Thông tin phòng</h6>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="title">Tiêu đề phòng</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={roomData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="description">Mô tả</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={roomData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="price">Giá</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={roomData.price}
                  onChange={handleInputChange}
                />
              </div>

              {/* Location and Address Section */}
              <h6 className="mb-3 mt-4">Địa điểm và địa chỉ</h6>
              <LocationSelector locationReq={locationReq}
                setLocationReq={setLocationReq} />
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="address">Địa Chỉ cụ thể</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={roomData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {/* Category and Image Upload Section */}
              <h6 className="mb-3 mt-4">Danh mục và Hình ảnh</h6>
              <div className="form-group">
                <label htmlFor="categoryId">Danh mục</label>
                <select
                  className="form-control"
                  id="categoryId"
                  name="categoryId"
                  value={roomData.categoryId}
                  onChange={handleInputChange}
                >
                  <option value={0}>Chọn...</option>
                  <option value={1}>Bất động sản</option>
                  <option value={2}>Phòng trọ</option>
                  <option value={3}>Chung cư mini</option>
                </select>
              </div>
              <div className="form-group">
                <label>Tải Hình Ảnh</label>
                <input
                  className="form-control-file"
                  type="file"
                  name="files"
                  multiple
                  onChange={handleFileChange}
                />
              </div>

              {/* Room Assets Section */}
              <h6 className="mb-3 mt-4">Tài sản của phòng</h6>
              {roomData.assets.map((asset, index) => (
                <div key={index} className="form-row align-items-end">
                  <div className="form-group col-md-5">
                    <label htmlFor={`assetName${index}`}>Tên tài sản {index + 1}</label>
                    <input
                      type="text"
                      className="form-control"
                      id={`assetName${index}`}
                      name="name"
                      value={asset.name}
                      onChange={(event) => handleAssetChange(event, index)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor={`assetNumber${index}`}>Số lượng</label>
                    <input
                      type="number"
                      className="form-control"
                      id={`assetNumber${index}`}
                      name="number"
                      value={asset.number}
                      onChange={(event) => handleAssetChange(event, index)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-block"
                      onClick={() => handleRemoveAsset(index)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-primary mt-3"
                onClick={() =>
                  setRoomData((prevState) => ({
                    ...prevState,
                    assets: [...prevState.assets, { name: "", number: "" }],
                  }))
                }
              >
                Thêm tài sản
              </button>

              {/* Submit Button */}
              <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div >
      </div >

    </>
  )
}

export default AddCategory;