import React, { useEffect, useState } from 'react';
import './Manufacturer.css';
import { config } from '../config';

interface TableRow {
  [key: string]: any; 
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || config.BACKEND_URL;

const Manufacturer: React.FC = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/api/data`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setTableData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="data-table-container">
      <h1>Manufacturer Product Ranking</h1>

      {loading ? (
        <p>Loading data...</p>
      ) : tableData.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {Object.keys(tableData[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Manufacturer;