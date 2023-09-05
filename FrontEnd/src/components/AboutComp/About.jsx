import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <Container id="about" className="my-5" style={{ maxWidth: "1200px" }}>
      <Card className="p-4 shadow">
        <Card.Body>
          <h1 className="text-center" style={{ letterSpacing: "0.1rem" }}>
            About Us - Bank
          </h1>
          <p className="lead text-center">
            Welcome to Bank, your trusted partner in financial success. At Bank,
            we believe in creating a brighter financial future for our customers
            through innovative solutions, personalized services, and a
            commitment to excellence.
          </p>

          <h2>Our Story</h2>
          <p>
            Founded in 1990, Bank has emerged as a beacon of stability and
            growth in the financial industry. Our journey started with a simple
            vision: to provide accessible and reliable banking services that
            empower individuals and businesses to achieve their dreams. Over the
            years, we have stayed true to our values while embracing
            technological advancements to better serve our customers.
          </p>

          <h2>Our Values</h2>
          <ul>
            <li>
              <strong>Integrity:</strong> At the heart of everything we do is
              integrity. We hold ourselves to the highest ethical standards,
              ensuring transparency, honesty, and trust in all our interactions.
            </li>
            {/* ... Other list items ... */}
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;
