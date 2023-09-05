import React, { useEffect } from "react";
// import { Button } from "react-bootstrap";
import Accordion from "../../components/FaqComp/MyAccordion";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import NavigationBar from "../../components/NavbarComp/NavigationBar";
import Service from "../../components/ServiceComp/Service";
import About from "../../components/AboutComp/About";
import Contact from "../../components/ContactComp/Contact";
import Footer from "../../components/FooterComp/Footer";

const LandNew = () => {
  // const navigateTo = useNavigate();
  useEffect(() => {
    sessionStorage.removeItem("jwtToken_test");
  }, []);

  return (
    <>
      <NavigationBar />
      <HeroSection />
      <Service />
      <About />
      <Contact />
      <Accordion />
      <Footer />
    </>
  );
};

export default LandNew;
