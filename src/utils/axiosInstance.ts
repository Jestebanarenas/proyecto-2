import axios from "axios";

const instance = axios.create({});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("google_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;