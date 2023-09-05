import React, { useEffect, useState } from "react";
import "./DepositComponent.css"; // Import your CSS file for styling
import ClerkService from "../../yogesh/service/ClerkService"; // Update the path to your service.js file

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
      console.log(response.data); // Handle the response as needed
      refreshNotActiveCustomer(); // Refresh the list after the approval
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="transaction-list-container">
      <h2 className="transaction-list-title">Customer List</h2>
      <table className="transaction-table">
        <thead>
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
                <button onClick={() => handleApproveClick(customer)}>
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UpdateStatusComponent;
