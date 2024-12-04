import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./route/Login";
import Dashboard from "./route/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
