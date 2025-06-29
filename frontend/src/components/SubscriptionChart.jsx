import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#1f77b4", // blue
  "#ff7f0e", // orange
  "#2ca02c", // green
  "#d62728", // red
  "#9467bd", // purple
  "#8c564b", // brown
  "#e377c2", // pink
  "#7f7f7f", // gray
  "#bcbd22", // lime
  "#17becf", // cyan
];

const SubscriptionChart = ({ data }) => {
  const [chartType, setChartType] = useState("bar");

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-sm mb-6 text-white">
      <h2 className="text-xl font-semibold mb-4">Spending By Category</h2>
      <div className="flex gap-2">
        <button
          onClick={() => setChartType("bar")}
          className={`px-3 py-1 rounded-md text-sm font-medium transition ${
            chartType === "bar"
              ? "bg-amber-400 text-white"
              : "bg-white text-black hover:bg-gray-200"
          }`}
        >
          Bar Chart
        </button>
        <button
          onClick={() => setChartType("pie")}
          className={`px-3 py-1 rounded-md text-sm font-medium transition ${
            chartType === "pie"
              ? "bg-amber-400 text-white"
              : "bg-white text-black hover:bg-gray-200"
          }`}
        >
          Pie Chart
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        {chartType === "bar" ? (
          <BarChart
            data={data}
            barCategoryGap={30}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="category" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            {/* <Bar dataKey="cost" barSize={70}>
              {data.map((entry, index) => (
                <Cell
                  key={`bar-cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar> */}
            <Bar dataKey="cost" fill="#facc15" barSize={70} />
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={data}
              dataKey="cost"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine={false}
              label={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default SubscriptionChart;
