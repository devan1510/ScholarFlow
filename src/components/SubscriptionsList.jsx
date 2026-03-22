import React, { useState } from "react";
import subscriptionsdata from "../data/Subscriptions.js";

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState(subscriptionsdata);
  const [payingId, setPayingId] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handlePayClick = (id) => {
    setPayingId(id);
  };

  const handleInputChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitPayment = (id) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: "paid" } : sub)),
    );
    setPayingId(null);
    setCardDetails({
      cardNumber: "",
      expiry: "",
      cvv: "",
    });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardDetails({ ...cardDetails, cardNumber: formatted });
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    setCardDetails({ ...cardDetails, expiry: formatted });
  };

  return (
    <div className="vintage-card rounded-lg p-6 sticky top-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">💳</div>
        <h2 className="font-serif text-2xl font-bold text-amber-900">
          Subscriptions
        </h2>
        <p className="font-serif text-amber-700/60 text-sm mt-1">
          Manage your recurring payments
        </p>
        <div className="w-12 h-px bg-amber-600/30 mx-auto mt-3"></div>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scroll">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="group relative bg-gradient-to-r from-amber-50 to-amber-100/30 rounded-lg p-4 hover:shadow-md transition-all duration-300"
          >
            {/* Decorative corner */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-amber-600/20"></div>

            <div className="flex gap-4">
              {/* Logo */}
              <div className="flex-shrink-0">
                {sub.logo ? (
                  <img
                    src={sub.logo}
                    alt={sub.company}
                    className="w-12 h-12 object-contain rounded-lg bg-amber-100/50 p-2"
                  />
                ) : (
                  <div className="w-12 h-12 bg-amber-200/50 rounded-lg flex items-center justify-center text-2xl">
                    {sub.company === "Netflix"
                      ? "🎬"
                      : sub.company === "Spotify"
                        ? "🎵"
                        : sub.company === "Gym"
                          ? "💪"
                          : "📦"}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1">
                <h3 className="font-serif text-xl font-bold text-amber-900 mb-2">
                  {sub.company}
                </h3>

                <div className="space-y-1">
                  <p className="font-serif text-amber-800">
                    <span className="font-semibold">💰 Amount:</span> $
                    {sub.amount}
                  </p>
                  <p className="font-serif text-amber-800">
                    <span className="font-semibold">📅 Deadline:</span>{" "}
                    {new Date(sub.Deadline_date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Status/Button */}
              <div className="flex-shrink-0">
                {sub.status === "paid" ? (
                  <div className="bg-green-700 text-amber-100 px-4 py-2 rounded-lg font-serif text-sm flex items-center gap-2">
                    ✅ Paid
                  </div>
                ) : payingId === sub.id ? (
                  <div className="mt-2">
                    <button
                      onClick={() => setPayingId(null)}
                      className="text-xs text-amber-600 hover:text-amber-800 mb-2 block"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handlePayClick(sub.id)}
                    className="vintage-button px-4 py-2 text-sm"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>

            {/* Payment Form */}
            {payingId === sub.id && (
              <div className="mt-4 pt-4 border-t border-amber-600/20">
                <div className="space-y-3">
                  <div>
                    <label className="font-mono text-xs text-amber-700 block mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength="19"
                      className="w-full p-2 bg-amber-50 border border-amber-600/30 rounded font-mono text-amber-800 placeholder-amber-400 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono text-xs text-amber-700 block mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={handleExpiryChange}
                        maxLength="5"
                        className="w-full p-2 bg-amber-50 border border-amber-600/30 rounded font-mono text-amber-800 placeholder-amber-400 focus:outline-none focus:border-amber-600"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-amber-700 block mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        name="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={handleInputChange}
                        maxLength="4"
                        className="w-full p-2 bg-amber-50 border border-amber-600/30 rounded font-mono text-amber-800 placeholder-amber-400 focus:outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleSubmitPayment(sub.id)}
                    className="w-full bg-green-700 text-amber-100 py-2 rounded-lg font-serif hover:bg-green-800 transition-all duration-300"
                  >
                    💳 Confirm Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-6 pt-4 border-t border-amber-600/20">
        <div className="flex justify-between items-center">
          <div className="font-mono text-sm text-amber-700">
            📋 Total: {subscriptions.length}
          </div>
          <div className="font-mono text-sm text-amber-700">
            ✅ Paid: {subscriptions.filter((s) => s.status === "paid").length}
          </div>
          <div className="font-mono text-sm text-amber-700">
            ⏳ Pending:{" "}
            {subscriptions.filter((s) => s.status !== "paid").length}
          </div>
        </div>

        {/* Total Amount */}
        <div className="mt-3 text-center p-2 bg-amber-100/30 rounded-lg border border-amber-600/20">
          <div className="font-mono text-xs text-amber-700">Total Monthly</div>
          <div className="font-serif text-xl font-bold text-amber-900">
            $
            {subscriptions.reduce((sum, sub) => sum + sub.amount, 0).toFixed(2)}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(205, 154, 75, 0.1);
          border-radius: 3px;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(205, 154, 75, 0.5);
          border-radius: 3px;
        }

        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(205, 154, 75, 0.7);
        }
      `}</style>
    </div>
  );
};

export default SubscriptionList;
