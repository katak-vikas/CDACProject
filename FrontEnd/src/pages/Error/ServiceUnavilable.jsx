import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ErrPage.css";

const ServiceUnavilable = () => {
  useEffect(() => {
    sessionStorage.removeItem("jwtToken_test");
  }, []);
  return (
    <div className="page-wrap d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block">500</span>
            <div className="mb-4 lead">
              Our Server is under maintainence.
              <br /> Sorry for inconvience.
            </div>
            <NavLink to="/" className="btn btn-link">
              Back to Home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceUnavilable;
