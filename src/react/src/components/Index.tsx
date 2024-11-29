import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import CPU from "../pages/CPU"; // Import the CPU component
import "./Index.css";

const Index: React.FC = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Customize"); // Default section

  const toggleSidebarActive = () => {
    setSidebarActive(!sidebarActive);
  };


  const renderContent = () => {
    switch (selectedSection) {
      case "Customize":
        return <h1>Welcome to the Customize Page!</h1>;
      case "CPU":
        return <CPU />; 
      case "CPU_Cooler":
        return <h1>Welcome to the CPU Cooler Page!</h1>;
      case "MotherBoard":
        return <h1>Welcome to the MotherBoard Page!</h1>;
      case "Storage":
        return <h1>Welcome to the Storage Page!</h1>;
      case "GPU":
        return <h1>Welcome to the GPU Page!</h1>;
      case "RAM":
        return <h1>Welcome to the RAM Page!</h1>;
      case "PowerSupply":
        return <h1>Welcome to the Power Supply Page!</h1>;
      default:
        return <h1>Select a Section from the Sidebar</h1>;
    }
  };

  return (
    <div>
      <Sidebar
        active={sidebarActive}
        toggleSidebar={toggleSidebarActive}
        onSelect={setSelectedSection} // Callback to update selected section
      />
      <Topbar active={sidebarActive} />
      <div className={`main-content ${sidebarActive ? "active" : ""}`}>
        {renderContent()} {/* Render the selected content */}
      </div>
    </div>
  );
};

export default Index;
