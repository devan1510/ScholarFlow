import React from "react";
import Navbar from "../components/Navbar";
import TransactionsList from "../components/TransactionsList";
import ReceiptScanner from "../components/ScanReceipt";
import "../styles/Navbar.css";

const Transactions = () => {
  return (
    <div className="min-h-screen bg-aged-paper">
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transactions List - Takes 2/3 on large screens */}
          <div className="lg:col-span-2">
            <TransactionsList />
          </div>

          {/* Receipt Scanner - Takes 1/3 on large screens */}
          <div className="lg:col-span-1">
            <ReceiptScanner />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transactions;
