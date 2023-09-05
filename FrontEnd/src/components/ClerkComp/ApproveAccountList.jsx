import React, { useEffect, useState } from "react";
import ClerkService from "../../yogesh/service/ClerkService";
import useSendRequest2 from "../../yogesh/axios/useSendRequest2";

const ApproveAccountList = () => {
  const [approvePendingAccounts, setApprovePendingAccounts] = useState([]);
  const [accountsWithPendingApproval, setAccountsWithPendingApproval] =
    useState([]);

  const sendRequest = useSendRequest2();

  useEffect(() => {
    ClerkService.getAccountswithPendingApproval()
      .then((response) => {
        setAccountsWithPendingApproval(response.data);
      })
      .catch((error) => {
        console.error("Error fetching account details:", error);
      });
    // const fetchAccountsWithPendingApproval = async () => {
    //   try {
    //     const response = await sendRequest.get(
    //       "/customers/pending-approval"
    //     );
    //     setAccountsWithPendingApproval(response.data);
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // };
    // fetchAccountsWithPendingApproval();
    // refreshApprovePendingAccounts();
  }, []);

  const fetchAccountsWithPendingApproval = async () => {
    try {
      const response = await sendRequest.get(
        "/clerk/customers/pending-approval"
      );
      console.log("pending approval : " + response);
      setAccountsWithPendingApproval(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const refreshApprovePendingAccounts = () => {
    ClerkService.getAccountswithPendingApproval()
      .then((response) => {
        setAccountsWithPendingApproval(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clerk transactions", error);
      });
    // fetchAccountsWithPendingApproval();
  };

  const handleApproveClick = async (accountNumber) => {
    try {
      // const response = await ClerkService.approveAccount(accountNumber);
      const response = await sendRequest.get(
        `/clerk/account/approve/${accountNumber}`
      );
      console.log(response.data); // Handle the response as needed
      refreshApprovePendingAccounts(); // Refresh the list after the approval
    } catch (error) {
      console.error("An error occurred:", error);
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
            <th>Initial Deposit</th>
            <th>Account Type</th>
            <th>Last Update Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accountsWithPendingApproval.map((account) => (
            <tr key={account.accountNumber}>
              <td>{account.accountNumber}</td>
              <td>{account.balance}</td>
              <td>{account.openDate}</td>
              <td>{account.accountStatus}</td>
              <td>{account.lockedBalance}</td>
              <td>{account.accountType}</td>
              <td>{account.lastUpdateDate}</td>
              <td>
                <button
                  onClick={() => handleApproveClick(account.accountNumber)}
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveAccountList;
