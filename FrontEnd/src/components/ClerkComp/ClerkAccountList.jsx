import React, { useEffect, useState } from "react";
import ClerkService from "../../yogesh/service/ClerkService";
import useSendRequest2 from "../../yogesh/axios/useSendRequest2";

const ClerkAccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const sendRequest = useSendRequest2();
  useEffect(() => {
    // Fetch account details using ClerkService
    ClerkService.getAllAccounts();
    //   .then((response) => {
    //     setAccounts(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching account details:", error);
    //   });

    fetchAccounts();
  }, []); // Empty dependency array for componentDidMount behavior

  const fetchAccounts = async () => {
    try {
      const response = await sendRequest.get("/accounts");
      setAccounts(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
      </table>
    </div>
  );
};

export default ClerkAccountList;
