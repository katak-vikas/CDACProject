import React, { useState, useEffect } from "react";
import { useTrail, animated } from "react-spring";
import "./TransactionList.css"; // Import the CSS file for styling
import TransactionService from "../../service/TransactionService";
import CustomerService from "../../service/CustomerService";
import { Table } from "react-bootstrap";
import useSendRequest from "../../axios/useSendRequest2";
import { toast } from "react-toastify";

const TransactionList = () => {
  const [selectedAccountNumber, setSelectedAccountNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [showTable, setShowTable] = useState(false);
  // const [showGenerateButton, setShowGenerateButton] = useState(false);

  const sendRequest = useSendRequest();

  useEffect(() => {
    // CustomerService.getAllAccounts()
    //   .then((response) => {
    //     setAccounts(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching customer details:", error);
    //   });

    const fetchData = async () => {
      try {
        const response = await sendRequest.get("/customer/accounts");
        setAccounts(response.data);
        // setAccounts(response.data.accounts);
      } catch (error) {}
    };
    fetchData();
  }, []);
  const generateStatement = async () => {
    try {
      const response = await sendRequest.post(
        `/customer/transactions/export/`,
        selectedAccountNumber
      );
      // setAccounts(response.data);
      toast.success("Check Your Email", {
        position: toast.POSITION.TOP_RIGHT,
      });
      // setAccounts(response.data.accounts);
    } catch (error) {
      toast.error("Something Wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleAccountSelect = (event) => {
    setSelectedAccountNumber(event.target.value);

    // { selectedAccountNumber && handleFetchTransactions();}
    handleFetchTransactions();
  };

  const handleFetchTransactions = async () => {
    setLoading(true); // Start loading
    setShowTable(true);

    try {
      const queryParams = {
        accountNumber: selectedAccountNumber,
        startDate: startDate,
        endDate: endDate,
        startValue: parseFloat(startValue),
        endValue: parseFloat(endValue),
      };
      // const response = await TransactionService.getAllTransactions(
      //   queryParams.accountNumber
      // );

      const fetchData2 = async () => {
        try {
          const response = await sendRequest.get(
            `/transaction/list/?accountNumber=${queryParams.accountNumber}`
          );
          setTransactions(response.data);
        } catch (error) {
          toast.error(`${error.response.data.message}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      };
      fetchData2();
      // console.log(response.data);
      // setTransactions(response.data);
    } catch (error) {
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const trail = useTrail(transactions.length, {
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { mass: 1, tension: 500, friction: 40 },
  });

  return (
    <div className="transaction-list-container">
      <h2
        className="transaction-list-title"
        style={{ letterSpacing: "0.1rem" }}
      >
        Transaction History
      </h2>
      <div className="filters-container">
        <div className="account-select">
          <label htmlFor="accountSelect">Select Account : </label>
          <select
            id="accountSelect"
            className="form-select"
            value={selectedAccountNumber}
            onChange={handleAccountSelect}
          >
            <option value="">All Accounts</option>
            {accounts.map((account) => (
              <option key={account.accountNumber} value={account.accountNumber}>
                {account.accountNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-inputs">
          <input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Minimum Amount"
            value={startValue}
            onChange={(e) => setStartValue(e.target.value)}
          />
          <input
            type="number"
            placeholder="Maximum Amount"
            value={endValue}
            onChange={(e) => setEndValue(e.target.value)}
          />
          <button className="cus-btn" onClick={handleFetchTransactions}>
            Fetch Transactions
          </button>
        </div>
      </div>
      {/* {showTable && ( */}
      <Table striped bordered hover className="transaction-table">
        {/* <table className="transaction-table"> */}
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Type</th>
            <th>Date</th>
            <th>Time</th>
            <th>From Account</th>
            <th>To Account</th>
            <th>Amount</th>
            <th>Mode</th>
          </tr>
        </thead>
        <tbody>
          {trail.map((styles, index) => (
            <animated.tr key={transactions[index].transactionId} style={styles}>
              <td>{transactions[index].transactionId}</td>
              <td>{transactions[index].transactionStatus}</td>
              <td>{transactions[index].transactionType}</td>
              <td>{transactions[index].transactionDate}</td>
              <td>{transactions[index].transactionTime}</td>
              <td>{transactions[index].fromAccountNumber}</td>
              <td>{transactions[index].toAccountNumber}</td>
              <td>{transactions[index].amount}</td>
              <td>{transactions[index].transactionMode}</td>
            </animated.tr>
          ))}
        </tbody>
        {/* </table> */}
        {/* {showGenerateButton && ( */}
        {/* )} */}
      </Table>
      <div style={{ margin: "0px auto" }}>
        <button className="btn btn-primary p-3" onClick={generateStatement}>
          Generate Statement
        </button>
      </div>
      {/* )} */}
      {/* <Table striped bordered hover className="transaction-table"> */}
      {/* <table className="transaction-table"> */}
      {/* <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Type</th>
            <th>Date</th>
            <th>Time</th>
            <th>From Account</th>
            <th>To Account</th>
            <th>Amount</th>
            <th>Mode</th>
          </tr>
        </thead>
        <tbody>
          {trail.map((styles, index) => (
            <animated.tr key={transactions[index].transactionId} style={styles}>
              <td>{transactions[index].transactionId}</td>
              <td>{transactions[index].transactionStatus}</td>
              <td>{transactions[index].transactionType}</td>
              <td>{transactions[index].transactionDate}</td>
              <td>{transactions[index].transactionTime}</td>
              <td>{transactions[index].fromAccountNumber}</td>
              <td>{transactions[index].toAccountNumber}</td>
              <td>{transactions[index].amount}</td>
              <td>{transactions[index].transactionMode}</td>
              
            </animated.tr>
            
          ))}
        </tbody> */}
      {/* </table> */}
      {/* </Table> */}
    </div>
  );
};

export default TransactionList;
