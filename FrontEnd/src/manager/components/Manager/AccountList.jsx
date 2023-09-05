import React, { useState, useEffect } from "react";
import { useTrail, animated } from "react-spring";
import "./AccountList.css";
import ManagerService from "../../service/ManagerService";
import { Table } from "react-bootstrap";

const AccountList = () => {
  const [selectedAccountStatus, setSelectedAccountStatus] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    ManagerService.getAllAccounts()
      .then((response) => {
        setAccounts(response.data);
        setFilteredAccounts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   filterAccounts(selectedAccountType, selectedAccountStatus);
  // }, [selectedAccountType, selectedAccountStatus]);

  useEffect(() => {
    filterAccounts(selectedAccountType, selectedAccountStatus);
  }, []);

  const filterAccounts = (type, status) => {
    const filtered = accounts.filter((account) => {
      const statusMatch = status === "" || account.accountStatus === status;
      const typeMatch = type === "" || account.accountType === type;
      return statusMatch && typeMatch;
    });

    setFilteredAccounts(filtered);
  };

  const handleAccountStatusSelect = (event) => {
    setSelectedAccountStatus(event.target.value);
    filterAccounts(selectedAccountType, event.target.value);
  };

  const handleAccountTypeSelect = (event) => {
    setSelectedAccountType(event.target.value);
    filterAccounts(event.target.value, selectedAccountStatus);
  };

  const handleFilterButtonClick = () => {
    const filteredAccounts = filterAccounts();
    setFilteredAccounts(filteredAccounts);
  };

  const statusOptions = [
    "All",
    "PENDING_APPROVAL",
    "ACTIVE",
    "INACTIVE",
    "CLOSED",
    "BLOCKED",
  ];
  const typeOptions = ["All", "SAVING", "CURRENT", "FIXED_DEPOSIT"];

  const trail = useTrail(filteredAccounts.length, {
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { mass: 1, tension: 500, friction: 40 },
  });

  return (
    <div className="manage-transaction-list-container">
      <h2 className="manage-transaction-list-title">Account List</h2>
      <div className="filters-container">
        <div className="manage-account-select">
          <div
            style={{ display: "flex", gap: "1.2rem", alignItems: "baseline" }}
          >
            <label htmlFor="accountStatusSelect">Select Account Status: </label>
            <select
              id="accountStatusSelect"
              value={selectedAccountStatus}
              onChange={handleAccountStatusSelect}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{ display: "flex", gap: "1.2rem", alignItems: "baseline" }}
          >
            <label htmlFor="accountTypeSelect">Select Account Type: </label>
            <select
              id="accountTypeSelect"
              value={selectedAccountType}
              onChange={handleAccountTypeSelect}
            >
              {typeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* ... (other filter inputs) */}
      </div>
      <Table striped border hover style={{ boxShadow: "0px 0px 20px #888" }}>
        <thead className="table-dark">
          <tr>
            <th>Account Number</th>
            <th>Balance</th>
            <th>Open Date</th>
            <th>Account Status</th>
            <th>Account Type</th>
            {/* <th>To Account</th>
            <th>Amount</th>
            <th>Mode</th> */}
          </tr>
        </thead>
        <tbody>
          {trail.map((styles, index) => (
            <animated.tr
              key={filteredAccounts[index].accountNumber}
              style={styles}
            >
              <td>{filteredAccounts[index].accountNumber}</td>
              <td>{filteredAccounts[index].balance}</td>
              <td>{filteredAccounts[index].openDate}</td>
              <td>{filteredAccounts[index].accountStatus}</td>
              <td>{filteredAccounts[index].accountType}</td>
            </animated.tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AccountList;
