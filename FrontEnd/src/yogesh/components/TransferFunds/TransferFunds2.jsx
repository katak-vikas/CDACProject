import React, { useState, useEffect } from "react";
import CustomerService from "../../service/CustomerService";
import AccountService from "../../service/AccountService";
import "./TransferFunds.css"; // Import the CSS file for styling
import { Modal } from "react-bootstrap";
import useSendRequest from "../../axios/useSendRequest";
import { toast } from "react-toastify";

const TransferFunds2 = () => {
  const [senderAccountNumber, setSenderAccountNumber] = useState("SA123456789");
  const [beneficiaryAccountNumber, setBeneficiaryAccountNumber] = useState("");
  const [beneficiaryAccountHolderName, setBeneficiaryAccountHolderName] =
    useState("");
  const [beneficiaryBankName, setBeneficiaryBankName] = useState("URVI_BANK");
  const [beneficiaryIFSCCode, setBeneficiaryIFSCCode] = useState("");
  const [amount, setAmount] = useState(0);
  const [transactionMode, setTransactionMode] = useState("ONLINE_BANKING");
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [selectedBankType, setSelectedBankType] = useState("OWN_BANK");
  const [accounts, setAccounts] = useState([]);
  const [transferData, setTransferData] = useState({});
  const [transferData2, setTransferData2] = useState({});
  const [showModal, setShowModal] = useState(false);

  const sendRequest = useSendRequest();

  useEffect(() => {
    // CustomerService.getAllAccounts()
    //   .then((response) => {
    //     setAccounts(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching customer details:", error);
    //   });
    const fetchData = async () => {
      try {
        const response = await sendRequest.get("/customer/accounts");
        setAccounts(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const banks = [
    "URVI_BANK",
    "HDFC_BANK",
    "ICICI_BANK",
    "STATE_BANK_OF_INDIA",
    "AXIS_BANK",
    "KOTAK_MAHINDRA_BANK",
    // Add more bank names
  ];

  const handleTransfer = () => {
    // setIsConfirmationVisible(true);
    // Simulate delay before showing confirmation (you can adjust the delay time)
    // Delay of 1 second (1000 milliseconds)
    try {
      if (selectedBankType === "OWN_BANK") {
        // {
        //   "senderAccountNumber": "string",
        //   "receiverAccountNumber": "string",
        //   "receiverName": "string",
        //   "amount": 0,
        //   "transactionMode": "ONLINE_BANKING"
        // }

        console.log("in confirm of OWN BANK");
        console.log({ transferData2 });

        // const response = AccountService.postTransferIntrabank(transferData2);
        const postData = async () => {
          try {
            const response = await sendRequest.post(
              "/account/transfer/intrabank",
              transferData2
            );
            // console.log(response);
            console.log("Transfer within own bank successful:", response.data);
            toast.success("Transfer Successful !!!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } catch (error) {
            console.error("Error:", error);
          }
        };
        postData();
        // console.log("Transfer within own bank successful:", response.data);
      } else if (selectedBankType === "OTHER_BANK") {
        // setTransferData({
        //   senderAccountNumber,
        //   tfa: {
        //     accountNumber: beneficiaryAccountNumber,
        //     accountHolderName: beneficiaryAccountHolderName,
        //     beneficiaryBankName,
        //     ifsccode: beneficiaryIFSCCode,
        //   },
        //   amount,
        //   transactionMode,
        // });
        console.log("in confirm OTHER BANK");
        console.log({ transferData });
        // const response = AccountService.postTransferInterbank(transferData);
        // console.log("Transfer to other bank successful:", response.data);

        const postData2 = async () => {
          try {
            const response = await sendRequest.post(
              "/account/transfer/interbank",
              transferData
            );
            // console.log(response);
            console.log("Transferto other bank successful:", response.data);
            toast.success("Transfer Successful !!!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } catch (error) {
            console.error("Error:", error);
            toast.error(error.reponse.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        };
        postData2();
      }
    } catch (error) {
      console.error("Error fetching transactions details:", error);
    }
    setShowModal(false);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setTransferData({
      senderAccountNumber,
      tfa: {
        accountNumber: beneficiaryAccountNumber,
        accountHolderName: beneficiaryAccountHolderName,
        beneficiaryBankName,
        ifsccode: beneficiaryIFSCCode,
      },
      amount,
      transactionMode,
    });

    setTransferData2({
      senderAccountNumber,
      receiverAccountNumber: beneficiaryAccountNumber,
      receiverName: beneficiaryAccountHolderName,
      amount,
      transactionMode,
    });

    // Send transferData to your API or handle the logic here
    // console.log(transferData);
    setShowModal(true);
    setTimeout(() => {
      console.log("in timeout");
      setShowModal(false);
    }, 10000);
  };

  return (
    <div className="transfer-form-container">
      <form className="transfer-form ">
        <div className="side-by-side">
          {/* Sender Account Number */}
          <div className="form-group large-field">
            <label htmlFor="senderAccountNumber">Sender Account Number</label>
            <select
              id="senderAccountNumber"
              className="account-select"
              value={senderAccountNumber}
              onChange={(e) => setSenderAccountNumber(e.target.value)}
            >
              <option value="">Select Account</option>
              {accounts.map((account, index) => (
                <option key={index} value={account.accountNumber}>
                  {account.accountNumber}
                </option>
              ))}
            </select>
          </div>

          {/* Other Form Fields */}

          <div className="form-group small-fiel">
            <div className="form-group">
              <label htmlFor="beneficiaryAccountNumber">
                Beneficiary Account Number
              </label>
              <input
                type="text"
                id="beneficiaryAccountNumber"
                value={beneficiaryAccountNumber}
                onChange={(e) => setBeneficiaryAccountNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="beneficiaryAccountHolderName">
                Beneficiary Account Holder Name
              </label>
              <input
                type="text"
                id="beneficiaryAccountHolderName"
                value={beneficiaryAccountHolderName}
                onChange={(e) =>
                  setBeneficiaryAccountHolderName(e.target.value)
                }
              />
            </div>

            {/* ... (rest of the form fields) */}

            {/* Radio Buttons */}
            <div className="form-group horizontal-radio">
              <label>Beneficiary Bank Type</label>
              <div className="radio-buttons">
                <label>
                  <input
                    type="radio"
                    value="OWN_BANK"
                    checked={selectedBankType === "OWN_BANK"}
                    onChange={() => setSelectedBankType("OWN_BANK")}
                  />
                  OWN BANK
                </label>
                <label>
                  <input
                    type="radio"
                    value="OTHER_BANK"
                    checked={selectedBankType === "OTHER_BANK"}
                    onChange={() => setSelectedBankType("OTHER_BANK")}
                  />
                  OTHER BANK
                </label>
              </div>
            </div>

            {/* Conditional Fields */}
            {selectedBankType === "OTHER_BANK" && (
              <div>
                <div className="form-group">
                  <label htmlFor="beneficiaryBankName">
                    Beneficiary Bank Name
                  </label>
                  <select
                    id="beneficiaryBankName"
                    value={beneficiaryBankName}
                    onChange={(e) => setBeneficiaryBankName(e.target.value)}
                  >
                    <option value="">Select Bank</option>
                    {banks.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="beneficiaryIFSCCode">
                    Beneficiary IFSC Code
                  </label>
                  <input
                    type="text"
                    id="beneficiaryIFSCCode"
                    value={beneficiaryIFSCCode}
                    onChange={(e) => setBeneficiaryIFSCCode(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="transactionMode">Transaction Mode</label>
              <select
                id="transactionMode"
                value={transactionMode}
                onChange={(e) => setTransactionMode(e.target.value)}
              >
                <option value="ONLINE_BANKING">Online Banking</option>
                {/* Add more transaction modes */}
              </select>
            </div>

            {/* Transfer Button */}
            <div className="form-group">
              <button className="transfer-button" onClick={handleConfirm}>
                Transfer
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* {isConfirmationVisible && (
        <div className="confirmation-container">
          <h2>Confirm Transfer</h2>
          <p>Sender Account Number: {senderAccountNumber}</p>
          <p>Beneficiary Account Number: {beneficiaryAccountNumber}</p>
          <p>Beneficiary Account Holder Name: {beneficiaryAccountHolderName}</p>
          <p>Beneficiary Bank Name: {beneficiaryBankName}</p>
          <p>Beneficiary IFSC Code: {beneficiaryIFSCCode}</p>
          <p>Amount: {amount}</p>
          <p>Transaction Mode: {transactionMode}</p>
          <button className="confirm-button" onClick={handleTransfer}>
            Confirm
          </button>
          <button
            className="cancel-button"
            onClick={() => setIsConfirmationVisible(false)}
          >
            Cancel
          </button>
        </div>
      )} */}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {" "}
            <span>Sender Account Number:</span> {senderAccountNumber}
          </p>
          <p>
            <span>Beneficiary Account Number:</span> {beneficiaryAccountNumber}
          </p>
          <p>
            <span>Beneficiary Account Holder Name:</span>{" "}
            {beneficiaryAccountHolderName}
          </p>
          <p>
            <span>Beneficiary Bank Name:</span> {beneficiaryBankName}
          </p>
          <p>
            <span>Beneficiary IFSC Code:</span> {beneficiaryIFSCCode}
          </p>
          <p>
            <span>Amount:</span> {amount}
          </p>
          <p>
            <span>Transaction Mode:</span> {transactionMode}
          </p>
          {/* <button className="confirm-button" onClick={handleTransfer}>
            Confirm
          // </button>
          // <button
          //   className="cancel-button"
          //   onClick={() => setIsConfirmationVisible(false)}
          // >
          //   Cancel
          // </button> */}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleTransfer}>
            Transfer
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TransferFunds2;
