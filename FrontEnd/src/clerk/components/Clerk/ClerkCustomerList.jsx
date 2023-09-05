import React, { useEffect, useState } from "react";
import ClerkService from "../../service/ClerkService";
import "./ClerkCustomerList.css";
import { Table } from "react-bootstrap";

const ClerkCustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customer details using ClerkService
    ClerkService.getAllCustomers()
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  }, []); // Empty dependency array for componentDidMount behavior

  return (
    <div className="clrkcus-transaction-list-container">
      <h2 className="clrkcus-transaction-list-title">Customer List</h2>
      <Table striped border hover style={{ boxShadow: "0px 0px 20px #888" }}>
        <thead className="table-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.email}</td>
              <td>{customer.username}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ClerkCustomerList;
