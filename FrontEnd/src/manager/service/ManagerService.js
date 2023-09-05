import sendRequest from "../axios/custom";
const BASE = "/manager";

class ManagerService {
  getAllAccounts = () => {
    return sendRequest.get(BASE + "/accounts");
  };

  getAllClerks = () => {
    return sendRequest.get(BASE + "/clerks");
  };

  getAllTransactions = () => {
    return sendRequest.get(BASE + "/transactions");
  };

  getAllCustomers = () => {
    return sendRequest.get(BASE + "/customers");
  };
}

export default new ManagerService();
