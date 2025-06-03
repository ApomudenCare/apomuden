// import {apiClient} from "./config";

// export const apiSignUp = async (payload)=> {
//     return apiClient.post("/users/register", payload,{
//         headers: {
//             "Content-type": "application/json"
//         },
//     });
// };


// export const apiLogin= async (payload) => {
//     return apiClient.post("/users/login", payload, {
//         headers:{
//             "Content-Type": "application/json"
//         },
//     });
// };

import { apiClient } from "./config";

export const apiSignUp = async (payload) => {
  // Check if payload is FormData (for file uploads)
  const isFormData = payload instanceof FormData;
  
  return apiClient.post("/users/register", payload, {
    headers: {
      // Only set Content-Type for JSON data
      // For FormData, let browser set it automatically with boundary
      ...(isFormData ? {} : { "Content-Type": "application/json" })
    },
  });
};

export const apiLogin = async (payload) => {
  return apiClient.post("/users/login", payload, {
    headers: {
      "Content-Type": "application/json"
    },
  });
};

// Additional auth utility functions
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = '/login';
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};