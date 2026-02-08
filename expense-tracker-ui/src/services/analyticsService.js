import axios from "axios";

const BASE_URL = "http://localhost:8080/api/analytics";

export const getSummary = () =>
  axios.get(`${BASE_URL}/summary`);

export const getCategoryWise = () =>
  axios.get(`${BASE_URL}/category`);

export const getMonthlyExpense = (year) =>
  axios.get(`${BASE_URL}/monthly/${year}`);

export const getMonthlyIncomeExpense = (year) =>
  axios.get(`${BASE_URL}/monthly/stacked/${year}`);
