import React from "react";
import Navbar from "../components/Navbar";
import JobList from "../components/JobsList";
import SubscriptionsList from "../components/SubscriptionsList";
import "../styles/Navbar.css";

const JobsandPayments = () => {
  return (
    <div className="min-h-screen bg-aged-paper">
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Jobs Section */}
          <div>
            <JobList />
          </div>

          {/* Subscriptions Section */}
          <div>
            <SubscriptionsList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobsandPayments;
