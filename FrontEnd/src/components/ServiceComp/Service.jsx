import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { serviceCardData } from "../../data/siteData";

const Service = () => {
  return (
    <>
      <h1
        className="display-1 text-center mt-3 mb-4"
        style={{ letterSpacing: "0.1rem" }}
        id="service"
      >
        Service
      </h1>
      <Container>
        <Row>
          {serviceCardData.map((card, index) => (
            <Col md={4} key={index}>
              <Card
                style={{
                  width: "18rem",
                  boxShadow: "0px 0px 20px #777",
                  marginBottom: "1.8rem",
                }}
              >
                <Card.Img variant="top" src={card.imageUrl} alt={card.title} />
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.description}</Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Service;
