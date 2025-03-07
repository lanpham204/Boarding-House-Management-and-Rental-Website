
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getRoom } from '../../../services/fetch/ApiUtils';

import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';


const ModalRoomDetails = ({ roomId }) => {


    const [comments, setComments] = useState();
    const [roomData, setRoomData] = useState({
        title: '',
        description: '',
        price: 0,
        latitude: 0.0,
        longitude: 0.0,
        address: '',
        locationId: 0,
        category: [{
            id: '', name: ''
        }],
        assets: [
            { name: '', number: '' }
        ],
        roomMedia: [],
        user: ''
    });

    useEffect(() => {
      console.log(roomData);
      
  }, [roomData]);

    useEffect(() => {
        getRoom(roomId)
            .then(response => {
              
                const room = response;
                setRoomData(prevState => ({
                    ...prevState,
                    ...room
                }));
            })
            .catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });
            fetchComments();
    }, [roomId]);



    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/room/${roomId}/comments`);
            const comments = response.data; // Assuming API returns comments data
            setComments(comments);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };


    return (
      <>
        <section className="pt-4">
          <div className="container">
            {/* Room Title Section */}
            <div className="row">
              <div className="col-lg-12 mb-4">
                <h1 className="display-4">{roomData?.title}</h1>
                <p className="text-muted">{roomData?.address}</p>
              </div>
            </div>
    
            {/* Room Information Section */}
            <div className="row">
              {/* Room Details and Image in a Single Column */}
              <div className="col-lg-8 mb-4">
                {/* Image Section */}
                {roomData?.roomMedia?.[0]?.files ? (
                  <img 
                    src={`http://localhost:8080/document/${roomData.roomMedia[0].files}`} 
                    alt="Room media" 
                    className="img-fluid rounded mb-3" 
                  />
                ) : (
                  <p>No image available</p>
                )}
    
                {/* Quick Summary Section */}
                <h5 className="text-secondary mt-3">Tóm tắt nhanh</h5>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Mã ID:</strong> <span>{roomData?.id}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Địa chỉ:</strong> <span>{roomData?.address}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Thể loại:</strong> <span>Phòng trọ</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Trạng thái:</strong> <span>Chưa thuê</span>
                  </li>
                  {roomData.assets?.map((asset, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                      <strong>{asset.name}:</strong> <span>{asset.number}</span>
                    </li>
                  ))}
                </ul>
              </div>
    
              {/* Price Section */}
              <div className="col-lg-4 mb-4">
                <div className="card border-primary">
                  <div className="card-body">
                    <h4 className="card-title text-primary">Giá</h4>
                    <p className="card-text display-4">
                      {roomData?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
    
    
}


export default ModalRoomDetails;