import React from "react";
import { faqData } from "../../data/siteData";
import { Accordion, Card, Container } from "react-bootstrap";

const MyAccordion = () => {
  return (
    <>
      <Container
        id="accordion"
        style={{
          maxWidth: "1200px",
          marginBottom: "7rem",
        }}
      >
        <h1
          className="text-center display-1"
          style={{ letterSpacing: "0.1rem" }}
        >
          FAQs
        </h1>
        <Accordion
          defaultActiveKey="0"
          flush
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0px 8px 20px #888",
          }}
        >
          {faqData.map((data, index) => {
            return (
              <Accordion.Item
                eventKey={index}
                key={data.title}
                style={{ marginBottom: "1.1rem" }}
              >
                <Accordion.Header>{data.title}</Accordion.Header>
                <Accordion.Body>{data.description}</Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Container>
    </>
  );
};

export default MyAccordion;
