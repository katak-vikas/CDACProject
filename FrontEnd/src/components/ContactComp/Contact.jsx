import React, { useState } from "react";

import { Container, Form, Button, Card } from "react-bootstrap";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    const subject = encodeURIComponent("Contact Us Inquiry");
    const body = encodeURIComponent(
      "Hello,\n\nI would like to inquire about..."
    );
    window.location.href = `mailto:support@yourbank.com?subject=${subject}&body=${body}`;
  };
  return (
    // <Container className="my-5">
    //   <h1 className="text-center">Contact Us</h1>
    //   <Form>
    //     <Form.Group controlId="formName">
    //       <Form.Label>Your Name</Form.Label>
    //       <Form.Control
    //         type="text"
    //         placeholder="Enter your name"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //       />
    //     </Form.Group>

    //     <Form.Group controlId="formEmail">
    //       <Form.Label>Email Address</Form.Label>
    //       <Form.Control
    //         type="email"
    //         placeholder="Enter your email"
    //         value={message}
    //         onChange={(e) => setMessage(e.target.value)}
    //       />
    //     </Form.Group>

    //     <Form.Group controlId="formMessage">
    //       <Form.Label>Message</Form.Label>
    //       <Form.Control
    //         as="textarea"
    //         rows={5}
    //         placeholder="Enter your message"
    //       />
    //     </Form.Group>

    //     <Button variant="primary" type="submit" onClick={handleSendMessage}>
    //       Send Message
    //     </Button>
    //   </Form>
    // </Container>

    <Container className="my-5" id="contact" style={{ maxWidth: "1200px" }}>
      <Card className="p-4 shadow">
        <h1 className="text-center" style={{ letterSpacing: "0.1rem" }}>
          Contact Us
        </h1>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="button"
            onClick={handleSendMessage}
            style={{ marginTop: "1.1rem" }}
          >
            Send Message
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Contact;
