import React, { useState } from "react";
import "./DepositComponent.css"; // Import your CSS file for styling
import ClerkService from "../../service/ClerkService"; // Update the path to your service.js file
import { toast } from "react-toastify";

function DepositComponent() {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  // const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleDepositClick = async () => {
    try {
      const depositDetails = {
        accountNumber,
        amount: parseFloat(amount),
      };

      const responseData = await ClerkService.depositAmount(depositDetails);
      // setResponse(responseData.data);
      toast.success(`Rupees ${depositDetails.amount} deposited `, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      });
      setError("");
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
    <div className="clk-deposit-form-container">
      <h2>Deposit</h2>
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
        <button className="clk-custom-button" onClick={handleDepositClick}>
          Deposit
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

export default DepositComponent;
