import sendRequest from "../axios/custom";
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
}

export default new CustomerService();
