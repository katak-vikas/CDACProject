import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Error/ErrPage.css";

const Thank = () => {
  const navigateTo = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigateTo("/");
    }, 4000);
  }, []);
  return (
    <div className="page-wrap d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 d-flex flex-column text-center">
            <span className="display-1 d-block">Thank You 😊</span>
            <div className="mb-4 lead" style={{ fontWeight: 600 }}>
              Hope To See You Soon!!!
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

export default Thank;
