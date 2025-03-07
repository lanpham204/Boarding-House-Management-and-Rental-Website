import axios from "axios"
import { ACCESS_TOKEN, API_BASE_URL } from "../../constants/Connect";

const BASE_URL = "http://localhost:8080/"

class LocationServie {

  addLocation(locationData) {
    const formData = new FormData();
    formData.append('address', locationData.address);
    formData.append('cityName', locationData.cityName);
    formData.append('district', locationData.district);
    formData.append('ward', locationData.ward);
    formData.append('userId', locationData.user.id);
    return axios.post(BASE_URL + 'location', formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
      }
    );

  }
  getLocationsByUserId(userId) {
    return axios.get(API_BASE_URL + '/location/user/' + userId,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
      }
    );
  }
  getLocationById(id) {
    return axios.get(API_BASE_URL + '/location/' + id,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
      }
    );
  }
}

export default new LocationServie();