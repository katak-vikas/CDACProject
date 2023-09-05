import React, { useState, useEffect } from "react";
import axios from "axios";
import ClerkService from "../../yogesh/service/ClerkService";
import useSendRequest2 from "../../yogesh/axios/useSendRequest2";

const ClerkTransactionList = () => {
  const [clerkTransactions, setClerkTransactions] = useState([]);
  const sendRequest = useSendRequest2();

  useEffect(() => {
    // ClerkService.getAllTransactions()
    //   .then((response) => {
    //     console.log("Response", response);
    //     setClerkTransactions(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching clerk transactions", error);
    //   });

    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await sendRequest.get("/clerk/transactions");
      setClerkTransactions(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="transaction-list-container">
      <h2 className="transaction-list-title">Transaction List</h2>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Transaction Status</th>
            <th>Transaction Type</th>
            <th>Transaction Date Time</th>
            <th>From Account</th>
            <th>To Account</th>
            <th>Amount</th>
            <th>Transaction Mode</th>
          </tr>
        </thead>
        <tbody>
          {clerkTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.transactionId}</td>
              <td>{transaction.transactionStatus}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.transactionDateTime}</td>
              <td>{transaction.fromAccountNumber}</td>
              <td>{transaction.toAccountNumber}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.transactionMode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClerkTransactionList;
