import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css"; // Create this CSS file for custom styling
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="dark-footer">
      <Container>
        <Row>
          <Col md={6} lg={4} className="mb-4">
            <h2>BankName</h2>
            <p>123 Main Street</p>
            <p>City, Country</p>
          </Col>
          <Col md={6} lg={8} className="mb-4">
            <ul className="footer-links" style={{ letterSpacing: "0.1rem" }}>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#service">Services</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
              <li>
                <a href="#faqs">FAQs</a>
              </li>
              {/* Add more links */}
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
