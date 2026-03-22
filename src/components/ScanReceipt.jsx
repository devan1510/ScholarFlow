import React, { useState } from "react";
import receipts from "../data/Receipt";

const ReceiptScanner = () => {
  const [image, setImage] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [category, setCategory] = useState("Grocery");
  const [scanning, setScanning] = useState(false);
  const [scannedReceipt, setScannedReceipt] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setScanning(true);
    setScannedReceipt(null);
    setScanProgress(0);

    // Simulate LLM scanning with progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Use real receipt data after "scanning"
          setScannedReceipt(receipts[0]);
          setScanning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleAddTransaction = () => {
    if (!scannedReceipt) return;

    const newTransaction = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      type: "expense",
      category,
      amount: scannedReceipt.receipt_details.total,
      store: scannedReceipt.receipt_details.store_name,
      items: scannedReceipt.receipt_details.items.length,
    };

    setTransactions((prev) => [...prev, newTransaction]);
    setImage(null);
    setScannedReceipt(null);
    setScanProgress(0);
  };

  return (
    <div className="vintage-card rounded-lg p-6 sticky top-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">📸</div>
        <h2 className="font-serif text-2xl font-bold text-amber-900">
          Receipt Scanner
        </h2>
        <p className="font-serif text-amber-700/60 text-sm mt-1">
          AI-powered receipt analysis
        </p>
        <div className="w-12 h-px bg-amber-600/30 mx-auto mt-3"></div>
      </div>

      {/* Upload Area */}
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          id="receipt-upload"
        />
        <label
          htmlFor="receipt-upload"
          className="block w-full p-8 text-center border-2 border-dashed border-amber-600/30 rounded-lg hover:border-amber-600/60 transition-all duration-300 cursor-pointer bg-amber-50/30"
        >
          <div className="text-3xl mb-2">📷</div>
          <p className="font-serif text-amber-700">
            Click or tap to upload receipt
          </p>
          <p className="font-mono text-xs text-amber-600/60 mt-2">
            PNG, JPG up to 10MB
          </p>
        </label>
      </div>

      {/* Image Preview */}
      {image && (
        <div className="mt-4 p-3 bg-amber-50/50 rounded-lg border border-amber-600/20">
          <img
            src={image}
            alt="receipt"
            className="w-full h-auto rounded-lg shadow-sm"
          />
        </div>
      )}

      {/* Scanning Animation */}
      {scanning && (
        <div className="mt-4 p-4 bg-amber-100/50 rounded-lg border border-amber-600/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="animate-spin text-xl">🤖</div>
            <div className="flex-1">
              <p className="font-serif text-amber-800 text-sm">
                LLM analyzing receipt...
              </p>
              <div className="w-full bg-amber-200 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="bg-amber-700 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="font-mono text-xs text-amber-600/70 text-center">
            {scanProgress < 30 && "🔍 Locating text..."}
            {scanProgress >= 30 &&
              scanProgress < 60 &&
              "📝 Extracting items..."}
            {scanProgress >= 60 &&
              scanProgress < 90 &&
              "💰 Calculating totals..."}
            {scanProgress >= 90 && "✅ Processing complete!"}
          </div>
        </div>
      )}

      {/* Scanned Receipt Details */}
      {scannedReceipt && !scanning && (
        <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-600/30 shadow-inner">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-600/20">
            <h3 className="font-serif font-bold text-amber-900 text-lg">
              🏪 {scannedReceipt.receipt_details.store_name}
            </h3>
            <div className="font-mono text-xs text-amber-600 bg-amber-200/50 px-2 py-1 rounded">
              AI SCANNED
            </div>
          </div>

          <p className="font-mono text-xs text-amber-700 mb-2">
            📍 {scannedReceipt.receipt_details.location}
          </p>
          <p className="font-mono text-xs text-amber-700 mb-3">
            📅 {new Date().toLocaleDateString()} at{" "}
            {new Date().toLocaleTimeString()}
          </p>

          <div className="space-y-2 mb-3">
            {scannedReceipt.receipt_details.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm border-b border-amber-600/10 pb-1"
              >
                <span className="font-serif text-amber-800">
                  {item.description}
                </span>
                <span className="font-mono text-amber-700">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 border-t-2 border-amber-600/30 mt-2">
            <strong className="font-serif text-amber-900">Total:</strong>
            <strong className="font-serif text-xl text-amber-900">
              ${scannedReceipt.receipt_details.total.toFixed(2)}
            </strong>
          </div>

          {/* Category Selection */}
          <div className="mt-4 pt-3 border-t border-amber-600/20">
            <label className="font-serif text-amber-800 text-sm block mb-2">
              Transaction Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 bg-amber-100 border border-amber-600/30 rounded font-serif text-amber-800 focus:outline-none focus:border-amber-600"
            >
              <option value="Grocery">🛒 Grocery</option>
              <option value="Bills">📄 Bills</option>
              <option value="Rent">🏠 Rent</option>
              <option value="Food">🍔 Food</option>
              <option value="Transport">🚗 Transport</option>
              <option value="Entertainment">🎮 Entertainment</option>
              <option value="Education">📚 Education</option>
              <option value="Other">📦 Other</option>
            </select>
          </div>

          <button
            onClick={handleAddTransaction}
            className="w-full mt-4 vintage-button py-2 px-4"
          >
            ➕ Add to Ledger
          </button>
        </div>
      )}

      {/* Recent Transactions from Scanner */}
      {transactions.length > 0 && (
        <div className="mt-6 pt-4 border-t border-amber-600/20">
          <h3 className="font-serif font-semibold text-amber-900 mb-3 flex items-center gap-2">
            <span>📋</span> Recently Added
          </h3>
          <div className="space-y-2">
            {transactions
              .slice(-3)
              .reverse()
              .map((tx) => (
                <div
                  key={tx.id}
                  className="bg-amber-50/50 p-2 rounded border border-amber-600/20"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-serif text-sm text-amber-800">
                        🏪 {tx.store}
                      </p>
                      <p className="font-mono text-xs text-amber-600">
                        {tx.date} • {tx.category}
                      </p>
                    </div>
                    <p className="font-serif font-bold text-red-700">
                      -${tx.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptScanner;
