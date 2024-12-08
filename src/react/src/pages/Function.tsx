import React from "react";
import "./Function.css"; // External CSS for styling

const Function: React.FC = () => {
  // Handle button click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;

    // Add scale animation
    button.style.transform = "scale(0.95)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 100);
  };

  return (
    <div className="main-content">
      <div className="button-container">
        <button className="button button-1" onClick={handleClick}>
          Function 1
        </button>
        <button className="button button-2" onClick={handleClick}>
          Function 2
        </button>
        <button className="button button-3" onClick={handleClick}>
          Function 3
        </button>
      </div>
    </div>
  );
};

export default Function;
