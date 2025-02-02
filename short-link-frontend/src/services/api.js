import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupInterceptors = (navigate) => {
  api.interceptors.response.use(
    (response) =>  response,
    (error) => {
      if (error.response && error.response.status === 404) {
        navigate("/not-found", { replace: true });
      }
      return Promise.reject(error);
    }
  );
};


// API functions
export const getData = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};