import sendRequest from "../axios/custom";
const BASE = "/customer";

class CustomerService {
  getCustomerDetails = () => {
    return sendRequest.get(BASE + "/profile");
  };

  getAllAccounts = () => {
    return sendRequest.get(BASE + "/accounts");
  };
  registerUser = (registrationDetails) => {
    return sendRequest.post(BASE + "/register", registrationDetails);
  };
}

export default new CustomerService();
