import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#6366F1",
  "#22C55E",
  "#EF4444",
  "#F59E0B",
  "#06B6D4",
  "#A855F7",
];

const CategoryPieChart = ({ data }) => {
  if (!data || data.length === 0) {
   return (
     <p style={{ color: "#64748b", textAlign: "center" }}>
       No expense data yet. Add expenses to see insights 📊
     </p>
   );
  }

  return (
    <div style={{ width: "100%", height: 320, minHeight: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={55}
            paddingAngle={4}
             minAngle={8}
            isAnimationActive
            animationDuration={700}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => `₹ ${value}`}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
