import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Index from "./components/Index";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/index" element={<Index />} />
      </Routes>
    </Router>
    // <div>
    //   <Login />
    // </div>
  );
};

export default App;
