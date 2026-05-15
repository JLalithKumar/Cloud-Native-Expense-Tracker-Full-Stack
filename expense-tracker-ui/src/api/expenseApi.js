import API from "./axiosInstance";

const BASE_URL = "/api/expenses";

/* =========================
   CREATE
========================= */
export const addExpense = (expense) => {
  return API.post(BASE_URL, expense);
};

/* =========================
   READ – PAGINATED
========================= */
export const getPagedExpenses = (page = 0, size = 5, sortBy = "date") => {
  return API.get(`${BASE_URL}/paged`, {
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
  return API.get(`${BASE_URL}/search`, {
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
  return API.get(`${BASE_URL}/${id}`);
};

/* =========================
   UPDATE
========================= */
export const updateExpense = (id, expense) => {
  return API.put(`${BASE_URL}/${id}`, expense);
};

/* =========================
   DELETE
========================= */
export const deleteExpense = (id) => {
  return API.delete(`${BASE_URL}/${id}`);
};

/* =========================
   CSV EXPORT
========================= */
export const exportExpensesCsv = () => {
  return API.get(`${BASE_URL}/export`, {
    responseType: "blob",
  });
};
