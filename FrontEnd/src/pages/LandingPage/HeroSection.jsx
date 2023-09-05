import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HeroSection.css"; // You can define your own styles in a separate CSS file
import heroImg from "./heroPage.jpg";
import { TypeAnimation } from "react-type-animation";
import { scroller } from "react-scroll";

const HeroSection = () => {
  const scrollToSection = () => {
    scroller.scrollTo("service", {
      smooth: true,
      duration: 300,
    });
  };

  return (
    <div
      className="hero-section d-flex align-items-center justify-content-center"
      // style={{ marginBottom: "3rem" }}
    >
      <Container>
        <Row>
          <Col md={6} className="hero-content text-center align-self-center ">
            <h1
              className="display-1"
              style={{ fontSize: "2rem", textAlign: "left" }}
            >
              {/* We Welcome */}
              {/* <TypeAnimation
                sequence={["Welcome", 1000, ""]}
                speed={50}
                repeat={Infinity}
                style={{ color: "#222" }}
              /> */}
            </h1>
            <h4 className="display-4 text-muted " style={{ textAlign: "left" }}>
              <TypeAnimation
                sequence={[
                  "Welcome to",
                  2200,
                  "",
                  "Our Bank",
                  2200,
                  "",
                  "We Are",
                  2200,
                  "",
                  "Safe",
                  3000,
                  "",
                  "Simple",
                  3000,
                  "",
                  "Secure",
                  3000,
                  " ",
                ]}
                speed={40}
                repeat={Infinity}
                style={{ color: "#ff735c" }}
              />
            </h4>
            <Button
              variant="none"
              className="btn-lg hero-cus-btn"
              onClick={scrollToSection}
            >
              Explore
            </Button>
          </Col>
          <Col md={6} className="hero-image">
            <img src={heroImg} alt="Hero" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;
