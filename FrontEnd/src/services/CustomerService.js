import axios from "axios";
const BASE_URL = "http://localhost:8080/customer";

class CustomerService {
  getCustomerDetails = () => {
    return axios.get(BASE_URL + "/profile");
  };
}

export default new CustomerService();
