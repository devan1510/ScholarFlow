import { useState } from "react";
import calculateTotals from "../../helper.js";
import transactions from "../data/Transactions.js";

function ExpenditureProgress() {
  const [target, setTarget] = useState(10000);
  const [isEditing, setIsEditing] = useState(false);
  const [tempTarget, setTempTarget] = useState(target);

  const { expenses } = calculateTotals(transactions);
  const percentage = Math.min((expenses / target) * 100, 100);
  const remaining = Math.max(target - expenses, 0);
  const overspent = expenses > target ? expenses - target : 0;

  // Color logic with smooth transitions
  let colorClass = "bg-gradient-to-r from-green-500 to-green-600";
  let statusText = "On Track";
  let statusIcon = "✅";

  if (percentage >= 100) {
    colorClass = "bg-gradient-to-r from-red-500 to-red-600";
    statusText = "Overspent";
    statusIcon = "⚠️";
  } else if (percentage >= 80) {
    colorClass = "bg-gradient-to-r from-yellow-500 to-orange-500";
    statusText = "Approaching Limit";
    statusIcon = "⚡";
  } else if (percentage >= 60) {
    colorClass = "bg-gradient-to-r from-yellow-400 to-yellow-500";
    statusText = "Moderate Spending";
    statusIcon = "📊";
  } else {
    colorClass = "bg-gradient-to-r from-green-500 to-emerald-500";
    statusText = "Healthy Spending";
    statusIcon = "🌱";
  }

  const handleTargetSave = () => {
    if (tempTarget > 0) {
      setTarget(tempTarget);
      setIsEditing(false);
    }
  };

  const getAdvice = () => {
    if (percentage >= 100) {
      return "You've exceeded your budget. Review unnecessary expenses and consider reducing spending.";
    } else if (percentage >= 80) {
      return `You have £${remaining.toFixed(2)} left. Be cautious with remaining spending this period.`;
    } else if (percentage >= 60) {
      return `You're at ${percentage.toFixed(1)}% of your budget. Keep tracking your expenses.`;
    } else {
      return `Great job! You've spent only ${percentage.toFixed(1)}% of your budget.`;
    }
  };

  return (
    <div className="vintage-card rounded-lg p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">💰</div>
        <h2 className="font-serif text-2xl font-bold text-amber-900">
          Expenditure Progress
        </h2>
        <p className="font-serif text-amber-700/60 text-sm mt-1">
          Track your spending against budget
        </p>
        <div className="w-12 h-px bg-amber-600/30 mx-auto mt-3"></div>
      </div>

      {/* Target Input */}
      <div className="mb-6">
        <label className="font-serif text-amber-800 text-sm block mb-2">
          Monthly Budget Target
        </label>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <input
                type="number"
                value={tempTarget}
                onChange={(e) => setTempTarget(Number(e.target.value))}
                className="flex-1 p-2 bg-amber-50 border-2 border-amber-600/30 rounded-lg font-mono text-amber-800 focus:outline-none focus:border-amber-600"
                autoFocus
              />
              <button
                onClick={handleTargetSave}
                className="px-4 py-2 bg-green-700 text-amber-100 rounded-lg hover:bg-green-800 transition"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setTempTarget(target);
                }}
                className="px-4 py-2 bg-amber-600 text-amber-100 rounded-lg hover:bg-amber-700 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <div className="flex-1 p-2 bg-amber-100/50 rounded-lg font-mono text-amber-800 border border-amber-600/20">
                £{target.toLocaleString()}
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 vintage-button"
              >
                ✏️ Edit
              </button>
            </>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-amber-100/30 rounded-lg border border-amber-600/20">
          <div className="font-mono text-xs text-amber-700">
            Current Spending
          </div>
          <div className="font-serif text-2xl font-bold text-amber-900">
            £{expenses.toLocaleString()}
          </div>
        </div>
        <div className="text-center p-3 bg-amber-100/30 rounded-lg border border-amber-600/20">
          <div className="font-mono text-xs text-amber-700">Remaining</div>
          <div
            className={`font-serif text-2xl font-bold ${remaining >= 0 ? "text-green-700" : "text-red-700"}`}
          >
            £{remaining.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="font-mono text-xs text-amber-700">Progress</span>
          <span className="font-mono text-xs text-amber-700 font-bold">
            {percentage.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-amber-200/50 rounded-full h-4 overflow-hidden">
          <div
            className={`${colorClass} h-full transition-all duration-700 ease-out rounded-full`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Status & Advice */}
      <div
        className={`p-4 rounded-lg mb-4 ${
          percentage >= 100
            ? "bg-red-100/50 border border-red-600/30"
            : percentage >= 80
              ? "bg-yellow-100/50 border border-yellow-600/30"
              : "bg-green-100/50 border border-green-600/30"
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{statusIcon}</span>
          <span className="font-serif font-semibold text-amber-900">
            {statusText}
          </span>
        </div>
        <p className="font-serif text-sm text-amber-800">{getAdvice()}</p>
      </div>

      {overspent > 0 && (
        <div className="p-3 bg-red-100/50 rounded-lg border border-red-600/30">
          <p className="font-mono text-xs text-red-700 text-center">
            ⚠️ Overspent by £{overspent.toFixed(2)}. Consider adjusting your
            budget or reducing expenses.
          </p>
        </div>
      )}
    </div>
  );
}

export default ExpenditureProgress;
