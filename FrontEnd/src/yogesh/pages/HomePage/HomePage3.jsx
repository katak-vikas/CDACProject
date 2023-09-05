import Profile from "../../../pages/CustomerProfile/Profile";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage3.css"; // Import your custom CSS for styling
import TransactionList from "../../components/TransactionList/TransactionList";
import AccountInformation from "../../components/AccountInformation/AccountInformation";
import TransferFunds2 from "../../components/TransferFunds/TransferFunds2";
import { toast } from "react-toastify";
import useSendRequest2 from "../../axios/useSendRequest2";

const HomePage2 = () => {
  const [activeComponent, setActiveComponent] = useState("profile");
  const sendRequest = useSendRequest2();
  const [customer, setCustomer] = useState({});
  const [accounts, setAccounts] = useState([]);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest.get("/customer/profile");
        setCustomer(response.data);
        setAccounts(response.data.accounts);
      } catch (error) {
        toast.error(`${error.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    const logout = async () => {
      try {
        const response = await sendRequest.get("/customer/logout");
        sessionStorage.removeItem("jwtToken_test");
        toast.success("Logout Successfully!!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigateTo("/thank");
      } catch (error) {
        toast.error("Something went wrong !!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    logout();
  };

  const handleSetActiveComponent = (component) => {
    setActiveComponent(component);
  };

  const resetActiveComponent = () => {
    setActiveComponent(null);
  };

  return (
    <div className="homepage-container">
      <header className="header">
        <h1 className="title">Welcome, {customer.firstName}!</h1>
      </header>

      <div className="content">
        <section className="sidebar">
          <div
            className={`sidebar-button ${
              activeComponent === "profile" ? "active" : ""
            }`}
            onClick={() => handleSetActiveComponent("profile")}
          >
            Profile
          </div>
          <div
            className={`sidebar-button ${
              activeComponent === "account" ? "active" : ""
            }`}
            onClick={() => handleSetActiveComponent("account")}
          >
            Account Information
          </div>
          <div
            className={`sidebar-button ${
              activeComponent === "transactions" ? "active" : ""
            }`}
            onClick={() => handleSetActiveComponent("transactions")}
          >
            Transaction History
          </div>
          <div
            className={`sidebar-button ${
              activeComponent === "transfer" ? "active" : ""
            }`}
            onClick={() => handleSetActiveComponent("transfer")}
          >
            Transfer Funds
          </div>
          <button
            className="btn btn-danger btn-sm"
            style={{ marginTop: "4rem" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </section>
        <section className={`main-content ${activeComponent ? "active" : ""}`}>
          {activeComponent === "profile" && (
            <Profile
              customer={customer}
              resetActiveComponent={resetActiveComponent}
            />
          )}
          {activeComponent === "account" && (
            <AccountInformation
              accounts={accounts}
              resetActiveComponent={resetActiveComponent}
            />
          )}
          {activeComponent === "transactions" && (
            <TransactionList resetActiveComponent={resetActiveComponent} />
          )}
          {activeComponent === "transfer" && (
            <TransferFunds2
              accounts={accounts}
              resetActiveComponent={resetActiveComponent}
            />
          )}
        </section>
      </div>

      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Your Bank Name. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage2;
