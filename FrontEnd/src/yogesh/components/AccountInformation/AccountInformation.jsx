import React, { useState, useEffect } from "react";
import useSendRequest from "../../axios/useSendRequest";
import "./AccountInformation.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AccountInformation = () => {
  const sendRequest = useSendRequest();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newAccountData, setNewAccountData] = useState({
    accountType: "",
    deposite: 0,
  });
  const [showModalCreated, setShowModalCreated] = useState(false);
  const [createdAccountNumber, setCreatedAccountNumber] = useState(null);

  const navigateTo = useNavigate();

  const accountTypes = [
    "SAVING",
    "CURRENT",
    "FIXED_DEPOSIT",
    "RECURRING_DEPOSIT",
    "TRADING",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest.get("/customer/accounts");
        setAccounts(response.data);
        if (response.data.length > 0) {
          setSelectedAccount(response.data[0]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const handleAccountChange = (event) => {
    const selectedAccountNumber = event.target.value;
    const selectedAccount = accounts.find(
      (account) => account.accountNumber === selectedAccountNumber
    );
    setSelectedAccount(selectedAccount);
  };

  const handleNewAccountDataChange = (event) => {
    const { name, value } = event.target;
    setNewAccountData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const redirectToSamePage = () => {
    setShowModalCreated(false);
    <Link to="/profile" />;
  };

  const handleCreateAccount = () => {
    setShowModal(false);
    setShowModalCreated(true);

    const fetchData = async () => {
      try {
        const response = await sendRequest.post(
          "/customer/newAccount",
          newAccountData
        );
        setCreatedAccountNumber(response.data.accountNumber);
        toast.success(`Account Created Successfully`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        toast.error(`${error.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    fetchData();
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    // navigateTo("/profile");
    toast.success(`Account ${selectedAccount.accountNumber} is closed`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    setShowModal(false);

    const deleteData = async () => {
      try {
        const response = await sendRequest.delete(
          `/account/${selectedAccount.accountNumber}`
        );
        toast.success(`${selectedAccount.accountNumber} Deleted`, {
          autoClose: 3000,
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong!!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    deleteData();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h2 style={{ textAlign: "center", margin: "1rem auto" }}>
            Account Number
          </h2>

          <select
            className="form-select"
            value={selectedAccount ? selectedAccount.accountNumber : ""}
            onChange={handleAccountChange}
            style={{ marginLeft: "2rem auto" }}
          >
            {accounts.map((account, index) => (
              <option key={index} value={account.accountNumber}>
                {account.accountNumber}
              </option>
            ))}
          </select>
          <div style={{ marginTop: "1.2rem", marginBottom: "1.2rem" }}>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Create New Account
            </button>
          </div>
        </div>
        <div className="col-md-8">
          {selectedAccount && (
            <div>
              <div className="account-container">
                <h2>Account Balance</h2>
                <p className="balance">{selectedAccount.balance}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="account-details">
            <Table striped bordered hover>
              <thead className="table-dark">
                <tr>
                  <th>Open Date</th>
                  <th>Account Status</th>
                  <th>Account Type</th>
                  <th>Last Update Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedAccount?.openDate}</td>
                  <td>{selectedAccount?.accountStatus}</td>
                  <td>{selectedAccount?.accountType}</td>
                  <td>{selectedAccount?.lastUpdateDate}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Account Type</label>
              <select
                className="form-select"
                name="accountType"
                value={newAccountData.accountType}
                onChange={handleNewAccountDataChange}
              >
                <option value="">Select Account Type</option>
                {accountTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Deposit</label>
              <input
                type="number"
                className="form-control"
                name="deposite"
                value={newAccountData.deposite}
                onChange={handleNewAccountDataChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleCreateAccount}>
            Create
          </button>
        </Modal.Footer>
      </Modal>

      <div className="create-new-account">
        <button
          className="btn btn-danger"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Account
        </button>
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the account?</Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleDeleteAccount}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalCreated} onHide={() => setShowModalCreated(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Account Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Account Created with Account Number :{" "}
          <strong>{createdAccountNumber}</strong>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            style={{ margin: "2px auto" }}
            onClick={redirectToSamePage}
          >
            Okay
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccountInformation;
