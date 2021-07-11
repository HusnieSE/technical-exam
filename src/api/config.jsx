import axios from "axios";

export const api = axios.create({
  baseURL: "http://35.201.2.209:8000/",
  timeout: 5000,
});

api.interceptors.response.use(
  ({ data, status }) => {
    return { data, status };
  },
  (error) => {
    return Promise.reject(error);
  }
);
