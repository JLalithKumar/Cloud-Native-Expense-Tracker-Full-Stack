import { useEffect, useState } from "react";
import {
  getSummary,
  getCategoryWise,
  getMonthlyExpense,
  getMonthlyIncomeExpense,
} from "../../services/analyticsService";
import SummaryCard from "./SummaryCard";
import CategoryPieChart from "./CategoryPieChart";
import MonthlyBarChart from "./MonthlyBarChart";
import MonthlyStackedBarChart from "./MonthlyStackedBarChart";
import "./dashboard.css";
import Skeleton from "../ui/Skeleton";

const Dashboard = ({ refreshKey }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [stackedData, setStackedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      getSummary(),
      getCategoryWise(),
      getMonthlyExpense(selectedYear),
      getMonthlyIncomeExpense(selectedYear),
    ])
      .then(([summaryRes, categoryRes, monthlyRes, stackedRes]) => {
        // ✅ SUMMARY (safe defaults)
        const s = summaryRes?.data || {};
        setSummary({
          income: s.income || 0,
          expense: s.expense || 0,
          balance: s.balance || 0,
        });

        // ✅ CATEGORY PIE (safe map)
        const categoryRaw = categoryRes?.data || {};
        const catFormatted = Object.entries(categoryRaw).map(
          ([key, value]) => ({ name: key, value })
        );
        setCategoryData(catFormatted);

        const monthNames = [
          "JAN","FEB","MAR","APR","MAY","JUN",
          "JUL","AUG","SEP","OCT","NOV","DEC",
        ];

        // ✅ MONTHLY EXPENSE
        const rawMonthly = monthlyRes?.data || {};
       setMonthlyData(
         monthNames.map((name, i) => ({
           month: name,
           amount: rawMonthly?.[i + 1] ?? 0,
         }))
       );


        // ✅ INCOME vs EXPENSE
        const rawStacked = stackedRes?.data || {};
        setStackedData(
          monthNames.map((name, i) => ({
            month: name,
            income: rawStacked?.[i + 1]?.income ?? 0,
            expense: rawStacked?.[i + 1]?.expense ?? 0,
          }))
        );

      })
      .catch((err) => console.error("Dashboard load error:", err))
      .finally(() => setLoading(false));
  }, [refreshKey, selectedYear]);

  // ---------------- LOADING STATE ----------------
  if (loading) {
    return (
      <div className="dashboard">
        <h2>Analytics Dashboard</h2>

        <div className="summary-container">
          {[1, 2, 3].map((i) => (
            <div className="card" key={i}>
              <Skeleton height={18} width="40%" />
              <div style={{ marginTop: 14 }}>
                <Skeleton height={36} width="60%" />
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 30 }}>
          <Skeleton height={22} width="35%" />
          <div style={{ marginTop: 20 }}>
            <Skeleton height={260} />
          </div>
        </div>

        <div className="card" style={{ marginTop: 30 }}>
          <Skeleton height={22} width="45%" />
          <div style={{ marginTop: 20 }}>
            <Skeleton height={300} />
          </div>
        </div>
      </div>
    );
  }

  // ---------------- MAIN DASHBOARD ----------------
  return (
    <div className="dashboard">
      <h2>Analytics Dashboard</h2>

      <div className="summary-container">
        <SummaryCard title="Total Income" amount={summary.income} type="income" />
        <SummaryCard title="Total Expense" amount={summary.expense} type="expense" />
        <SummaryCard title="Balance" amount={summary.balance} type="balance" />
      </div>

      <div className="card" style={{ marginTop: 30 }}>
        <h3>Expense by Category</h3>

        {categoryData.length > 0 ? (
          <div style={{ width: "100%", height: 300 }}>
            <CategoryPieChart data={categoryData} />
          </div>
        ) : (
          <p>No category data available</p>
        )}
      </div>

      <div className="card" style={{ marginTop: 30 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Monthly Expense Trend</h3>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            style={{ width: 120 }}
          >
            <option value={currentYear}>{currentYear}</option>
            <option value={currentYear - 1}>{currentYear - 1}</option>
            <option value={currentYear - 2}>{currentYear - 2}</option>
          </select>
        </div>

        <div style={{ width: "100%", height: 300 }}>
          <MonthlyBarChart data={monthlyData} />
        </div>
      </div>

      <div className="card" style={{ marginTop: 30 }}>
        <h3>Income vs Expense ({selectedYear})</h3>

        <div style={{ width: "100%", height: 320 }}>
          <MonthlyStackedBarChart data={stackedData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
