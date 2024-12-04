import React, { useCallback, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./Dashboard.css";
import Components from "../pages/Components";
import Customize from "../pages/Customize";

const Dashboard: React.FC = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Customize"); // Default section

  const toggleSidebarActive = () => {
    setSidebarActive(!sidebarActive);
  };

  // enable cache
  const renderContent = useCallback(() => {
    switch (selectedSection) {
      case "Customize":
        return <Customize/>;
      case "CPU":
        return <Components componentType={"CPU"} />; 
      case "CPU_Cooler":
        return <Components componentType={"CPU_Cooler"} />; 
      case "Motherboard":
        return <Components componentType={"Motherboard"} />; 
      case "Storage":
        return <Components componentType={"Storage"} />; 
      case "GPU":
        return <Components componentType={"GPU"} />; 
      case "RAM":
        return <Components componentType={"RAM"} />; 
      case "PowerSupply":
        return <Components componentType={"PowerSupply"} />; 
      default:
        return <h1>Select a Section from the Sidebar</h1>;
    }
  }, [selectedSection]);

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

export default Dashboard;
