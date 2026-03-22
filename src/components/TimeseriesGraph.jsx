import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import transactions from "../data/Transactions";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const isForecast = payload[0]?.payload?.isForecast;
    return (
      <div className="bg-amber-100 border-2 border-amber-600/30 rounded-lg p-4 shadow-lg">
        <p className="font-serif font-semibold text-amber-900">{label}</p>
        {isForecast && (
          <p className="font-mono text-xs text-amber-600 mb-2">🔮 Forecast</p>
        )}
        <p className="font-mono text-green-700">
          Income: £{payload[0]?.value?.toFixed(2)}
        </p>
        <p className="font-mono text-red-700">
          Expenses: £{payload[1]?.value?.toFixed(2)}
        </p>
        <p className="font-mono text-amber-700 mt-2">
          Net: £{(payload[0]?.value - payload[1]?.value).toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

const TimeseriesGraph = () => {
  const [showForecast, setShowForecast] = useState(false);

  // Group transactions by date
  const grouped = {};
  transactions.forEach((t) => {
    if (!grouped[t.date]) {
      grouped[t.date] = { date: t.date, income: 0, expense: 0 };
    }
    grouped[t.date][t.type] += t.amount;
  });

  // Sort data
  const timeSeriesData = Object.values(grouped).sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  // Moving average
  const getMovingAverage = (data, key, window = 15) => {
    const lastWindow = data.slice(-window);
    const sum = lastWindow.reduce((acc, d) => acc + d[key], 0);
    return sum / lastWindow.length;
  };

  const avgIncome = getMovingAverage(timeSeriesData, "income");
  const avgExpense = getMovingAverage(timeSeriesData, "expense");

  // Trends
  const last15Days = timeSeriesData.slice(-15);
  const incomeTrend =
    last15Days.length >= 2
      ? last15Days[last15Days.length - 1].income - last15Days[0].income
      : 0;

  const expenseTrend =
    last15Days.length >= 2
      ? last15Days[last15Days.length - 1].expense - last15Days[0].expense
      : 0;

  // Forecast generation
  const forecast = [];
  const lastDate = new Date(timeSeriesData[timeSeriesData.length - 1].date);

  for (let i = 1; i <= 15; i++) {
    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + i);

    const isWeekend = nextDate.getDay() === 0 || nextDate.getDay() === 6;

    let incomeAdjust = 1;
    let expenseAdjust = 1;

    if (isWeekend) {
      incomeAdjust = 0.85;
      expenseAdjust = 1.2;
    }

    const trendInc = 1 + incomeTrend / 2000;
    const trendExp = 1 + expenseTrend / 2000;

    forecast.push({
      date: nextDate.toISOString().split("T")[0],
      income: Math.max(0, Math.round(avgIncome * incomeAdjust * trendInc)),
      expense: Math.max(0, Math.round(avgExpense * expenseAdjust * trendExp)),
      isForecast: true,
    });
  }

  // ✅ KEY FIX: switch dataset cleanly
  const chartData = showForecast ? forecast : timeSeriesData;

  // Date formatting
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatXAxis = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  // Forecast summary
  const totalForecastIncome = forecast.reduce((sum, f) => sum + f.income, 0);
  const totalForecastExpense = forecast.reduce((sum, f) => sum + f.expense, 0);

  const avgDailyIncome = totalForecastIncome / 15;
  const avgDailyExpense = totalForecastExpense / 15;

  const firstDate = timeSeriesData[0]?.date;
  const lastDateActual = timeSeriesData[timeSeriesData.length - 1]?.date;
  const firstForecastDate = forecast[0]?.date;
  const lastForecastDate = forecast[14]?.date;

  return (
    <div className="vintage-card rounded-lg p-6">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">📈</div>
        <h2 className="font-serif text-2xl font-bold text-amber-900">
          Financial Trends
        </h2>

        <p className="font-serif text-amber-700/60 text-sm mt-1">
          {showForecast
            ? `Forecast: ${formatDate(firstForecastDate)} - ${formatDate(
                lastForecastDate,
              )}`
            : `${formatDate(firstDate)} - ${formatDate(lastDateActual)}`}
        </p>

        <div className="w-12 h-px bg-amber-600/30 mx-auto mt-3"></div>
      </div>

      {/* Toggle */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowForecast(!showForecast)}
          className={`px-6 py-2 rounded-lg font-serif font-semibold transition-all duration-300 ${
            showForecast
              ? "bg-amber-800 text-amber-100 shadow-md"
              : "vintage-button hover:scale-105"
          }`}
        >
          {showForecast
            ? "📊 Show Historical Data Only"
            : "🔮 Show 15-Day Forecast"}
        </button>
      </div>

      {/* Trend cards */}
      {showForecast && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-green-100/30 rounded-lg border border-green-600/20">
            <div className="font-mono text-xs text-green-700">Income Trend</div>
            <div className="font-serif text-lg font-bold text-green-700">
              £{incomeTrend.toFixed(2)}
            </div>
          </div>

          <div className="text-center p-3 bg-red-100/30 rounded-lg border border-red-600/20">
            <div className="font-mono text-xs text-red-700">Expense Trend</div>
            <div className="font-serif text-lg font-bold text-red-700">
              £{expenseTrend.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#cd9a4b30" />

          <XAxis
            dataKey="date"
            tick={{
              fill: "#7b5a3e",
              fontFamily: "'Special Elite', monospace",
              fontSize: 11,
            }}
            tickFormatter={formatXAxis}
            interval={showForecast ? 2 : 8}
            angle={-35}
            textAnchor="end"
            height={70}
          />

          <YAxis
            tick={{
              fill: "#7b5a3e",
              fontFamily: "'Special Elite', monospace",
              fontSize: 12,
            }}
            tickFormatter={(value) => `£${value}`}
          />

          <Tooltip content={CustomTooltip} />

          <Legend
            formatter={(value) => (
              <span className="text-amber-800">{value}</span>
            )}
          />

          {/* Dynamic Lines */}
          <Line
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            strokeWidth={2}
            strokeDasharray={showForecast ? "5 5" : "0"}
            dot={{ r: 3, fill: "#22c55e" }}
            activeDot={{ r: 6 }}
            name={
              showForecast ? "Income Forecast (15 Days)" : "Income (Actual)"
            }
          />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={2}
            strokeDasharray={showForecast ? "5 5" : "0"}
            dot={{ r: 3, fill: "#ef4444" }}
            activeDot={{ r: 6 }}
            name={
              showForecast ? "Expenses Forecast (15 Days)" : "Expenses (Actual)"
            }
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Forecast Summary */}
      {showForecast && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="p-3 bg-green-100/30 rounded-lg border border-green-600/20">
            <p className="text-center text-green-700 text-xs">
              Total Forecast Income
            </p>
            <p className="text-center text-green-700 font-bold">
              £{totalForecastIncome.toFixed(2)}
            </p>
          </div>

          <div className="p-3 bg-red-100/30 rounded-lg border border-red-600/20">
            <p className="text-center text-red-700 text-xs">
              Total Forecast Expenses
            </p>
            <p className="text-center text-red-700 font-bold">
              £{totalForecastExpense.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeseriesGraph;
