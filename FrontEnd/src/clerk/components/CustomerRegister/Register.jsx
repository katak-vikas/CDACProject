import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import RegisterPart2 from './RegisterPart2';
import BasicInfo from './BasicInfo';
import BeneficiaryDto from './BeneficiaryDto';
import AddressDto from './AddressDto';
import './Register.css'; 
import CustomerService from '../../service/CustomerService';
function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username:'',
    password:'',
    phoneNumber:'',
       /*Radio button for <gender></gender>
    */
     gender:'',
    /*Make adropDown of enums of customer Type and account type*/
    customerType:'',

    accountType:'',

    dateOfBirth:'',

    panCardNumber:'',

    deposite:'',
/*Aadhar card dto have one field need to think about it*/
adhaarCard:{
    adhaarCardNumber:''
},

    /* Address DTO */  
    address: {
    addressLine1:'',
    addressLine2:'',
    city:'',
    state:'',
    country:'',
    zipcode:''
    },
    /*Beneficiary DTO */
    beneficiary:{
        name:'',
        accountNumber:'',
        beneficiaryBankName:'',
        relation:''
    }
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the property is nested (contains a dot)
    if (name.includes('.')) {
      const [fieldName, nestedFieldName] = name.split('.');
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
  

/*  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 const handleBeneficiaryChange = (e) => {
    const { name, value } = e.target;

    // Split the name to get the property names and the nested beneficiary property
    const [fieldName, nestedFieldName] = name.split('.');

    setFormData((prevData) => ({
      ...prevData,
      beneficiary: {
        ...prevData.beneficiary,
        [nestedFieldName]: value,
      },
    }));
  };*/
  const handleSubmit = async () => {
    try {
      const response = await CustomerService.registerUser(formData); // Use the service function
      console.log('Registration response:', response);
      // You can display a success message or perform other actions
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error, e.g., display an error message
    }
  };

  const handleDepositChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for deposit amount to parse it as a double
    const newValue = name === 'deposite' ? parseFloat(value) : value;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
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
            {/* Render form components */}
            {/* BasicInfo */}
            {step === 1 && (
              <div className="form-box">
                <h3>Basic Information</h3>
                <BasicInfo formData={formData} handleChange={handleChange} />
              </div>
            )}
            {/* AddressDto */}
            {step === 2 && (
              <div className="form-box">
                <h3>Address Details</h3>
                <AddressDto formData={formData} handleChange={handleChange} />
              </div>
            )}
            {/* BeneficiaryDto */}
            {step === 3 && (
              <div className="form-box">
                <h3>Beneficiary Details</h3>
                <BeneficiaryDto formData={formData} handleChange={handleChange} />
              </div>
            )}
            {/* Buttons */}
            <div className="d-flex justify-content-between mt-4">
              {/* Back button */}
              <button
                className="btn btn-secondary"
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </button>
              {/* Next or Submit button */}
              {step < 3 && (
                <button className="btn btn-primary" onClick={handleNext}>
                  Next
                </button>
              )}
              {step === 3 && (
                <button className="btn btn-success" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </div>
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