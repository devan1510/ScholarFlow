import { useState } from "react";
import calculateTotals from "../../helper.js";
import transactions from "../data/Transactions.js";

function SavingsProgress() {
  const [target, setTarget] = useState(25000);
  const [isEditing, setIsEditing] = useState(false);
  const [tempTarget, setTempTarget] = useState(target);

  const { savings } = calculateTotals(transactions);
  const percentage = Math.min((savings / target) * 100, 100);
  const remainingToGoal = Math.max(target - savings, 0);
  const progressToGoal = (savings / target) * 100;

  // Color logic for savings (green for good progress, red for behind)
  let colorClass = "bg-gradient-to-r from-red-500 to-orange-500";
  let statusText = "Behind Target";
  let statusIcon = "📉";
  let advice = "";

  if (percentage >= 100) {
    colorClass = "bg-gradient-to-r from-emerald-500 to-green-600";
    statusText = "Goal Achieved! 🎉";
    statusIcon = "🏆";
    advice =
      "Congratulations! You've reached your savings goal. Consider setting a new target.";
  } else if (percentage >= 80) {
    colorClass = "bg-gradient-to-r from-green-500 to-emerald-500";
    statusText = "Excellent Progress";
    statusIcon = "🚀";
    advice = `Only £${remainingToGoal.toFixed(2)} away from your goal. Keep up the great work!`;
  } else if (percentage >= 60) {
    colorClass = "bg-gradient-to-r from-green-400 to-green-500";
    statusText = "Good Progress";
    statusIcon = "📈";
    advice = `You're ${percentage.toFixed(1)}% of the way there. Stay consistent with your savings.`;
  } else if (percentage >= 40) {
    colorClass = "bg-gradient-to-r from-yellow-400 to-yellow-500";
    statusText = "Moderate Progress";
    statusIcon = "⚡";
    advice = `You need £${remainingToGoal.toFixed(2)} more. Consider increasing your savings rate.`;
  } else if (percentage >= 20) {
    colorClass = "bg-gradient-to-r from-orange-400 to-orange-500";
    statusText = "Getting Started";
    statusIcon = "🌱";
    advice = `You're ${percentage.toFixed(1)}% toward your goal. Every bit counts!`;
  } else {
    colorClass = "bg-gradient-to-r from-red-500 to-red-600";
    statusText = "Behind Schedule";
    statusIcon = "⚠️";
    advice = `You need £${remainingToGoal.toFixed(2)} to reach your goal. Try setting up automatic transfers.`;
  }

  const handleTargetSave = () => {
    if (tempTarget > 0) {
      setTarget(tempTarget);
      setIsEditing(false);
    }
  };

  const getMonthlyRecommendation = () => {
    const monthsToGoal =
      remainingToGoal > 0
        ? Math.ceil(remainingToGoal / (savings / 3 || 100))
        : 0;
    if (monthsToGoal > 0 && monthsToGoal < 12) {
      return `At current rate, you'll reach your goal in about ${monthsToGoal} months.`;
    } else if (monthsToGoal >= 12) {
      return `Consider increasing monthly savings to reach your goal sooner.`;
    }
    return "Great job on your savings progress!";
  };

  return (
    <div className="vintage-card rounded-lg p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🏦</div>
        <h2 className="font-serif text-2xl font-bold text-amber-900">
          Savings Progress
        </h2>
        <p className="font-serif text-amber-700/60 text-sm mt-1">
          Track your savings journey
        </p>
        <div className="w-12 h-px bg-amber-600/30 mx-auto mt-3"></div>
      </div>

      {/* Target Input */}
      <div className="mb-6">
        <label className="font-serif text-amber-800 text-sm block mb-2">
          Savings Goal
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
            Current Savings
          </div>
          <div className="font-serif text-2xl font-bold text-green-700">
            £{savings.toLocaleString()}
          </div>
        </div>
        <div className="text-center p-3 bg-amber-100/30 rounded-lg border border-amber-600/20">
          <div className="font-mono text-xs text-amber-700">
            Remaining to Goal
          </div>
          <div
            className={`font-serif text-2xl font-bold ${remainingToGoal > 0 ? "text-amber-700" : "text-green-700"}`}
          >
            £{remainingToGoal.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="font-mono text-xs text-amber-700">
            Goal Progress
          </span>
          <span className="font-mono text-xs text-amber-700 font-bold">
            {Math.min(percentage, 100).toFixed(1)}%
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
          percentage >= 80
            ? "bg-green-100/50 border border-green-600/30"
            : percentage >= 40
              ? "bg-yellow-100/50 border border-yellow-600/30"
              : "bg-red-100/50 border border-red-600/30"
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{statusIcon}</span>
          <span className="font-serif font-semibold text-amber-900">
            {statusText}
          </span>
        </div>
        <p className="font-serif text-sm text-amber-800">{advice}</p>
      </div>

      {/* Additional Info */}
      <div className="p-3 bg-amber-100/30 rounded-lg border border-amber-600/20">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">💡</span>
          <p className="font-mono text-xs text-amber-700">
            {getMonthlyRecommendation()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SavingsProgress;
