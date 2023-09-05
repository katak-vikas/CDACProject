import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080";

const sendRequest = axios.create({
  baseURL: BASE_URL,
});

const useSendRequest2 = () => {
  const navigate = useNavigate();

  sendRequest.interceptors.request.use(
    (config) => {
      const jwtToken = sessionStorage.getItem("jwtToken_test");
      if (!jwtToken) {
        navigate("/");
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
      return null;
    }
  );

  return sendRequest;
};

export default useSendRequest2;
