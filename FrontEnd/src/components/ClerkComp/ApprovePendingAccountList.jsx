import React, { useEffect, useState } from "react";
import ClerkService from "../../yogesh/service/ClerkService";

const ApprovePendingAccountList = () => {
  const [accountswithPendingApproval, setAccountswithPendingApproval] =
    useState([]);
  useEffect(() => {
    // Fetch account details using ClerkService
    ClerkService.getAccountswithPendingApproval()
      .then((response) => {
        setAccountswithPendingApproval(response.data);
      })
      .catch((error) => {
        console.error("Error fetching account details:", error);
      });
  }, []); // Empty dependency array for componentDidMount behavior

  return (
    <div className="transaction-list-container">
      <h2 className="transaction-list-title">Account List</h2>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Account Number</th>
            <th>Balance</th>
            <th>Open Date</th>
            <th>Account Status</th>
            <th>Initial Deposit</th>
            <th>Account Type</th>
            <th>Last Update Date</th>
          </tr>
        </thead>
        <tbody>
          {accountswithPendingApproval.map((account, index) => (
            <tr key={index}>
              <td>{account.accountNumber}</td>
              <td>{account.balance}</td>
              <td>{account.openDate}</td>
              <td>{account.accountStatus}</td>
              <td>{account.lockedBalance}</td>
              <td>{account.accountType}</td>
              <td>{account.lastUpdateDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovePendingAccountList;
