import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import IncomeExpense from "./pages/IncomeExpense";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import InfoProduct from "./pages/InfoProduct/InfoProduct";
// import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        {/* <Header/> */}
        <Navbar />
        <div className="  mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/income-expense" element={<IncomeExpense />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/info/clothings" element={<InfoProduct />} />
            <Route path="/info/sizes" element={<h1>Size</h1>} />
            <Route path="/info/clothing-groups" element={<h1>Groups</h1>} />
            {/* Add more routes as needed */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;