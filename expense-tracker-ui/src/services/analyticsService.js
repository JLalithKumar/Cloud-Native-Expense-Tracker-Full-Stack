import API from "../api/axiosInstance";

const BASE_URL = "/api/analytics";

export const getSummary = () =>
  API.get(`${BASE_URL}/summary`);

export const getCategoryWise = () =>
  API.get(`${BASE_URL}/category`);

export const getMonthlyExpense = (year) =>
  API.get(`${BASE_URL}/monthly/${year}`);

export const getMonthlyIncomeExpense = (year) =>
  API.get(`${BASE_URL}/monthly/stacked/${year}`);
