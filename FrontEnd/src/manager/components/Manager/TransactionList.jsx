import React, { useState, useEffect } from "react";
import { useTrail, animated } from "react-spring";
import "./TransactionList.css"; // Import the CSS file for styling
import ManagerService from "../../service/ManagerService";
import { Pagination, Table } from "react-bootstrap";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(""); // Add selected status state

  // const itemsPerPage = 5; // Number of items to show per page
  // const [currentPage, setCurrentPage] = useState(1);

  // const totalItems = transactions.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  useEffect(() => {
    setLoading(true);
    ManagerService.getAllTransactions()
      .then((response) => {
        setTransactions(response.data);
        setFilteredTransactions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      });
  }, []);

  const handleFilter = (event) => {
    const { value } = event.target;
    setSelectedStatus(value); // Update selected status state
    filterTransactions(value);
  };

  const filterTransactions = (status) => {
    const filtered = transactions.filter((transaction) =>
      transaction.transactionStatus.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const statusOptions = ["All", "PENDING", "COMPLETED", "FAILED", "CANCELED"];

  const trail = useTrail(filteredTransactions.length, {
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { mass: 1, tension: 500, friction: 40 },
  });

  return (
    <div className="manager-transaction-list-container">
      <h2
        className="manager-transaction-list-title"
        style={{ fontWeight: "600", letterSpacing: "0.08rem" }}
      >
        Transaction List
      </h2>
      <div className="manager-filter-container">
        <label htmlFor="status-select">Filter by status:</label>
        <select
          id="status-select"
          value={selectedStatus}
          onChange={handleFilter}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        // <table className="transaction-table table table-dark table-striped-columns">
        <Table striped border hover style={{ boxShadow: "0px 0px 20px #888" }}>
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
              <animated.tr
                key={filteredTransactions[index].transactionId}
                style={styles}
              >
                <td>{filteredTransactions[index].transactionId}</td>
                <td>{filteredTransactions[index].transactionStatus}</td>
                <td>{filteredTransactions[index].transactionType}</td>
                <td>{filteredTransactions[index].transactionDate}</td>
                <td>{filteredTransactions[index].transactionTime}</td>
                <td>{filteredTransactions[index].fromAccount}</td>
                <td>{filteredTransactions[index].toAccount}</td>
                <td>{filteredTransactions[index].amount}</td>
                <td>{filteredTransactions[index].transactionMode}</td>
              </animated.tr>
            ))}
          </tbody>
        </Table>
      )}
      {/* <Pagination>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination> */}
    </div>
  );
};

export default TransactionList;
