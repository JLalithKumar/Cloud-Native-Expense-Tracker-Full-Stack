import axios from "axios";

//const AUTH_URL = "http://localhost:8081/api/auth";
const AUTH_URL =  "http://a2c3df5fd0627495588c7dbbb0dc89fa-1535481267.us-east-1.elb.amazonaws.com:8081/api/auth";
// const AUTH_URL = "http://a02501fc06e4a4782a22fc3024f35f5e-523494114.us-east-1.elb.amazonaws.com:8081/api/auth";
//const AUTH_URL = "http://ae8f0b020c8664fb9a5408daca066cea-1409214738.us-east-1.elb.amazonaws.com:8081/api/auth";
//const AUTH_URL = "http://ac04015e67ffc446fb096f094e79d5ed-203504087.us-east-1.elb.amazonaws.com:8081/api/auth";
export const loginUser = (email, password) => {
  return axios.post(`${AUTH_URL}/login`, { email, password });
};

export const registerUser = (name, email, password) => {
  return axios.post(`${AUTH_URL}/register`, { name, email, password });
};
