import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./NavigationBar.css";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

const NavigationBar = () => {
  const navigateTo = useNavigate();
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary transparent-navbar"
      bg="dark"
      data-bs-theme="dark"
      fixed="top"
      style={{ backgroundColor: "#888" }}
    >
      <Container style={{ letterSpacing: "0.1rem" }}>
        <Navbar.Brand href="#">Our Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ms-auto ml-auto">
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#service">Service</Nav.Link>
            <Nav.Link href="#contact">Contact Us</Nav.Link>
            <Nav.Link href="#accordion">FAQs</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">
              Something
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
          </Nav>
          <Nav>
            <Button
              variant="outline-primary me-3"
              onClick={() => {
                navigateTo("/login");
              }}
              // style={{ backgroundColor: "#b1ddf1" }}
            >
              Sign In
            </Button>{" "}
            <Button
              variant="outline-warning"
              onClick={() => {
                navigateTo("/register");
              }}
              // style={{ backgroundColor: "#fccb06" }}
            >
              Register
            </Button>{" "}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
