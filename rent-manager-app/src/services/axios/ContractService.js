import axios from "axios"
import { ACCESS_TOKEN } from "../../constants/Connect";

const BASE_URL = "http://localhost:8080/"

class ContractService {
  createContract(formData){
    return axios.post(BASE_URL + 'contract', formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
      }
    );
  }

  requestContract(formData) {
    return axios.post(BASE_URL + 'contract/request', formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
      }
    );
  }


  editContractInfo(id, formData) {
    return axios.put(BASE_URL + 'contract/' + id, formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
      }
    );

  }
  deleteContract(id) {
    return axios.delete(BASE_URL + `contract/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
      }
    })
  };
}
export default new ContractService();