import sendRequest from "../axios/custom";
const BASE = "/clerk";

class ClerkService {
  getAllCustomers = () => {
    return sendRequest.get(BASE + "/customers");
  };

  getAllTransactions = () => {
    return sendRequest.get(BASE + "/transactions");
  };

  getAllAccounts = () => {
    return sendRequest.get(BASE + "/accounts");
  };

  getAccountswithPendingApproval = () => {
    return sendRequest.get(BASE + "/customers/pending-approval");
  };

  getPendingTransactions = () => {
    return sendRequest.get(BASE + "/transaction/approve");
  };

  approveTransaction = (transactionId) => {
    return sendRequest.put(`${BASE}/transaction/approve/${transactionId}`);
  };

  approveAccount = (accountNumber) => {
    return sendRequest.get(`${BASE}/account/approve/${accountNumber}`);
  };
  depositAmount = (transactionDetails) => {
    return sendRequest.post(BASE + "/customer/deposit", transactionDetails);
  };

  withdrawAmount = (withdrawDetails) => {
    return sendRequest.post(BASE + "/customer/withdraw", withdrawDetails);
  };

  updateCustomerStatus = (username) => {
    return sendRequest.put(`${BASE}/customer/approveStatus/${username}`);
  };

  getNotActiveCustomers = () => {
    return sendRequest.get(BASE + "/customer/notActive");
  };
}

export default new ClerkService();
