import React, { useState } from "react";
import { useTrail, animated } from "react-spring";
import "./CustomerList.css"; // Import the CSS file for styling
import { useEffect } from "react";
import ManagerService from "../../service/ManagerService";
import { Table } from "react-bootstrap";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    ManagerService.getAllCustomers()
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  }, []);
  const trail = useTrail(customers.length, {
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { mass: 1, tension: 500, friction: 40 },
  });

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleBackClick = () => {
    setSelectedCustomer(null);
  };

  return (
    <div className="manager-customer-list-container">
      {selectedCustomer ? (
        <div className="manager-customer-details-container container">
          <h2
            className="mb-4"
            style={{
              fontWeight: "600",
              letterSpacing: "0.2rem",
              textDecoration: "underline",
            }}
          >
            Customer Details
          </h2>
          <div className="row">
            <div className="col-md-4">
              <p>
                <strong>First Name:</strong> {selectedCustomer.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {selectedCustomer.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedCustomer.email}
              </p>
              <p>
                <strong>Username:</strong> {selectedCustomer.username}
              </p>
              <p>
                <strong>Customer Type:</strong> {selectedCustomer.customerType}
              </p>
              <p>
                <strong>Phone Number:</strong> {selectedCustomer.phoneNumber}
              </p>
              <p>
                <strong>Date of Birth:</strong> {selectedCustomer.dateOfBirth}
              </p>
              <p>
                <strong>Gender:</strong> {selectedCustomer.gender}
              </p>
            </div>
            <div className="col-md-8">
              <p>
                <strong>Accounts:</strong>
                <ul>
                  {selectedCustomer.accounts.map((account) => (
                    <li key={account.accountNumber}>
                      {account.accountNumber} : {account.accountType}
                    </li>
                  ))}
                </ul>
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {selectedCustomer.address.addressLine1},
                {selectedCustomer.address.addressLine2},{" "}
                {selectedCustomer.address.city},{selectedCustomer.address.state}
                , {selectedCustomer.address.country},
                {selectedCustomer.address.zipCode}
              </p>

              <p>
                <strong>Adhaar Card Number:</strong>{" "}
                {selectedCustomer.adhaarCard.adhaarCardNumber}
              </p>
              <p>
                <strong>PAN Card Number:</strong>{" "}
                {selectedCustomer.panCardNumber}
              </p>
              <p>
                <strong>Beneficiary Name:</strong>{" "}
                {selectedCustomer.beneficiary.name}
              </p>
              <p>
                <strong>Beneficiary Account Number:</strong>{" "}
                {selectedCustomer.beneficiary.accountNumber}
              </p>
              <p>
                <strong>Beneficiary Bank Name:</strong>{" "}
                {selectedCustomer.beneficiary.beneficiaryBankName}
              </p>
              <p>
                <strong>Relation to Beneficiary:</strong>{" "}
                {selectedCustomer.beneficiary.relation}
              </p>
            </div>
          </div>
          <button
            className="btn btn-primary manager-btn-back"
            // style={{ margin: "1px auto" }}
            onClick={handleBackClick}
          >
            Back to List
          </button>
        </div>
      ) : (
        <>
          <h3
            style={{
              fontWeight: "600 ",
              marginBottom: "1.4rem",
              textAlign: "center",
              letterSpacing: "0.2rem",
            }}
          >
            Customer List
          </h3>
          <Table
            striped
            border
            hover
            style={{ boxShadow: "0px 0px 20px #888" }}
          >
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Username</th>
                <th scope="col">Customer Type</th>
                <th scope="col">Customer Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trail.map((styles, index) => (
                <animated.tr key={customers[index].email} style={styles}>
                  <th scope="row">{index + 1}</th>
                  <td>{customers[index].firstName}</td>
                  <td>{customers[index].lastName}</td>
                  <td>{customers[index].email}</td>
                  <td>{customers[index].username}</td>
                  <td>{customers[index].customerType}</td>
                  <td>{customers[index].customerStatus}</td>
                  <td>
                    <button
                      className="view-detail-btn btn btn-primary"
                      onClick={() => handleCustomerClick(customers[index])}
                    >
                      View Details
                    </button>
                  </td>
                </animated.tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default CustomerList;
