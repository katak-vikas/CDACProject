import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const ResetPasswordModal = ({ props }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("in reset password window");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/urvi/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  const handleSendOTP = async () => {
    try {
      console.log(email);
      const response = await axios.post(
        `http://localhost:8080/urvi/forgot-password/${email}`
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={handleSendOTP}>
            Send OTP
          </Button>
          <Form.Group controlId="otp">
            <Form.Label>OTP</Form.Label>
            <Form.Control
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Reset Password
          </Button>
        </Form>
        <p className="mt-3">{message}</p>
      </Modal.Body>
    </Modal>
  );
};

export default ResetPasswordModal;
