import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import BasicInfo from "./BasicInfo";
import BeneficiaryDto from "./BeneficiaryDto";
import AddressDto from "./AddressDto";
import CustomerService from "../../yogesh/service/CustomerService";
import "./Register.css";
// import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    gender: "",
    customerType: "",
    accountType: "",
    dateOfBirth: "",
    panCardNumber: "",
    deposite: "",
    adhaarCard: {
      adhaarCardNumber: "",
    },
    image: null,
    address: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    },
    beneficiary: {
      name: "",
      accountNumber: "",
      beneficiaryBankName: "",
      relation: "",
    },
  });

  const handleNext = () => {
    if (step === 1) {
      if (
        formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.username &&
        formData.password &&
        formData.phoneNumber &&
        formData.accountType &&
        formData.customerType &&
        formData.deposite &&
        formData.image
      ) {
        setStep(step + 1);
      } else {
        toast.error(
          "Please fill out all the required fields on the first page",
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    } else if (step === 2) {
      if (
        formData.address.addressLine1 &&
        formData.address.city &&
        formData.address.state &&
        formData.address.country &&
        formData.address.zipcode
      ) {
        setStep(step + 1);
      } else {
        toast.error(
          "Please fill out all the required fields on the address details page",
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    } else if (step === 3) {
      if (
        formData.beneficiary.name &&
        formData.beneficiary.accountNumber &&
        formData.beneficiary.beneficiaryBankName &&
        formData.beneficiary.relation
      ) {
        handleSubmit(); // Handle submission or any other action
      } else {
        toast.error(
          "Please fill out all the required fields on the beneficiary details page",
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Store the selected image file
      }));
    } else if (name.includes(".")) {
      const [fieldName, nestedFieldName] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: {
          ...prevData[fieldName],
          [nestedFieldName]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append(
        "registerCustomerDto",
        new Blob([JSON.stringify(formData)], { type: "application/json" })
      );
      formDataToSend.append("image", formData.image);

      const response = await CustomerService.registerUser(formDataToSend); // Use the service function
      console.log("Registration response:", response);
      toast.success("Registration successful!", {
        position: toast.POSITION.TOP_CENTER,
      });
      // You can display a success message or perform other actions
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again later.", {
        position: toast.POSITION.TOP_CENTER,
      });
      // Handle registration error, e.g., display an error message
    }

    /*try {
      const response = await axios.post(
        "http://localhost:8080/customer/register",
        formData
      );
      console.log("Registration response:", response);
      // Display a success message or perform other actions
      toast.success('Registration successful!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error("Registration error:", error);
      // Handle registration error, e.g., display an error message
      toast.error('Registration failed. Please try again later.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }*/
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center">Register</h2>
            </div>
            <div className="card-body">
              {step === 1 && (
                <div className="form-box">
                  <h3>Basic Information</h3>
                  <BasicInfo formData={formData} handleChange={handleChange} />
                  <button className="btn btn-primary" onClick={handleNext}>
                    Next
                  </button>
                </div>
              )}
              {step === 2 && (
                <div className="form-box">
                  <h3>Address Details</h3>
                  <AddressDto formData={formData} handleChange={handleChange} />
                  <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-secondary" onClick={handleBack}>
                      Back
                    </button>
                    <button className="btn btn-primary" onClick={handleNext}>
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* {step === 3 &&
                  (isLoading ? (
                    isLoading && (
                      <MDBSpinner role="status">
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner>
                    )
                  ) : (
                    <button className="btn btn-success" onClick={handleSubmit}>
                      Submit
                    </button>
                  ))} */}

              {step === 3 && (
                <div className="form-box">
                  <h3>Beneficiary Details</h3>
                  <BeneficiaryDto
                    formData={formData}
                    handleChange={handleChange}
                  />
                  <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-secondary" onClick={handleBack}>
                      Back
                    </button>
                    <button className="btn btn-success" onClick={handleNext}>
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

/*
<button className="btn btn-success" onClick={() => console.log(formData)}>
import React, { useState } from 'react';
import RegisterPart1 from './RegisterPart1';
import RegisterPart2 from './RegisterPart2';
import ClerkService from '../../service/ClerkService';

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    // Add more fields
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await ClerkService.registerUser(formData); // Use the service function
      console.log('Registration response:', response);
      // You can display a success message or perform other actions
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error, e.g., display an error message
    }
  };

  return (
    <div>
      <RegisterPart1 formData={formData} handleChange={handleChange} />
      <RegisterPart2
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default RegisterPage;
*/
