import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8080/login";

const getResponseData = async (username, password) => {
  try {
    const response = await axios.post(BASE_URL, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    toast.error("Invalid Credential", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return null;
  }
};

// const instance = axios.create({
//   baseURL: "/api", // Set your API base URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const setAuthHeader = (jwtToken) => {
//   if (jwtToken) {
//     instance.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
//   } else {
//     delete instance.defaults.headers.common["Authorization"];
//   }
// };

// const fetchProtectedResource = async () => {
//   try {
//     const response = await instance.get("/protected-resource");
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export { getResponseData };
