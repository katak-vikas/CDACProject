import sendRequest from "../axios/useSendRequest";
const BASE = "/account";

class AccountService {
  postTransferInterbank = (body) => {
    console.log("in Account Service");
    console.log(body);
    return sendRequest.post(BASE + "/transfer/interbank", body);
  };

  postTransferIntrabank = (body) => {
    console.log("in Account Service");
    console.log(body);
    return sendRequest.post(BASE + "/transfer/intrabank", body);
  };

  deleteAccount = ({ accountNumber }) => {
    console.log("in Account Service");
    console.log({ accountNumber });
    return sendRequest.delete(BASE + "/" + `${accountNumber}`);
  };
}

export default new AccountService();
