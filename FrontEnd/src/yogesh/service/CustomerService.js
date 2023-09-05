import axios from "axios";
import sendRequest from "../axios/axiosClerkService/custom";
const BASE = "/customer";

class CustomerService {
  getCustomerDetails = () => {
    return sendRequest.get(BASE + "/profile");
  };

  getAllAccounts = () => {
    return sendRequest.get(BASE + "/accounts");
  };

  createNewAccount = (body) => {
    console.log("in Customer Service");
    console.log(body);
    return sendRequest.post(BASE + "/newAccount", body);
  };

  registerUser = (registrationDetails) => {
    return axios.post(
      "http://localhost:8080" + BASE + "/register",
      registrationDetails,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };
}

export default new CustomerService();
