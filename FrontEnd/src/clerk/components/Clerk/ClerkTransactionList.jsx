import React, { useState, useEffect } from "react";
import ClerkService from "../../service/ClerkService";
import { Table } from "react-bootstrap";
import "./ClerkTransactionList.css";
const ClerkTransactionList = () => {
  const [clerkTransactions, setClerkTransactions] = useState([]);
  useEffect(() => {
    ClerkService.getAllTransactions()
      .then((response) => {
        console.log("Response", response);
        setClerkTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clerk transactions", error);
      });
  }, []);

  return (
    <div className="trans-transaction-list-container">
      <h2 className="trans-transaction-list-title">Transaction List</h2>
      <Table striped border hover style={{ boxShadow: "0px 0px 20px #888" }}>
        <thead className="table-dark">
          <tr>
            <th>Transaction ID</th>
            <th>Transaction Status</th>
            <th>Transaction Type</th>
            <th>Date</th>
            <th>Time</th>
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
              <td>{transaction.transactionDate}</td>
              <td>{transaction.transactionTime}</td>
              <td>{transaction.fromAccountNumber}</td>
              <td>{transaction.toAccountNumber}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.transactionMode}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ClerkTransactionList;
