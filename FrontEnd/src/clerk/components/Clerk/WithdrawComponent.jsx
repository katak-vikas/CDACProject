import React, { useState } from "react";
import "./WithdrawComponent.css"; // Import your CSS file for styling
import ClerkService from "../../service/ClerkService"; // Update the path to your service.js file
import { toast } from "react-toastify";

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
      // setResponse(responseData.data);
      // setError("");
      toast.success(`Rupees ${withdrawDetails.amount} withdrawn `, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      });
      // if (error.response) {
      //   setError(error.response.data.message || "An error occurred.");
      // } else {
      //   setError("An error occurred.");
      // }
      // setResponse("");
    }
  };

  return (
    <div className="clkWithdraw-deposit-form-container">
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
        <button
          className="clkWithdraw-custom-button"
          onClick={handleDepositClick}
        >
          Withdraw
        </button>
      </div>
      {/* <div className="response-container">
        <p>{response.message}</p>
        <p>Amount: {response.amount}</p>
        <p className="error">{error}</p>
      </div> */}
    </div>
  );
}

export default WithdrawComponent;
