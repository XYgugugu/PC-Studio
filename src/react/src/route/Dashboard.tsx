import React, { useCallback, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./Dashboard.css";
import Components from "../pages/Components";
import Customize from "../pages/Customize";
import AdvSearch from "../pages/AdvSearch";
import PClist from "../pages/PClist";
import Manufacturer from "../pages/Manufacturer";



const Dashboard: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState("Customize");


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
      case "AdvSearch":
        return <AdvSearch/>;
      case "PClist":
        return <PClist/>;
      case "Manufacturer":
        return <Manufacturer/>;
      default:
        return <h1>Select a Section from the Sidebar</h1>;
    }
  }, [selectedSection]);

  return (
    <div>
      <Sidebar
        onSelect={setSelectedSection} 
      />
      <Topbar  />
      <div className="main-content">
        {renderContent()} {}
      </div>
    </div>
  );
};

export default Dashboard;
