import React, { useEffect, useState } from "react";
// import "./DepositComponent.css"; // Import your CSS file for styling
import ClerkService from "../../service/ClerkService"; // Update the path to your service.js file
import TransactionList from "../TransactionList/TransactionList.css";
import "./UpdateStatusComponent.css";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";

function UpdateStatusComponent() {
  const [customerNotUpdatedStatus, setcustomerNotUpdatedStatus] = useState([]);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch account details using ClerkService
    ClerkService.getNotActiveCustomers()
      .then((response) => {
        setcustomerNotUpdatedStatus(response.data);
      })
      .catch((error) => {
        console.error("Error fetching account details:", error);
      });
    refreshNotActiveCustomer();
  }, []);

  const refreshNotActiveCustomer = () => {
    ClerkService.getNotActiveCustomers()
      .then((response) => {
        setcustomerNotUpdatedStatus(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clerk transactions", error);
      });
  };

  const handleApproveClick = async (customer) => {
    try {
      const response = await ClerkService.updateCustomerStatus(
        customer.username
      );
      refreshNotActiveCustomer();
      toast.success("Approved!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.success("Something Went Wrong!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="status-transaction-list-container">
      <h2 className="status-transaction-list-title">Customer List</h2>
      <Table striped border hover style={{ boxShadow: "0px 0px 20px #888" }}>
        <thead className="table-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customerNotUpdatedStatus.map((customer, index) => (
            <tr key={index}>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.email}</td>
              <td>{customer.username}</td>
              <td>
                <button
                  className="status-approve-btn btn btn-primary"
                  onClick={() => handleApproveClick(customer)}
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
}

export default UpdateStatusComponent;
