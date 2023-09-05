import React, { useEffect, useState } from "react";
import ClerkService from "../../service/ClerkService";
import { Table } from "react-bootstrap";
import "./ApproveAccountList.css";
import { toast } from "react-toastify";

const ApproveAccountList = () => {
  // const [approvePendingAccounts, setApprovePendingAccounts] = useState([]);
  const [accountswithPendingApproval, setAccountswithPendingApproval] =
    useState([]);

  useEffect(() => {
    ClerkService.getAccountswithPendingApproval()
      .then((response) => {
        setAccountswithPendingApproval(response.data);
      })
      .catch((error) => {
        console.error("Error fetching account details:", error);
      });

    refreshApprovePendingAccounts();
  }, []);

  const refreshApprovePendingAccounts = () => {
    ClerkService.getAccountswithPendingApproval()
      .then((response) => {
        setAccountswithPendingApproval(response.data);
        // toast.success("Approved", {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      })
      .catch((error) => {
        toast.error("Something Went Wrong!!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleApproveClick = async (accountNumber) => {
    try {
      const response = await ClerkService.approveAccount(accountNumber);
      console.log(response.data); // Handle the response as needed
      refreshApprovePendingAccounts(); // Refresh the list after the approval
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="approv-transaction-list-container">
      <h2 className="approv-transaction-list-title">Account List</h2>
      <Table striped border hover style={{ boxShadow: "0px 0px 20px #888" }}>
        <thead className="table-dark">
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
          {accountswithPendingApproval.map((account) => (
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
                  className="appro-approve-btn btn btn-primary"
                  onClick={() => handleApproveClick(account.accountNumber)}
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ApproveAccountList;
