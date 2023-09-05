import React from 'react';
import './BasicInfo.css'; // Import your custom CSS file

function BasicInfo({ formData, handleChange }) {
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
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control"
          placeholder="Choose a password"
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group">
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your phone number"
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
        <label>PAN Card Number:</label>
        <input
          type="text"
          name="panCardNumber"
          value={formData.panCardNumber}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your PAN card number"
        />
      </div>
      <div className="form-group">
        <label>Aadhar Card Number:</label>
        <input
          type="text"
          name="adhaarCard.adhaarCardNumber"
          value={formData.adhaarCard.adhaarCardNumber}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your Aadhar card number"
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
        />
      </div>
    </div>
  );
}

export default BasicInfo;
