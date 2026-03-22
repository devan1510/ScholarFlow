import React, { useState } from "react";

const SendMail = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/send-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "user@example.com", // fixed email
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSent(true);
        setTimeout(() => setSent(false), 3000);
      } else {
        alert(data.message || "Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert(
        "Something went wrong. Please check if the backend server is running.",
      );
    }

    setLoading(false);
  };

  return (
    <div className="vintage-card rounded-lg p-6 max-w-md w-full">
      <div className="text-center mb-4">
        <div className="text-3xl mb-2">📧</div>
        <h3 className="font-serif text-xl font-bold text-amber-900">
          Financial Report
        </h3>
        <p className="font-serif text-amber-700/60 text-sm">
          Get your monthly summary via email
        </p>
      </div>

      <button
        onClick={handleClick}
        disabled={loading}
        className={`w-full py-3 rounded-lg font-serif font-semibold transition-all duration-300 ${
          sent
            ? "bg-green-700 text-amber-100"
            : "vintage-button hover:scale-105"
        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⏳</span> Sending...
          </span>
        ) : sent ? (
          <span className="flex items-center justify-center gap-2">
            ✅ Report Sent Successfully!
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            📨 Send Financial Report
          </span>
        )}
      </button>

      <p className="text-center font-mono text-xs text-amber-600/60 mt-3">
        Report will be sent to your registered email address
      </p>
    </div>
  );
};

export default SendMail;
