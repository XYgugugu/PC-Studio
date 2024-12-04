import React, { useState } from "react";
import XJFT from "../img/XJFT.png";
import "./Customize.css"; // Import the CSS file

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
    <div className="main-content">
      <div className="logo">
        <img
          src={XJFT}
          alt="Logo_XJFT"
        />
      </div>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="drawer">
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

          <div className="drawer">
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
              <option value="400">400</option>
            </select>
          </div>

          <div className="drawer">
            <label htmlFor="performance">Performance:</label>
            <select
              name="performance"
              id="performance"
              value={formData.performance}
              onChange={handleInputChange}
            >
              <option value="3060">3060</option>
              <option value="3070">3070</option>
              <option value="3080">3080</option>
              <option value="3090">3090</option>
            </select>
          </div>

          <div className="drawer">
            <label htmlFor="type">Type:</label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="1">Type 1</option>
              <option value="2">Type 2</option>
              <option value="3">Type 3</option>
              <option value="4">Type 4</option>
            </select>
          </div>

          <div className="button-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomizeForm;