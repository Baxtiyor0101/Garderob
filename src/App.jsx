import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import IncomeExpense from "./pages/IncomeExpense";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-blue-50">
        {/* <Header/> */}
        <Navbar />
        <div className="max-w-[1400px] mx-auto mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/income-expense" element={<IncomeExpense />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;