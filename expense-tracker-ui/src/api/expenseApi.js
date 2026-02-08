import axios from "axios";

const BASE_URL = "http://localhost:8080/api/expenses";

/* =========================
   CREATE
========================= */
export const addExpense = (expense) => {
  return axios.post(BASE_URL, expense);
};

/* =========================
   READ – PAGINATED
========================= */
export const getPagedExpenses = (page = 0, size = 5, sortBy = "date") => {
  return axios.get(BASE_URL, {
    params: { page, size, sortBy },
  });
};

/* =========================
   SEARCH + FILTER + PAGINATION
========================= */
export const searchExpenses = (
  filters,
  page = 0,
  size = 5,
  sortBy = "date"
) => {
  return axios.get(`${BASE_URL}/search`, {
    params: {
      ...filters,
      page,
      size,
      sortBy,
    },
  });
};

/* =========================
   READ BY ID
========================= */
export const getExpenseById = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

/* =========================
   UPDATE
========================= */
export const updateExpense = (id, expense) => {
  return axios.put(`${BASE_URL}/${id}`, expense);
};

/* =========================
   DELETE
========================= */
export const deleteExpense = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

/* =========================
   CSV EXPORT
========================= */
export const exportExpensesCsv = () => {
  return axios.get(`${BASE_URL}/export`, {
    responseType: "blob",
  });
};
