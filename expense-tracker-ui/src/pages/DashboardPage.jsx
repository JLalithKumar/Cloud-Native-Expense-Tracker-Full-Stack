import "../App.css";
import { useEffect, useState } from "react";
import {
  getPagedExpenses,
  deleteExpense,
  searchExpenses,
} from "../api/expenseApi";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseSearch from "../components/ExpenseSearch";
import Dashboard from "../components/dashboard/Dashboard";
import ThemeToggle from "../components/ui/ThemeToggle";
import { CATEGORY_OPTIONS } from "../constants/categories";

export default function DashboardPage() {
  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const [refresh, setRefresh] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  const pageSize = 5;

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const fetchExpenses = (pageNumber) => {
    setLoading(true);
    setIsSearching(false);

    getPagedExpenses(pageNumber, pageSize, "date")
      .then((res) => {
        setExpenses(res.data.content);
        setTotalPages(res.data.totalPages);
        setPage(res.data.number);
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = (filters, pageNumber = 0) => {
    setLoading(true);
    setIsSearching(true);
    setCurrentFilters(filters);

    searchExpenses(filters, pageNumber, pageSize, "date")
      .then((res) => {
        setExpenses(res.data.content);
        setTotalPages(res.data.totalPages);
        setPage(res.data.number);
      })
      .finally(() => setLoading(false));
  };

  const clearSearch = () => {
    setCurrentFilters({});
    fetchExpenses(0);
  };

  useEffect(() => {
    fetchExpenses(0);
  }, [refresh]);

  const reloadExpenses = () => {
    setRefresh((prev) => !prev);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this expense?")) return;
    deleteExpense(id).then(() => reloadExpenses());
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Expense Tracker</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <Dashboard refreshKey={refresh} />

      <div className="card">
        <ExpenseForm
          onExpenseAdded={reloadExpenses}
          selectedExpense={selectedExpense}
          clearSelection={() => setSelectedExpense(null)}
        />
      </div>

      <div className="card">
        <ExpenseSearch onSearch={handleSearch} onClear={clearSearch} />
      </div>

      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : expenses.length === 0 ? (
          <p>No expenses</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => (
                <tr key={e.id}>
                  <td>{e.title}</td>
                  <td>₹{e.amount}</td>
                  <td>
                    {CATEGORY_OPTIONS.find(c => c.value === e.category)?.label || e.category}
                  </td>
                  <td>{e.date}</td>
                  <td>
                    <button onClick={() => setSelectedExpense(e)}>Edit</button>
                    <button onClick={() => handleDelete(e.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
