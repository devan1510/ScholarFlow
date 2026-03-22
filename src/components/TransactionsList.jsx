import React, { useState } from "react";
import transactions from "../data/transactions";

const TransactionsList = () => {
  // Add descriptions and icons to the original data
  const enrichedTransactions = transactions.map((tx) => ({
    ...tx,
    description: tx.category,
    icon: getIconForCategory(tx.category),
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const itemsPerPage = 5;

  // Helper function to get icons based on category
  function getIconForCategory(category) {
    const iconMap = {
      Rent: "🏠",
      "Part-time wages": "💼",
      Netflix: "🎬",
      "Electricity bill": "⚡",
      "Student loan payment": "📚",
      "Gym membership": "💪",
      "Water bill": "💧",
      "Freelance work": "💻",
      "Books purchase": "📖",
      Spotify: "🎵",
      "Internet bill": "🌐",
      "Course fee": "🎓",
      "Amazon Prime": "📦",
      "Gas bill": "🔥",
      Scholarship: "🏆",
      Stationery: "✏️",
      "Lab fee": "🔬",
    };
    return iconMap[category] || "💰";
  }

  // Filter transactions
  const filteredTransactions = enrichedTransactions.filter((tx) => {
    if (filter === "all") return true;
    return tx.type === filter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate totals
  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="vintage-card rounded-lg p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-amber-900 flex items-center gap-2">
            <span>📜</span> Transaction Ledger
          </h2>
          <p className="font-serif text-amber-700/60 text-sm mt-1">
            Historical record of all financial activities
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {[
            { value: "all", label: "All", icon: "📊" },
            { value: "income", label: "Income", icon: "📈" },
            { value: "expense", label: "Expenses", icon: "📉" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setFilter(option.value);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 font-serif text-sm transition-all duration-300 rounded ${
                filter === option.value
                  ? "bg-amber-800 text-amber-100 shadow-md"
                  : "bg-amber-100/50 text-amber-700 hover:bg-amber-200/50"
              }`}
            >
              {option.icon} {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {currentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="group relative bg-gradient-to-r from-amber-50 to-amber-100/30 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:translate-x-1"
          >
            {/* Decorative corner */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-amber-600/20"></div>

            <div className="flex items-center justify-between">
              {/* Left side - Icon & Details */}
              <div className="flex items-center gap-4 flex-1">
                <div className="text-3xl">{transaction.icon}</div>
                <div className="flex-1">
                  <h3 className="font-serif font-semibold text-amber-900">
                    {transaction.description}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <span className="font-mono text-xs text-amber-600">
                      📅{" "}
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="font-mono text-xs text-amber-600">
                      🏷️ {transaction.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side - Amount */}
              <div className="text-right">
                <div
                  className={`font-serif text-xl font-bold ${
                    transaction.type === "income"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </div>
                <div className="font-mono text-xs text-amber-600/60 mt-1">
                  {transaction.type === "income" ? "Credit" : "Debit"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 pt-4 border-t border-amber-600/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="font-mono text-sm text-amber-700">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredTransactions.length)} of{" "}
              {filteredTransactions.length} entries
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 font-serif text-amber-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-200/50 rounded transition-all duration-300"
              >
                ← Previous
              </button>

              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                // Show first, last, and current page with neighbors
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 font-serif rounded transition-all duration-300 ${
                        currentPage === pageNum
                          ? "bg-amber-800 text-amber-100 shadow-md"
                          : "text-amber-700 hover:bg-amber-200/50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  (pageNum === currentPage - 2 && currentPage > 3) ||
                  (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                ) {
                  return (
                    <span key={pageNum} className="text-amber-600">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 font-serif text-amber-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-200/50 rounded transition-all duration-300"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Section */}
      <div className="mt-6 pt-4 border-t border-amber-600/20">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50/30 rounded-lg">
            <div className="font-mono text-xs text-green-700">Total Income</div>
            <div className="font-serif text-2xl font-bold text-green-700">
              +${totalIncome.toFixed(2)}
            </div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-red-50 to-rose-50/30 rounded-lg">
            <div className="font-mono text-xs text-red-700">Total Expenses</div>
            <div className="font-serif text-2xl font-bold text-red-700">
              -${totalExpenses.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Net Balance */}
        <div className="mt-4 text-center p-3 bg-amber-100/30 rounded-lg border border-amber-600/20">
          <div className="font-mono text-xs text-amber-700">Net Balance</div>
          <div
            className={`font-serif text-xl font-bold ${totalIncome - totalExpenses >= 0 ? "text-green-700" : "text-red-700"}`}
          >
            ${(totalIncome - totalExpenses).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsList;
