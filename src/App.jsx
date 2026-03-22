import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import JobsandPayments from "./pages/JobsandPayments";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Other pages */}
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/jobs" element={<JobsandPayments />} />
      </Routes>
    </Router>
  );
}

export default App;
