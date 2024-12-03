import React, { useState } from "react";
import XJFT from "../img/XJFT.png";

const CustomizeForm: React.FC = () => {
  const [formData, setFormData] = useState({
    size: "10",
    prize: "100",
    performance: "3060",
    type: "1",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
    // Handle the form submission logic, such as sending data to the backend
  };

  return (
    <div
        style={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#fff",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "0", // Ensures no offset from the sidebar
        }}
    >
      <div className="logo" style={{ marginBottom: "20px" }}>
        <img
          src={XJFT}
          alt="Logo_XJFT"
          style={{ maxWidth: "200px", height: "auto" }}
        />
      </div>

      <div className="container" style={{ width: "100%" }}>
        <form onSubmit={handleSubmit}>
          <div className="drawer" style={{ marginBottom: "10px" }}>
            <label htmlFor="size">Size:</label>
            <select
              name="size"
              id="size"
              value={formData.size}
              onChange={handleInputChange}
            >
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="15">15</option>
              <option value="16">16</option>
            </select>
          </div>

          <div className="drawer" style={{ marginBottom: "10px" }}>
            <label htmlFor="prize">Prize:</label>
            <select
              name="prize"
              id="prize"
              value={formData.prize}
              onChange={handleInputChange}
            >
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
            </select>
          </div>

          <div className="drawer" style={{ marginBottom: "10px" }}>
            <label htmlFor="performance">Performance:</label>
            <select
              name="performance"
              id="performance"
              value={formData.performance}
              onChange={handleInputChange}
            >
              <option value="3060">3060</option>
              <option value="4090">4090</option>
            </select>
          </div>

          <div className="drawer" style={{ marginBottom: "10px" }}>
            <label htmlFor="type">Type:</label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div className="button-container" style={{ marginTop: "20px" }}>
            <button type="submit" style={{ padding: "10px 30px" }}>
              Customize
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomizeForm;
