import React, { useState } from "react";
import "./TransferFunds.css"; // Import the CSS file for styling

const TransferFunds = () => {
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

  const accounts = [
    "SA123456789",
    "CA987654321",
    "CA987653456",
    "CA987651234",
    "CA987659876",
    // Add more account numbers
  ];

  const banks = [
    "Bank A",
    "Bank B",
    "Bank C",
    "Bank D",
    "Bank E",
    "Bank F",
    "Bank G",
    // Add more bank names
  ];

  const handleTransfer = () => {
    // setIsConfirmationVisible(true);

    // Simulate delay before showing confirmation (you can adjust the delay time)
    setTimeout(() => {
      setIsConfirmationVisible(false);
    }, 10000); // Delay of 1 second (1000 milliseconds)
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const transferData = {
      senderAccountNumber,
      tfa: {
        accountNumber: beneficiaryAccountNumber,
        accountHolderName: beneficiaryAccountHolderName,
        beneficiaryBankName,
        ifsccode: beneficiaryIFSCCode,
      },
      amount,
      transactionMode,
    };

    // Send transferData to your API or handle the logic here
    console.log(transferData);
    setIsConfirmationVisible(true);
  };

  return (
    <div className="transfer-form-container">
      {/* ... */}
      <form className="transfer-form">
        <div className="form-group">
          <label htmlFor="senderAccountNumber">Sender Account Number</label>
          <select
            id="senderAccountNumber"
            value={senderAccountNumber}
            onChange={(e) => setSenderAccountNumber(e.target.value)}
          >
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account} value={account}>
                {account}
              </option>
            ))}
          </select>
        </div>

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
            onChange={(e) => setBeneficiaryAccountHolderName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Beneficiary Bank Type</label>
          <div className="radio-group">
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

        {selectedBankType === "OTHER_BANK" && (
          <div>
            <div className="form-group">
              <label htmlFor="beneficiaryBankName">Beneficiary Bank Name</label>
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
              <label htmlFor="beneficiaryIFSCCode">Beneficiary IFSC Code</label>
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

        <button className="transfer-button" onClick={handleConfirm}>
          Transfer
        </button>
      </form>
      {isConfirmationVisible && (
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
      )}
    </div>
  );
};

export default TransferFunds;
