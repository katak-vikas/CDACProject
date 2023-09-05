import React, { useEffect, useState } from "react";
import ClerkService from "../../yogesh/service/ClerkService";
import useSendRequest2 from "../../yogesh/axios/useSendRequest2";

const ClerkCustomerList = () => {
  const [customers, setCustomers] = useState([]);

  const sendRequest = useSendRequest2();

  useEffect(() => {
    // Fetch customer details using ClerkService
    // ClerkService.getAllCustomers()
    //   .then((response) => {
    //     setCustomers(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching customer details:", error);
    //   });

    const fetchCustomers = async () => {
      try {
        const response = await sendRequest.get("/clerk/customers");
        console.log("inside fetchCustomers :" + response);
        setCustomers(response.data);
        // if (response.data.length > 0) {
        //   setAccounts(response.data[0]);
        // }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCustomers();
  }, []); // Empty dependency array for componentDidMount behavior

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
      </table>
    </div>
  );
};

export default ClerkCustomerList;
