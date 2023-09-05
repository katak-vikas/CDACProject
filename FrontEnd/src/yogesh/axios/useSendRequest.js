import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080/";

const sendRequest = axios.create({
  baseURL: BASE_URL,
});

const useSendRequest = () => {
  const navigateTo = useNavigate();

  sendRequest.interceptors.request.use(
    (config) => {
      const jwtToken = sessionStorage.getItem("jwtToken_test");
      if (!jwtToken) {
        navigateTo("/"); // Navigate to the home page
        throw new Error("JWT token not Found");
      } else {
        config.headers.Accept = "application/json";
        config.headers.Authorization = `Bearer ${jwtToken}`;
        return config;
      }
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
      if (error.response && error.response.status === 403) {
        navigateTo("/unauthorize");
      } else if (error.response && error.response.status >= 500) {
        navigateTo("/maintainence");
      } else if (error.response && error.response.status === 404) {
        navigateTo("/notfound");
      }
      return Promise.reject(error);
    }
  );

  return sendRequest;
};

export default useSendRequest;
