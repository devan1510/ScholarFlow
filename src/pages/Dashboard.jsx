import React from "react";
import Navbar from "../components/Navbar";
import ExpenditureProgress from "../components/ExpenditureProgress.jsx";
import SavingsProgress from "../components/SavingsProgress.jsx";
import PieChart from "../components/Piechart.jsx";
import TimeseriesGraph from "../components/TimeseriesGraph.jsx";
import SendMail from "../components/SendEmail.jsx";
import "../styles/Navbar.css";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-aged-paper">
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Section - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ExpenditureProgress />
          <SavingsProgress />
        </div>

        {/* Pie Charts Section - Full Width */}
        <div className="mb-8">
          <PieChart />
        </div>

        {/* Time Series Graph Section - Full Width */}
        <div className="mb-8">
          <TimeseriesGraph />
        </div>

        {/* Email Section */}
        <div className="flex justify-center">
          <SendMail />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
