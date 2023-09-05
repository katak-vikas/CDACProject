import React from 'react';
import './BasicInfo.css'; // Import your custom CSS file
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function BasicInfo({ formData, handleChange }) {

  const validateEmail = (event) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const email = event.target.value;
    if (!email) {
      toast.error("Please enter your email",
      {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }

    if (!emailPattern.test(email)) {

      toast.error("Invalid email format ",{
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }

    return true;
  };
  const validateAdhaarCardNumber = (event) => {
    const adhaarCardNumber = event.target.value;
    if (adhaarCardNumber.length !== 12) {
      toast.error("Aadhar Card number must be 12 digits",
      {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }
    return true;
  };
  const validatePhoneNumber = (event) => {
    const phoneNumber = event.target.value;
    if (phoneNumber.length !== 10) {
      toast.error("Phone number must be 10 digits",
      {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }
    return true;
  };
  const validatePancard = (event) => {
    const panCardNumber = event.target.value;
    
    if (panCardNumber.length !== 10) {
      toast.error("PAN Card number must be 10 characters",
      {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }
    return true;
  };
  
  const validatePassword = (event) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const password = event.target.value;
    if (!password) {
      toast.error("Please enter your password",
      {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }
    // if(password.trim === ""){
    //   toast.error("Please Do Not Give The Space In Between Your Password",{
    //   position : toast.POSITION.TOP_CENTER
    //   });
    // }

    if (!passwordPattern.test(password)) {
      toast.error("Password must have at least 8 characters, including 1 capital letter and 1 digit",
      {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }

    return true;
  };
  const handleKeyPress = (event) => {
    if (event.key === ' ') {
      event.preventDefault();
      toast.error('Spaces are not allowed', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="basic-info-container">
      <h2>Register - Part 1</h2>
      <div className="form-group">
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your first name"
        />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your last name"
        />
      </div>
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-control"
          placeholder="Choose a username"
          onKeyPress={handleKeyPress}

        />
      </div>
      <div className="form-group">
      <label >Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={validateEmail}
            maxLength={30}
            onInput={(e) => {
            if (e.target.value.length > 30) {
            e.target.value = e.target.value.slice(0, 30);
          }
          }}
          onKeyPress={handleKeyPress}
          />
      </div>
      <div className="form-group">
      <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={validatePassword}
        />
      </div>
      <div className="form-group">
        <label>Phone Number:</label>
        <input
          type="number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your phone number"
          onBlur={validatePhoneNumber}
          maxLength={10}
          onInput={(e) => {
          if (e.target.value.length > 10) {
          e.target.value = e.target.value.slice(0, 10);
         }
        }}
        onKeyPress={handleKeyPress}
        />
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <div>
          <label className="radio-label">
            <input
              type="radio"
              name="gender"
              value="MALE"
              checked={formData.gender === 'MALE'}
              onChange={handleChange}
            />{' '}
            Male
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="gender"
              value="FEMALE"
              checked={formData.gender === 'FEMALE'}
              onChange={handleChange}
            />{' '}
            Female
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Customer Type:</label>
        <select
          name="customerType"
          value={formData.customerType}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Select Customer Type</option>
          <option value="STUDENT">Student</option>
          <option value="NRI">NRI</option>
          <option value="SENIOR_CITIZEN">Senior Citizen</option>
          <option value="GENERAL">General</option>
        </select>
      </div>
      <div className="form-group">
        <label>Account Type:</label>
        <select
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Select Account Type</option>
          <option value="SAVING">Saving</option>
          <option value="CURRENT">Current</option>
          {/* Add more options */}
        </select>
      </div>
      <div className="form-group">
        <label>PAN Card Number:</label>
        <input
          type="text"
          name="panCardNumber"
          value={formData.panCardNumber}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your PAN card number"
          onBlur={validatePancard}
          maxLength={10}
          onInput={(e) => {
          if (e.target.value.length > 10) {
          e.target.value = e.target.value.slice(0, 10);
         }
        }}
        onKeyPress={handleKeyPress}
        />
      </div>
      <div className="form-group">
        <label>Aadhar Card Number:</label>
        <input
          type="number"
          name="adhaarCard.adhaarCardNumber"
          value={formData.adhaarCard.adhaarCardNumber}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your Aadhar card number"
          onBlur={validateAdhaarCardNumber}
          maxLength={12}
          onInput={(e) => {
          if (e.target.value.length > 12) {
          e.target.value = e.target.value.slice(0, 12);
         }
        }}
        onKeyPress={handleKeyPress}
        />
      </div>
      <div className="form-group">
        <label>Upload Profile Picture:</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Deposit Amount:</label>
        <input
          type="number"
          name="deposite"
          value={formData.deposite}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter deposit amount"
           onKeyPress={handleKeyPress}
        />
      </div>
     
    </div>
  );
}

export default BasicInfo;
