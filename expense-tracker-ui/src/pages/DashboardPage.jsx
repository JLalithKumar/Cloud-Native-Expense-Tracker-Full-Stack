import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const [refresh, setRefresh] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

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
      .catch((err) => {
        console.error("Failed to load expenses:", err);
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
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div className="container">
      <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ marginBottom: "4px" }}>Expense Tracker</h1>
          {user.name && (
            <p style={{ color: "var(--text-muted, #64748b)", fontSize: "14px", margin: 0 }}>
              Welcome back, <strong>{user.name}</strong>
            </p>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ThemeToggle dark={darkMode} toggle={() => setDarkMode((p) => !p)} />
          <button
            onClick={logout}
            style={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "12px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 8px 20px rgba(239, 68, 68, 0.3)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Logout
          </button>
        </div>
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
          <>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e) => (
                  <tr key={e.id}>
                    <td>{e.title}</td>
                    <td>₹{e.amount}</td>
                    <td>{e.type}</td>
                    <td>
                      {CATEGORY_OPTIONS.find(c => c.value === e.category)?.label || e.category}
                    </td>
                    <td>{e.date}</td>
                    <td>{e.paymentMode}</td>
                    <td>{e.notes}</td>
                    <td>
                      <button onClick={() => setSelectedExpense(e)}>Edit</button>
                      <button onClick={() => handleDelete(e.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  disabled={page === 0}
                  onClick={() => {
                    if (isSearching) {
                      handleSearch(currentFilters, page - 1);
                    } else {
                      fetchExpenses(page - 1);
                    }
                  }}
                >
                  ← Prev
                </button>
                <span style={{ color: "var(--text-muted, #64748b)", alignSelf: "center" }}>
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages - 1}
                  onClick={() => {
                    if (isSearching) {
                      handleSearch(currentFilters, page + 1);
                    } else {
                      fetchExpenses(page + 1);
                    }
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
