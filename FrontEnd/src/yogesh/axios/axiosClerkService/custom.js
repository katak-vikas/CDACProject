import axios from "axios";
const BASE_URL = "http://localhost:8080/";

const sendRequest = axios.create({
  baseURL: BASE_URL,
});

sendRequest.interceptors.request.use(
  (request) => {
    request.headers.Accept = "application/json";
    const jwtToken = sessionStorage.getItem("jwtToken_test");
    request.headers.Authorization = `Bearer ${jwtToken}`;

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

sendRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default sendRequest;
