import React, { useState } from "react";
import "./DepositComponent.css"; // Import your CSS file for styling
import ClerkService from "../../yogesh/service/ClerkService"; // Update the path to your service.js file

function WithdrawComponent() {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleDepositClick = async () => {
    try {
      const withdrawDetails = {
        accountNumber,
        amount: parseFloat(amount),
      };

      const responseData = await ClerkService.withdrawAmount(withdrawDetails);
      setResponse(responseData.data);
      setError("");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "An error occurred.");
      } else {
        setError("An error occurred.");
      }
      setResponse("");
    }
  };

  return (
    <div className="deposit-form-container">
      <h2>Withdraw</h2>
      <div className="form-group">
        <label htmlFor="accountNumber">Account Number</label>
        <input
          type="text"
          id="accountNumber"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </div>
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
        <button className="custom-button" onClick={handleDepositClick}>
          Deposit
        </button>
      </div>
      <div className="response-container">
        <p>{response.message}</p>
        <p>Amount: {response.amount}</p>
        <p className="error">{error}</p>
      </div>
    </div>
  );
}

export default WithdrawComponent;
