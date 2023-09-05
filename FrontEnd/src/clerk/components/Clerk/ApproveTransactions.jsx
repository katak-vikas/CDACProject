/*import React, { useEffect, useState } from 'react';
import ClerkService from '../../service/ClerkService';

const ApproveTransactions = () => {
       const [approveTransaction, setApproveTransaction] = useState([]);
       const [transactions, setTransactions] = useState([]);
       
  useEffect(() => {
    // Fetch account details using ClerkService
    ClerkService.getPendingTransactions()
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {

       console.error("Error fetching account details:", error);

      });
  }, []); // Empty dependency array for componentDidMount behavior
  const handleApproveClick = (transactionId) => {
    ClerkService.approveTransaction(transactionId)
      .then(() => {
        // After successful approval, update the list of transactions
        console.log("updtaed");
        const updatedTransactions = approveTransaction.map((transaction) => {
          if (transaction.transactionId === transactionId) {
            return { ...transaction, transactionStatus: 'APPROVED' };
          }
          return transaction;
        });
        setApproveTransaction(updatedTransactions);
      })
      .catch((error) => {
        console.error('Error approving transaction', error);
      });
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
            <th>Transaction  Date Time</th>
            <th>From Account</th>
            <th>To Account</th>
            <th>Amount</th>
            <th>Transaction Mode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {approveTransaction.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.transactionId}</td>
              <td>{transaction.transactionStatus}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.transactionDateTime}</td>
             <td>{transaction.fromAccountNumber}</td>
              <td>{transaction.toAccountNumber}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.transactionMode}</td>
              <td>
            {transaction.transactionStatus !== 'APPROVED' && (
                <button
          onClick={() => handleApproveClick(transaction.transactionId)}
          className="approve-button"
        >
          Approve
        </button>
      )}
    </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveTransactions;
*/