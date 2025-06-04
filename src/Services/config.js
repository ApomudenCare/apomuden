// import axios from "axios";
// const baseURL = import.meta.env.VITE_BASE_URL;

// export const apiClient = axios.create({
//     baseURL: baseURL,
// });

// apiClient.interceptors.request.use((config)=>{
//     const token = localStorage.getItem("token");

//     if(!config.headers){
//         config.headers = {};
//     }

//     if (token){
//         config.headers.Authorization = `Bearer ${token}`; 
//     }

//     return config;
// });

import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL: baseURL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!config.headers) {
    config.headers = {};
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Optionally redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);