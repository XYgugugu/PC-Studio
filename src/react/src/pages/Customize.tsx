import React, { useState } from "react";
import XJFT from "../img/XJFT.png";
import "./Customize.css"; 
import "../route/Login";
import { config } from "../config";

const CustomizeForm: React.FC = () => {
  const components = [
    "CPU",
    "GPU",
    "CPU_Cooler",
    "Motherboard",
    "PowerSupply",
    "RAM",
    "Storage",
  ];

  const [formData, setFormData] = useState("");
  const [apiResult, setApiResult] = useState<null | any[]>(null);
  const [selectedComponents, setSelectedComponents] = useState<
    { component: string; name: string; price: number }[]
  >([]);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [finalConfig, setFinalConfig] = useState<
    { component: string; name: string; price: number }[] | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentComponent = components[currentComponentIndex];
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || config.BACKEND_URL;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      console.log(`Sending ${currentComponent} data to backend:`, formData);

      const response = await fetch(
        `${BACKEND_URL}/api/user/search?componentType=${currentComponent}&keyword=${formData}&fullFeatureMode=1`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(`API result for ${currentComponent}:`, result);

      if (result.success && Array.isArray(result.data) && Array.isArray(result.data[0])) {
        setApiResult(result.data[0]);
      } else {
        console.error("Unexpected API result format:", result);
        alert("Unexpected response format. Please contact support.");
      }
    } catch (error) {
      console.error(`Error submitting ${currentComponent}:`, error);
      alert("An error occurred while submitting the data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (name: string, price: number) => {
    setSelectedComponents((prev) => {
      const updatedComponents = [...prev, { component: currentComponent, name, price }];
      if (currentComponentIndex === components.length - 1) {
        setFinalConfig(updatedComponents); 
      }
      return updatedComponents;
    });
    setApiResult(null);
    setFormData("");

    if (currentComponentIndex < components.length - 1) {
      setCurrentComponentIndex((prev) => prev + 1);
    }
  };

  
  const handleUpload = async () => {
    setLoading(true);
    try {
      console.log("Uploading and checking updated prices for selected components...");
      const updatedComponents = await Promise.all(
        selectedComponents.map(async (component) => {
          const response = await fetch(
            `${BACKEND_URL}/api/user/search?componentType=${component.component}&keyword=${component.name}&fullFeatureMode=1`
          );
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const result = await response.json();
          if (result.success && Array.isArray(result.data) && Array.isArray(result.data[0])) {
            const matchedItem = result.data[0].find(
              (item: any) =>
                item[`${component.component}_Name`] === component.name ||
                item["Memory_Name"] === component.name ||
                item["Cooler_Name"] === component.name
            );
  
            if (matchedItem) {
              const newPrice = matchedItem.Price;
              console.log(`Updated price for ${component.name}:`, newPrice);
              return {
                ...component,
                price: newPrice,
              };
            }
          }
  
          return component; 
        })
      );
  
      setFinalConfig(updatedComponents);
      console.log("Updated configuration:", updatedComponents);
    } catch (error) {
      console.error("Error uploading and updating prices:", error);
      alert("An error occurred while updating the prices.");
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = () => {
    setApiResult(null);
    setSelectedComponents([]);
    setCurrentComponentIndex(0);
    setFormData("");
    setFinalConfig(null);
    setErrorMessage(null);
  };


  const handleConfirmOrder = async () => {
    setLoading(true);
    try {

      if (!finalConfig || finalConfig.length !== 7) {
        setErrorMessage("Configuration incomplete. Please select all components.");
        console.error("Configuration incomplete. Missing components.");
        return;
      }
  
      const userId = sessionStorage.getItem("user_id");
      if (!userId) {
        setErrorMessage("User ID not found. Please log in again.");
        console.error("User ID not found in sessionStorage.");
        return;
      }
  
      const baseUrl =
        `${BACKEND_URL}/api/user/pc/update`;
  
      const componentParams = finalConfig
        .map(
          (component) =>
            `${component.component}=${encodeURIComponent(component.name)}`
        )
        .join("&");
  
      const priceParams = finalConfig
        .map(
          (component) =>
            `${component.component}_Price=${component.price.toFixed(2)}`
        )
        .join("&");
  
      const fullUrl = `${baseUrl}?${componentParams}&${priceParams}&userId=${userId}`;
      console.log("Generated URL:", fullUrl);
  
      const response = await fetch(fullUrl, { method: "PUT" });
  
      const result = await response.json();
  
      if (!result.success) {
        setErrorMessage(result.message.sqlMessage + " Please try again.");
      } else {
        alert("Order confirmed successfully!");
        handleReturn();
      }
    } catch (error) {
      console.error("Error confirming order:", error);
    } finally {
      setLoading(false);
    }
  };


  const calculateTotalPrice = () => {
    if (!finalConfig) return 0;
    return finalConfig.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="main-content">
      <div className="logo">
        <img src={XJFT} alt="Logo_XJFT" />
      </div>

      <div className="container">
        {finalConfig ? (
          <div>
            <h2>Final Configuration</h2>
            <table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {finalConfig.map((item, index) => (
                  <tr key={index}>
                    <td>{item.component}</td>
                    <td>{item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} style={{ fontWeight: 'bold' }}>Total</td>
                  <td style={{ fontWeight: 'bold' }}>${calculateTotalPrice().toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <div className="button-container">
              <button onClick={handleUpload} disabled={loading}>
                {loading ? "Updating new Prices..." : "Refresh Price"}
              </button>
              <button onClick={handleConfirmOrder}>Confirm Order</button>
            </div>
            {errorMessage && (
              <div className="error-message">
                <p>{errorMessage}</p>
                <button onClick={handleReturn}>Return to Start</button>
              </div>
            )}
          </div>
        ) : apiResult ? (
          apiResult.length > 0 ? (
          <div>
            <h2>Select {currentComponent}</h2>
            <div className="table-container">
            <table>
              <thead>
              <tr>
                <th>
                  {currentComponent === "RAM"
                    ? "Memory Name"
                    : currentComponent === "CPU_Cooler"
                    ? "Cooler Name"
                    : `${currentComponent} Name`}
                </th>
                <th>Manufacturer</th>
                <th>Price</th>
                <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {apiResult.map((item: any, index: number) => (
                  <tr key={index}>
                     <td>
                          {currentComponent === "RAM"
                            ? item["Memory_Name"]
                             : currentComponent === "CPU_Cooler"
                             ? item["Cooler_Name"]
                             : item[`${currentComponent}_Name`]}
                      </td>
                    <td>{item.Manufacturer}</td>
                    <td>${item.Price}</td>
                    <td>
                      <button onClick={() => handleSelectOption(
                                  currentComponent === "RAM"
                                  ? item["Memory_Name"]
                                  : currentComponent === "CPU_Cooler"
                                  ? item["Cooler_Name"]
                                  : item[`${currentComponent}_Name`], item.Price)}
                      > Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
          ) : (
            <div>
              <h2>No results found for {currentComponent}</h2>
              <p>Please modify your search and try again.</p>
              <form onSubmit={handleSubmit}>
                <div className="drawer">
                  <label htmlFor={currentComponent}>{currentComponent}:</label>
                  <input
                    type="text"
                    name={currentComponent}
                    id={currentComponent}
                    value={formData}
                    onChange={handleInputChange}
                    placeholder={`Enter ${currentComponent} info`}
                  />
                </div>
  
                <div className="button-container">
                  <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Search Again"}
                  </button>
                </div>
              </form>
            </div>
          )
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="drawer">
              <label htmlFor={currentComponent}>{currentComponent}:</label>
              <input
                type="text"
                name={currentComponent}
                id={currentComponent}
                value={formData}
                onChange={handleInputChange}
                placeholder={`Enter ${currentComponent} info`}
              />
            </div>

            <div className="button-container">
              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomizeForm;
