import React, { useEffect, useState } from "react";
import "./AdvSearch.css"; 
import { config } from "../config";

interface AdvSearchResult {
  result_id: number;
  components: { component: string; name: string }[];
}


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || config.BACKEND_URL;

const AdvSearch: React.FC = () => {
  const [searchData, setSearchData] = useState({
    CPU: "",
    GPU: "",
    budget: "",
  });
  const [userId, setUserId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [Results, setResults] = useState<AdvSearchResult[]>([]);

  useEffect(() => {
    const storedId = sessionStorage.getItem("user_id");
    if (storedId) {
      setUserId(storedId);
    } else {
      setUserId("");
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSearchData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const transformData = (data: any[]): AdvSearchResult[] => {
    return data.map((pc, index) => ({
      result_id: index,
      components: [
        { component: "CPU", name: pc.CPU_Name },
        { component: "GPU", name: pc.GPU_Name },
        { component: "Cpu Cooler", name: pc.Cooler_Name },
        { component: "Motherboard", name: pc.Motherboard_Name },
        { component: "Storage", name: pc.Storage_Name },
        { component: "Memory", name: pc.Memory_Name },
        { component: "PowerSupply", name: pc.Powersupply_Name },
        // { component: "TotalPrice", name: pc.TotalPrice },
        { component: "TotalPrice", name: `$${pc.TotalPrice}` },
      ],
    }));
  };
  

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    setError(null);
    setNoResults(false);
    const button = e.currentTarget;
    button.style.transform = "scale(0.95)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 100);
    const url = `${BACKEND_URL}/api/user/recommend?budget=${searchData.budget}&cpu_keyword=${searchData.CPU}&gpu_keyword=${searchData.GPU}&userId=${userId}`;
    console.log(url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = await response.json();
      if (res.success) {
        const fetched_data = res.data[0];
        if (fetched_data.length === 0) {
          setNoResults(true);
        } 
        const results = transformData(fetched_data);
        setResults(results);
        console.log(results);
      } else {
        setError(res.message);
      }
    }
    catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="advsearch-container">
      <div className="search-group">
        <input
          type="text"
          id="CPU"
          className="search-input"
          placeholder="Enter CPU..."
          value={searchData.CPU}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="GPU"
          className="search-input"
          placeholder="Enter GPU..."
          value={searchData.GPU}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="budget"
          className="search-input"
          placeholder="Enter Budget..."
          value={searchData.budget}
          onChange={handleInputChange}
        />
        <div className="button-container">
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
      </div>
      {loading ? (
        <p>Loading Results...</p>
      ) : error ? ( 
        <p>{error}</p> 
      ) : noResults ? (
        <p>No Results Available</p>
        ) : (
          Results.map((result) => (
            <div key={result.result_id} className="result-container">
              <h3>Result {result.result_id + 1}</h3>
              <table className="result-table">
                <tbody>
                  {result.components.map((component, index) => (
                    <tr key={index}>
                      <td>{component.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        
      
      )}
      
    </div>
    
  );
};

export default AdvSearch;
