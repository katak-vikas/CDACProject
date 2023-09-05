// import React, { useState } from "react";
// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./Login.css";
// import { Link, useNavigate } from "react-router-dom";
// import { getJwtToken } from "../../services/LoginService";
// import axios from "axios";
// import { toast } from "react-toastify";
// // import "../../../node_modules/react-toastify/dist/react-toastify";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   // const [token, setToken] = useState("");

//   const [usernameError, setUsernameError] = useState(" ");
//   const [passwordError, setPasswordError] = useState(" ");

//   const navigateTo = useNavigate();

//   const handleLogin = async () => {
//     // Your authentication logic here
//     setUsernameError("");
//     setPasswordError("");

//     if (username.trim() === "") {
//       setUsernameError("Username is required");
//       return;
//     }

//     const minLength = 8;
//     const containsUpperCase = /[A-Z]/;
//     const containsLowerCase = /[a-z]/;
//     const containsDigit = /[0-9]/;
//     const containsSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

//     if (password.length < minLength) {
//       setPasswordError("Password must be at least 8 characters");
//       return;
//     }

//     if (!containsUpperCase.test(password)) {
//       setPasswordError("Password must contain at least one uppercase letter");
//       return;
//     }

//     if (!containsLowerCase.test(password)) {
//       setPasswordError("Password must contain at least one lowercase letter");
//       return;
//     }

//     if (!containsDigit.test(password)) {
//       setPasswordError("Password must contain at least one digit");
//       return;
//     }

//     if (!containsSpecialChar.test(password)) {
//       setPasswordError("Password must contain at least one special character");
//       return;
//     }

//     if (password.trim() === "") {
//       setPasswordError("Password is required");
//       return;
//     }

//     const jwtToken = await getJwtToken(username, password);
//     console.log("jwtToken : " + jwtToken);
//     if (jwtToken) {
//       // setToken(jwtToken);
//       // console.log(token);
//       // You might want to store the token in local storage or a secure cookie
//       // To set the token
//       sessionStorage.setItem("jwtToken_test", jwtToken);
//       console.log("Token saved " + sessionStorage.getItem("jwtToken_test"));
//       // To get the token
//       const jwtToken = sessionStorage.getItem("jwtToken_test");

//       //AUTOMATICALLY SEND JWT TOKEN
//       const BASE_URL = "http://localhost:8080";
//       const instance = axios.create({
//         baseURL: BASE_URL, // Set your API base URL
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${jwtToken}`, // Include the token in the headers
//         },
//       });

//       //SEND ANOTHER REQUEST
//       instance
//         .get("/customer/profile")
//         .then((response) => {
//           // Handle successful response
//           console.log("Response:", response.data);
//           // navigateTo("/contact");
//         })
//         .catch((error) => {
//           // Handle error
//           console.error("Error:", error.response.data.message);
//           const errMsg = error.response.data.message;
//           // navigate("/home");
//           toast.error(errMsg, {
//             position: toast.POSITION.TOP_RIGHT,
//           });
//         });
//     }
//     // navigateTo("/home3");
//   };

//   // const loginHandler = () => {
//   //   console.log("Inside login");
//   // };
//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-sm-6 col-md-7 intro-section">
//           <div className="brand-wrapper">
//             <h1>
//               <Link to="/">Urvi</Link>
//             </h1>
//           </div>
//         </div>
//         <div className="col-sm-6 col-md-5 form-section">
//           <div className="login-wrapper">
//             <h2 className="login-title">Sign in</h2>
//             <form action="#">
//               <div className="form-group">
//                 {/* <label for="email" className="sr-only">
//                   Username
//                 </label> */}
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   className="form-control"
//                   placeholder="Username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <div className="error">{usernameError}</div>
//                 {/* {usernameError && <div className="error">{usernameError}</div>} */}
//                 {/* {usernameError && setVisibility("visible")} */}
//               </div>
//               <div className="form-group mb-3">
//                 {/* <label for="password" className="sr-only">
//                   Password
//                 </label> */}
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   className="form-control"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <div className="error">{passwordError}</div>
//                 {/* // {passwordError && <div className="error">{passwordError}</div>} */}
//               </div>
//               <div className="d-flex justify-content-between align-items-center mb-5">
//                 {/* <input
//                   name="login"
//                   id="login"
//                   className="btn login-btn"
//                   type="button"
//                   value="Login"
//                 />

//                 <Link to="#!" className="forgot-password-link">
//                   Forgot Password?
//                 </Link> */}

//                 <div>
//                   <button
//                     type="button"
//                     className="btn login-btn  me-4"
//                     onClick={handleLogin}
//                   >
//                     Login
//                   </button>
//                 </div>
//               </div>
//             </form>
//             <p className="login-wrapper-footer-text">
//               Need an account?{" "}
//               <Link to="/about" className="text-reset text-primary">
//                 Signup here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { getResponseData } from "../../services/LoginService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
// import "../../../node_modules/react-toastify/dist/react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(" ");
  const [passwordError, setPasswordError] = useState(" ");

  // const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    sessionStorage.removeItem("jwtToken_test");
  }, []);

  const navigateTo = useNavigate();

  const handleLogin = async () => {
    // Your authentication logic here
    setUsernameError("");
    setPasswordError("");

    if (username.trim() === "") {
      setUsernameError("Username is required");
      return;
    }

    const minLength = 8;
    const containsUpperCase = /[A-Z]/;
    const containsLowerCase = /[a-z]/;
    const containsDigit = /[0-9]/;
    const containsSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    if (password.length < minLength) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    if (!containsUpperCase.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return;
    }

    if (!containsLowerCase.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return;
    }

    if (!containsDigit.test(password)) {
      setPasswordError("Password must contain at least one digit");
      return;
    }

    // if (!containsSpecialChar.test(password)) {
    //   setPasswordError("Password must contain at least one special character");
    //   return;
    // }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      return;
    }

    const responseData = await getResponseData(username, password);
    console.log(responseData);
    if (responseData) {
      const jwtToken = responseData.token;
      console.log("jwtToken : " + responseData.token);
      const role = responseData.role;

      if (jwtToken) {
        sessionStorage.setItem("jwtToken_test", jwtToken);
        console.log("Token saved " + sessionStorage.getItem("jwtToken_test"));

        if (role === "ROLE_CUSTOMER") navigateTo("/profile");
        if (role === "ROLE_MANAGER") navigateTo("/managerdashboard");
        if (role === "ROLE_CLERK") navigateTo("/clerkdashboard");
      }
    }
  };

  // const loginHandler = () => {
  //   console.log("Inside login");
  // };

  // const forgotPasswordPopup = (props) => {
  //   return (
  //     <Modal
  //       {...props}
  //       size="lg"
  //       aria-labelledby="contained-modal-title-vcenter"
  //       centered
  //     >
  //       <Modal.Header closeButton>
  //         <Modal.Title id="contained-modal-title-vcenter">
  //           Forgot Password
  //         </Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <div class="mb-3 row">
  //           <label for="staticEmail" class="col-sm-2 col-form-label">
  //             Email
  //           </label>
  //           <div class="col-sm-10">
  //             <input
  //               type="text"
  //               readonly
  //               class="form-control-plaintext"
  //               id="staticEmail"
  //               value="email@example.com"
  //             />
  //           </div>
  //         </div>
  //         <div class="mb-3 row">
  //           <label for="inputPassword" class="col-sm-2 col-form-label">
  //             Password
  //           </label>
  //           <div class="col-sm-10">
  //             <input type="password" class="form-control" id="inputPassword" />
  //           </div>
  //         </div>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button onClick={props.onHide}>Close</Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6 col-md-7 intro-section">
          <div className="brand-wrapper">
            <h1>
              <Link to="/">Our Bank</Link>
            </h1>
          </div>
        </div>
        <div className="col-sm-6 col-md-5 form-section">
          <div className="login-wrapper">
            <h2 className="login-title">Sign in</h2>
            <form action="#">
              <div className="form-group">
                {/* <label for="email" className="sr-only">
                  Username
                </label> */}
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="error">{usernameError}</div>
                {/* {usernameError && <div className="error">{usernameError}</div>} */}
                {/* {usernameError && setVisibility("visible")} */}
              </div>
              <div className="form-group mb-3">
                {/* <label for="password" className="sr-only">
                  Password
                </label> */}
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="error">{passwordError}</div>
                {/* // {passwordError && <div className="error">{passwordError}</div>} */}
              </div>
              <div className="d-flex justify-content-between align-items-center mb-5">
                {/* <input
                  name="login"
                  id="login"
                  className="btn login-btn"
                  type="button"
                  value="Login"
                />

                <Link to="#!" className="forgot-password-link">
                  Forgot Password?
                </Link> */}

                <div>
                  <button
                    type="button"
                    className="btn login-btn  me-4"
                    onClick={handleLogin}
                    // onClick={() => setModalShow(true)}
                  >
                    Login
                  </button>
                  {/* <Button variant="primary" onClick={() => setModalShow(true)}>
                    Launch vertically centered modal
                  </Button> */}
                  {/* <forgotPasswordPopup
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  /> */}
                </div>
                <div>
                  {/* <button
                    className="text-reset text-primary"
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                      width: "100%",
                    }}
                    onClick=""
                  >
                    Forgot password?
                  </button> */}
                </div>
              </div>
            </form>
            <p className="login-wrapper-footer-text">
              Need an account?{" "}
              <Link to="/register" className="text-reset text-primary">
                Signup here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
