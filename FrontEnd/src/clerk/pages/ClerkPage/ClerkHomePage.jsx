import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import your custom CSS for styling
import "./ClerkHomePage.css"; // Import your custom CSS for styling
import ClerkCustomerList from "../../components/Clerk/ClerkCustomerList";
import ClerkService from "../../service/ClerkService";
import ClerkTransactionList from "../../components/Clerk/ClerkTransactionList";
import ClerkAccountList from "../../components/Clerk/ClerkAccountList";
import ApprovePendingAccountList from "../../components/Clerk/ApprovePendingAccountList";
import ApproveAccountList from "../../components/Clerk/ApproveAccountList";
import DepositComponent from "../../components/Clerk/DepositComponent";
import WithdrawComponent from "../../components/Clerk/WithdrawComponent";
import UpdateStatusComponent from "../../components/Clerk/UpdateStatusComponent";
import useSendRequest from "../../../yogesh/axios/useSendRequest";
import { toast } from "react-toastify";

const ClerkHomePage = () => {
  const [activeComponent, setActiveComponent] = useState("depositAmount");
  const [customers, setCustomers] = useState([]);
  const [clerkAccounts, setclerkAccounts] = useState([]);
  const [clerkTransactions, setClerkTransactions] = useState([]);
  const [accountswithPendingApproval, setAccountswithPendingApproval] =
    useState([]);
  const [depositAmount, setDepositAmount] = useState([]);
  const [withdrawAmount, setWithdrawAmount] = useState([]);
  const [approveAccount, setApproveAccount] = useState([]);
  const [updateCustomerStatus, setupdateCustomerStatus] = useState([]);

  const navigateTo = useNavigate();

  useEffect(() => {
    ClerkService.getAllCustomers()
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {});
  }, []);

  const sendRequest = useSendRequest();
  const fetchCustomers = () => {
    ClerkService.getAllCustomers()
      .then((response) => {
        setCustomers(response.data.ClerkCustomerList);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  };
  const fetchTransactions = () => {
    ClerkService.getAllTransactions()
      .then((response) => {
        setClerkTransactions(response.data.ClerkTransactionList);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  };

  const fetchAccounts = () => {
    ClerkService.getAllAccounts()
      .then((response) => {
        setclerkAccounts(response.data.ClerkAccountList);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  };

  const fetchAccountswithPendingApproval = () => {
    ClerkService.getAccountswithPendingApproval()
      .then((response) => {
        setAccountswithPendingApproval(response.data.ApprovePendingAccountList);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  };

  const handleSetActiveComponent = (component) => {
    setActiveComponent(component);
  };

  const resetActiveComponent = () => {
    setActiveComponent(null);
  };

  const handleLogout = () => {
    const logout = async () => {
      try {
        const response = await sendRequest.get("/clerk/logout");
        if (response.status === 200) {
          sessionStorage.removeItem("jwtToken_test");
          navigateTo("/thank");
          toast.error("Logout Successfully!!!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        toast.error("Something went wrong!!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    logout();
  };

  return (
    <div className="clrk-homepage-container">
      <header className="clrk-header">
        <h1 className="title"> Clerk Dashboard</h1>
      </header>

      <div className="clrk-content">
        <section className="clrk-sidebar">
          <div
            className={`sidebar-button ${
              activeComponent === "depositAmount" ? "active" : ""
            }`}
            onClick={() => handleSetActiveComponent("depositAmount")}
          >
            Deposit Amount
          </div>

          <div
            className={`sidebar-button ${
              activeComponent === "withdrawAmount" ? "active" : ""
            }`}
            onClick={() => handleSetActiveComponent("withdrawAmount")}
          >
            Withdraw Amount
          </div>

          <div
            className={`sidebar-button ${
              activeComponent === "approveAccount" ? "active" : ""
            }`}
            onClick={() => handleSetActiveComponent("approveAccount")}
          >
            Approve Account
          </div>

          <div
            className={`sidebar-button ${
              activeComponent === "updateCustomerStatus" ? "active" : ""
            }`}
            onClick={() => handleSetActiveComponent("updateCustomerStatus")}
          >
            Update Customer Status
          </div>
          <button
            className="btn btn-danger btn-sm"
            style={{ marginTop: "4rem" }}
            onClick={handleLogout}
          >
            Logout
          </button>

          {/* Add more sidebar buttons for other components */}
        </section>

        <section
          className={`clrk-main-content ${activeComponent ? "active" : ""}`}
        >
          {/* Describing buttons top buttons  */}
          <div className="content">
            <div className="top-buttons">
              <button
                onClick={() => {
                  fetchCustomers();
                  handleSetActiveComponent("customers");
                }}
              >
                Get Customers
              </button>
              <button
                onClick={() => {
                  fetchTransactions();
                  handleSetActiveComponent("clerkTransactions");
                }}
              >
                Get Transactions
              </button>
              <button
                onClick={() => {
                  fetchAccounts();
                  handleSetActiveComponent("clerkAccounts");
                }}
              >
                Get Accounts
              </button>
              <button
                onClick={() => {
                  fetchAccountswithPendingApproval();
                  handleSetActiveComponent("accountswithPendingApproval");
                }}
              >
                {" "}
                Get Accounts Pending For Approval{" "}
              </button>
            </div>
          </div>
          <div>
            <div>
              {activeComponent === "customers" && (
                <ClerkCustomerList
                  customers={customers}
                  resetActiveComponent={resetActiveComponent}
                />
              )}
            </div>

            <div>
              {activeComponent === "clerkTransactions" && (
                <ClerkTransactionList
                  clerkTransactions={clerkTransactions}
                  resetActiveComponent={resetActiveComponent}
                />
              )}
            </div>

            <div>
              {activeComponent === "clerkAccounts" && (
                <ClerkAccountList
                  clerkAccounts={clerkAccounts}
                  resetActiveComponent={resetActiveComponent}
                />
              )}
            </div>

            <div>
              {activeComponent === "accountswithPendingApproval" && (
                <ApprovePendingAccountList
                  accountswithPendingApproval={accountswithPendingApproval}
                  resetActiveComponent={resetActiveComponent}
                />
              )}
            </div>
          </div>
          {activeComponent === "depositAmount" && (
            <DepositComponent
              //
              depositAmount={depositAmount}
              resetActiveComponent={resetActiveComponent}
            />
          )}

          {activeComponent === "withdrawAmount" && (
            <WithdrawComponent
              withdrawAmount={withdrawAmount}
              resetActiveComponent={resetActiveComponent}
            />
          )}

          {activeComponent === "approveAccount" && (
            <ApproveAccountList
              approveAccount={approveAccount}
              resetActiveComponent={resetActiveComponent}
            />
          )}
          {activeComponent === "updateCustomerStatus" && (
            <UpdateStatusComponent
              updateCustomerStatus={updateCustomerStatus}
              resetActiveComponent={resetActiveComponent}
            />
          )}
          {/* {activeComponent === "approveTransaction" && (
            <ApproveTransactions
              approveTransaction={approveTransaction}
              resetActiveComponent={resetActiveComponent}
            />
          )}
           Other main content components */}
        </section>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Our Bank . All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ClerkHomePage;
