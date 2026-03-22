import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import transactions from "../data/Transactions";

const COLORS = [
  "#cd9a4b",
  "#b87a2e",
  "#9b5e1a",
  "#7b5a3e",
  "#5c3e2a",
  "#4a2f1c",
  "#3a2a1f",
  "#2c1e12",
  "#8B7355",
  "#A67B5A",
];

// Move CustomTooltip outside of the main component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-amber-100 border-2 border-amber-600/30 rounded-lg p-3 shadow-lg">
        <p className="font-serif font-semibold text-amber-900">
          {payload[0].name}
        </p>
        <p className="font-mono text-amber-800">
          £{payload[0].value.toFixed(2)}
        </p>
        <p className="font-mono text-xs text-amber-600">
          {((payload[0].value / payload[0].payload.total) * 100).toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

const Piechart = () => {
  const groupByCategory = (data) => {
    const grouped = {};
    data.forEach((t) => {
      if (!grouped[t.category]) {
        grouped[t.category] = 0;
      }
      grouped[t.category] += t.amount;
    });
    return Object.keys(grouped).map((key) => ({
      name: key,
      value: grouped[key],
    }));
  };

  const incomeData = transactions.filter((t) => t.type === "income");
  const expenseData = transactions.filter((t) => t.type === "expense");
  const incomePieData = groupByCategory(incomeData);
  const expensePieData = groupByCategory(expenseData);

  // Calculate totals for percentages
  const totalIncome = incomePieData.reduce((sum, item) => sum + item.value, 0);
  const totalExpense = expensePieData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  const incomeDataWithTotal = incomePieData.map((item) => ({
    ...item,
    total: totalIncome,
  }));
  const expenseDataWithTotal = expensePieData.map((item) => ({
    ...item,
    total: totalExpense,
  }));

  return (
    <div className="vintage-card rounded-lg p-6">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">📊</div>
        <h2 className="font-serif text-2xl font-bold text-amber-900">
          Financial Distribution
        </h2>
        <p className="font-serif text-amber-700/60 text-sm mt-1">
          Income & expense breakdown by category
        </p>
        <div className="w-12 h-px bg-amber-600/30 mx-auto mt-3"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Income Pie */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-lg p-4 border border-amber-600/20">
          <h3 className="font-serif text-xl font-bold text-green-700 text-center mb-4 flex items-center justify-center gap-2">
            <span>📈</span> Income by Category
          </h3>
          {incomePieData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={incomeDataWithTotal}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {incomePieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={CustomTooltip} />
                  <Legend
                    wrapperStyle={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "12px",
                    }}
                    formatter={(value) => (
                      <span className="text-amber-800">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <p className="font-mono text-sm text-green-700">
                  Total Income: £{totalIncome.toFixed(2)}
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="font-serif text-amber-700">
                No income data available
              </p>
            </div>
          )}
        </div>

        {/* Expense Pie */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-lg p-4 border border-amber-600/20">
          <h3 className="font-serif text-xl font-bold text-red-700 text-center mb-4 flex items-center justify-center gap-2">
            <span>📉</span> Expenses by Category
          </h3>
          {expensePieData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseDataWithTotal}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {expensePieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={CustomTooltip} />
                  <Legend
                    wrapperStyle={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "12px",
                    }}
                    formatter={(value) => (
                      <span className="text-amber-800">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <p className="font-mono text-sm text-red-700">
                  Total Expenses: £{totalExpense.toFixed(2)}
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="font-serif text-amber-700">
                No expense data available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Piechart;
