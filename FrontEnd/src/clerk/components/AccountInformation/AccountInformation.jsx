import React, { useState, useEffect } from "react";
import CustomerService from "../../service/CustomerService";

const AccountInformation = () => {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    CustomerService.getAllAccounts()
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  }, []);

  return (
    <div>
      <h2>Account Information</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Account Data</th>
            </tr>
          </thead>
          <tbody>
            {accounts?.map((account, index) => (
              <tr key={index}>
                <td>{JSON.stringify(account, null, 2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountInformation;
