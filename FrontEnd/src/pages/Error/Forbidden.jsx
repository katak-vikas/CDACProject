import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ErrPage.css";

const Forbidden = () => {
  return (
    <div className="page-wrap d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 d-flex flex-column text-center">
            <span className="display-1 d-block">403</span>
            <div className="mb-4 lead" style={{ fontWeight: 600 }}>
              Unauthorized Access
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

export default Forbidden;
