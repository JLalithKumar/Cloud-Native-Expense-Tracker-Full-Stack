import "./App.css";
import { useEffect, useState } from "react";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseSearch from "./components/ExpenseSearch";
import Dashboard from "./components/dashboard/Dashboard";
import ThemeToggle from "./components/ui/ThemeToggle";
import { CATEGORY_OPTIONS } from "./constants/categories";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // ✅ FETCH ALL EXPENSES (FIX)
  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/expenses");
      const data = await res.json();
      setExpenses(data || []);
    } catch (e) {
      console.error("Failed to load expenses", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    await fetch(`http://localhost:8080/api/expenses/${id}`, {
      method: "DELETE",
    });

    fetchExpenses();
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Expense Tracker</h1>
        <ThemeToggle
          dark={darkMode}
          toggle={() => setDarkMode((p) => !p)}
        />
      </div>

      <Dashboard refreshKey={expenses.length} />

      <div className="card">
        <ExpenseForm
          onExpenseAdded={fetchExpenses}
          selectedExpense={selectedExpense}
          clearSelection={() => setSelectedExpense(null)}
        />
      </div>

      <div className="card">
        {loading ? (
          <p>Loading expenses...</p>
        ) : expenses.length === 0 ? (
          <p>No expenses found</p>
        ) : (
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
                    {CATEGORY_OPTIONS.find(
                      (c) => c.value === e.category
                    )?.label || e.category}
                  </td>
                  <td>{e.date}</td>
                  <td>{e.paymentMode}</td>
                  <td>{e.notes}</td>
                  <td>
                    <button onClick={() => setSelectedExpense(e)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(e.id)}>
                      Delete
                    </button>
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

export default App;
