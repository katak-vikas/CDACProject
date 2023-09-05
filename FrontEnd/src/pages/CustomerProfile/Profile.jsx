import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import CustomerService from "../../yogesh/axios/useSendRequest";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Profile.css";
import useSendRequest from "../../yogesh/axios/useSendRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [customer, setCustomer] = useState({});
  const [show, setShow] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const sendRequest = useSendRequest();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest.get("/customer/profile");
        setCustomer(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();

    const fetchData2 = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/customer/downloadImages",
          {
            responseType: "blob", // Set response type to 'blob'
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem(
                "jwtToken_test"
              )}`,
            },
          }
        );

        // Convert the Blob response to base64
        const reader = new FileReader();
        reader.onload = () => {
          setProfileImage(reader.result);
        };
        reader.readAsDataURL(response.data);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchData2();
  }, []);

  const handleDeleteCustomer = () => {
    const deleteData = async () => {
      try {
        const response = await sendRequest.delete("/customer/delete");
        sessionStorage.removeItem("jwtToken_test");
        console.log(response.data);
        toast.success("Account Closed!!! To Re-open contact Bank", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigateTo("/thank");
      } catch (error) {
        console.error("Error:", error);
        toast.error("something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    deleteData();
  };

  return (
    <div className="container" style={{ width: "1000px" }}>
      <div className="main-body" style={{ padding: "1.6rem" }}>
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div
              className="card profile-card"
              style={{
                boxShadow:
                  "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="card-body profile-card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={profileImage}
                    alt="profile picture"
                    className="rounded-circle"
                    width="130"
                    height="130"
                    style={{ boxShadow: "0px 0px 20px #333" }}
                  />
                  <div className="mt-3">
                    <h4>{customer?.username} </h4>
                    <p className="text-secondary mb-1">
                      {customer?.address?.addressLine1},{" "}
                      {customer?.address?.city}, {customer?.address?.state}
                    </p>
                    <p className="text-secondary mb-1">
                      Pincode : {customer?.address?.zipCode}
                    </p>
                    <p className="text-muted font-size-sm">
                      {customer?.customerType}
                    </p>
                    <button className="btn btn-primary me-2">
                      Edit Profile
                    </button>
                    <button className="btn btn-danger " onClick={handleShow}>
                      Delete Customer
                    </button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Are you sure ?</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        On deleting this account, you lost all you data
                        including all accounts and account history.
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="danger" onClick={handleDeleteCustomer}>
                          Confirm
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">First Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {customer?.firstName}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Last Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {customer?.lastName}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Gender</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {customer?.gender}
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Date of Birth</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {customer?.dateOfBirth}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {customer?.email}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Phone</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {customer?.phoneNumber}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Adhaar Card</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {customer?.adhaarCard?.adhaarCardNumber}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Pan Card</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {customer?.panCardNumber}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Beneficiary</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {customer?.beneficiary?.name} &#40;
                    {customer?.beneficiary?.relation}&#41;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
