import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const MonthlyStackedBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No income/expense data available</p>;
  }

  return (
    <div style={{ width: "100%", height: 320, minHeight: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(v) => `₹ ${v}`} />
          <Legend />

          <Bar dataKey="income" stackId="a" fill="#22C55E" />

          <Bar dataKey="expense" stackId="a" fill="#EF4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyStackedBarChart;
