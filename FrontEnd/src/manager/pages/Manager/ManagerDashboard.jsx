import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomerService from "../../service/CustomerService";
import "./ManagerDashboard.css";
import TransactionList from "../../components/Manager/TransactionList";
import AccountList from "../../components/Manager/AccountList";
import ClerkList from "../../components/Manager/ClerkList";
import CustomerList from "../../components/Manager/CustomerList";
import useSendRequest from "../../../yogesh/axios/useSendRequest";
import { toast } from "react-toastify";

const ManagerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("clerks");
  const [customer, setCustomer] = useState({});
  const [accounts, setAccounts] = useState([]);

  const navigateTo = useNavigate();

  useEffect(() => {
    CustomerService.getCustomerDetails()
      .then((response) => {
        setCustomer(response.data);
        setAccounts(response.data.accounts);
      })
      .catch((error) => {});
    sessionStorage.getItem("jwtToken_test");
  }, []);

  const handleSetActiveComponent = (component) => {
    setActiveComponent(component);
  };

  const resetActiveComponent = () => {
    setActiveComponent(null);
  };

  const sendRequest = useSendRequest();

  const handleLogout = () => {
    const logout = async () => {
      try {
        const response = await sendRequest.get("/manager/logout");
        if (response.status === 200) {
          sessionStorage.removeItem("jwtToken_test");
          toast.success(response.data, {
            position: toast.POSITION.TOP_CENTER,
          });
          navigateTo("/thank");
        }
      } catch (error) {
        toast.error("Something Went Wrong", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    logout();
  };

  return (
    <div className="homepage-container">
      <header className="header">
        <h1
          className="title"
          style={{
            fontWeight: "600",
            textAlign: "center",
            letterSpacing: "0.2rem",
          }}
        >
          Manager Dashboard
        </h1>
      </header>

      <div className="content">
        <section className="sidebar">
          <div
            className={`sidebar-button ${
              activeComponent === "clerks" ? "active" : ""
            }`}
            onClick={() => handleSetActiveComponent("clerks")}
          >
            Clerk List
          </div>

          <div
            className={`sidebar-button ${
              activeComponent === "accountlist" ? "active" : ""
            }`}
            onClick={() => handleSetActiveComponent("accountlist")}
          >
            Account List
          </div>
          <div
            className={`sidebar-button ${
              activeComponent === "customer" ? "active" : ""
            }`}
            onClick={() => handleSetActiveComponent("customer")}
          >
            Customer List
          </div>
          <div
            className={`sidebar-button ${
              activeComponent === "transaction" ? "active" : ""
            }`}
            onClick={() => handleSetActiveComponent("transaction")}
          >
            Transaction List
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
          {activeComponent === "customer" && (
            <CustomerList
              accounts={accounts}
              resetActiveComponent={resetActiveComponent}
            />
          )}
          {activeComponent === "accountlist" && (
            <AccountList resetActiveComponent={resetActiveComponent} />
          )}
          {activeComponent === "transaction" && (
            <TransactionList
              accounts={accounts}
              resetActiveComponent={resetActiveComponent}
            />
          )}
          {activeComponent === "clerks" && (
            <ClerkList resetActiveComponent={resetActiveComponent} />
          )}
        </section>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Our Bank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ManagerDashboard;
