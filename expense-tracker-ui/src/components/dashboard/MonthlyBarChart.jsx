import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const MonthlyBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <p style={{ color: "#64748b", textAlign: "center" }}>
        No data for this year yet 📅
      </p>
    );
  }

  return (
    <div style={{ width: "100%", height: 320, minHeight: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          barCategoryGap={20}
        >
          <CartesianGrid
            stroke="#e5e7eb"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#475569" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#475569" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: "rgba(99,102,241,0.08)" }}
            formatter={(value) => [`₹ ${value}`, "Amount"]}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          />

          <Bar
            dataKey="amount"
            fill="#6366F1"
            radius={[8, 8, 0, 0]}
            barSize={36}
            isAnimationActive={true}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;
