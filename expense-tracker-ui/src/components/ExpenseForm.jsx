import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CATEGORY_OPTIONS } from "../constants/categories";
import { addExpense, updateExpense } from "../api/expenseApi";

const ExpenseForm = ({ onExpenseAdded, selectedExpense, clearSelection }) => {
  const [type, setType] = useState("EXPENSE");

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: null,
    paymentMode: "",
    notes: "",
  });

  const [errors, setErrors] = useState([]);

  // ✅ FIX: Correct date parsing when editing
  useEffect(() => {
    if (selectedExpense) {
      setFormData({
        title: selectedExpense.title,
        amount: selectedExpense.amount,
        category: selectedExpense.category,
        date: selectedExpense.date
          ? new Date(selectedExpense.date + "T00:00:00")
          : null,
        paymentMode: selectedExpense.paymentMode,
        notes: selectedExpense.notes || "",
      });
      setType(selectedExpense.type);
    }
  }, [selectedExpense]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!type) {
      setErrors(["Please select Income or Expense type"]);
      return;
    }

    const payload = {
      ...formData,
      amount: Number(formData.amount),
      type,
      // ✅ FIX: send LOCAL date (yyyy-MM-dd)
      date: formData.date
        ? formData.date.toLocaleDateString("en-CA")
        : null,
    };

    try {
      if (selectedExpense) {
        await updateExpense(selectedExpense.id, payload);
      } else {
        await addExpense(payload);
      }

      setFormData({
        title: "",
        amount: "",
        category: "",
        date: null,
        paymentMode: "",
        notes: "",
      });

      setType("EXPENSE");
      clearSelection();
      onExpenseAdded();
    } catch (err) {
      const data = err.response?.data;
      setErrors(data?.messages || [data?.error || data?.message || "Something went wrong"]);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>{selectedExpense ? "Edit Expense" : "Add Expense"}</h2>

      {errors.length > 0 && (
        <ul style={{ color: "red" }}>
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-row full">
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <DatePicker
            selected={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
            placeholderText="Select date"
            dateFormat="dd-MM-yyyy"
            className="datepicker"
            maxDate={new Date()}
          />

          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            required
          >
            <option value="">Payment Mode</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
          </select>
        </div>

        <div className="form-row full">
          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit">
            {selectedExpense ? "Update Expense" : "Add Expense"}
          </button>

          {selectedExpense && (
            <button type="button" onClick={clearSelection}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
