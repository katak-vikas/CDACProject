import sendRequest from "../axios/useSendRequest";

const BASE = "/transaction";

class TransactionService {
  getAllTransactions = (accountNumber) => {
    console.log("in transaction service " + accountNumber);
    return sendRequest.get(BASE + `/list/${accountNumber}`);
  };

  getAllTransactionsBetween = (queryParams) => {
    let append = "";

    if (queryParams.accountNumber) {
      append += "?accountNumber=" + queryParams.accountNumber;
    }

    if (queryParams.startDate) {
      append += append
        ? "&startDate=" + queryParams.startDate
        : "?startDate=" + queryParams.startDate;
    }

    if (queryParams.endDate) {
      append += append
        ? "&endDate=" + queryParams.endDate
        : "?endDate=" + queryParams.endDate;
    }

    if (queryParams.startValue !== null) {
      append += append
        ? "&startValue=" + queryParams.startValue
        : "?startValue=" + queryParams.startValue;
    }

    if (queryParams.endValue !== null) {
      append += append
        ? "&endValue=" + queryParams.endValue
        : "?endValue=" + queryParams.endValue;
    }

    return sendRequest.get(BASE + "/list" + append);
  };
}

export default new TransactionService();
