// Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import HomePage from "../components/HomePage";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <HomePage />
      </main>
    </div>
  );
};

export default Home;
