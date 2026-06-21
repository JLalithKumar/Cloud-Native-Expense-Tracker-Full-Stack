import axios from "axios";

//const API = axios.create({
//  baseURL: "http://localhost:8081",
//});
// const API = axios.create({
//   baseURL: "http://a02501fc06e4a4782a22fc3024f35f5e-523494114.us-east-1.elb.amazonaws.com:8081",
// });
// const API = axios.create({
//   baseURL: "http://ac04015e67ffc446fb096f094e79d5ed-203504087.us-east-1.elb.amazonaws.com:8081",
// });
const API = axios.create({
  baseURL: "http://a2c3df5fd0627495588c7dbbb0dc89fa-1535481267.us-east-1.elb.amazonaws.com:8081",
});

// ✅ Attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Redirect to login on 401
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
