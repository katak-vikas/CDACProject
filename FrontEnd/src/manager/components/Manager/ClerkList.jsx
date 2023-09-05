import React, { useState, useEffect } from "react";
import { useTrail, animated } from "react-spring";
import ManagerService from "../../service/ManagerService";
import { Table } from "react-bootstrap";

const ClerkList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    ManagerService.getAllClerks()
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
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f6f9",
        borderRadius: "8px",
      }}
    >
      <h3
        className="manager-clerk-table"
        style={{
          textAlign: "center",
          letterSpacing: "0.2rem",
          marginBottom: "1.2rem",
          fontWeight: "600",
        }}
      >
        Clerk List
      </h3>
      <Table striped border hover style={{ boxShadow: "0px 0px 20px #888" }}>
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Salary</th>
            <th scope="col">Join Date</th>
          </tr>
        </thead>
        <tbody>
          {trail.map((styles, index) => (
            <animated.tr key={customers[index].emailId} style={styles}>
              <th scope="row">{index + 1}</th>
              <td>{customers[index].firstName}</td>
              <td>{customers[index].lastName}</td>
              <td>{customers[index].emailId}</td>
              <td>{customers[index].salary}</td>
              <td>{customers[index].joinDate}</td>
            </animated.tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ClerkList;
