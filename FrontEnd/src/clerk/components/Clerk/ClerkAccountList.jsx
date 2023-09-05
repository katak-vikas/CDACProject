import React, { useEffect, useState } from "react";
import ClerkService from "../../service/ClerkService";
import { Table } from "react-bootstrap";

const ClerkAccountList = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // Fetch account details using ClerkService
    ClerkService.getAllAccounts()
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching account details:", error);
      });
  }, []); // Empty dependency array for componentDidMount behavior

  return (
    <div className="acc-transaction-list-container">
      <h2 className="acc-transaction-list-title">Account List</h2>
      <Table striped border hover style={{ boxShadow: "0px 0px 20px #888" }}>
        <thead className="table-dark">
          <tr>
            <th>Account Number</th>
            <th>Balance</th>
            <th>Open Date</th>
            <th>Account Status</th>
            <th>Account Type</th>
            <th>Last Update Date</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index}>
              <td>{account.accountNumber}</td>
              <td>{account.balance}</td>
              <td>{account.openDate}</td>
              <td>{account.accountStatus}</td>
              <td>{account.accountType}</td>
              <td>{account.lastUpdateDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ClerkAccountList;
