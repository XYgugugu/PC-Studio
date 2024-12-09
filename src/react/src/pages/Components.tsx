import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import './Components.css';
import "boxicons/css/boxicons.min.css";
import { config } from "../config";

interface ComponentData {
  [key: string]: any;
}
interface ComponentType {
    componentType: "CPU" | "GPU" | "CPU_Cooler" | "Motherboard" | "PowerSupply" | "RAM" | "Storage";
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || config.BACKEND_URL;
const bounce_interval = 2000; // 2s debounce window

const Components: React.FC<ComponentType> = ({ componentType }) => {
  const [debouncedComponentType, setDebouncedComponentType] = useState(componentType);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [columns, setColumns] = useState<any[]>([]);
  const [data, setData] = useState<ComponentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set()); 
  const [noResults, setNoResults] = useState<boolean>(false);
  const [userAdmin, setUserAdmin] = useState(0);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedAdmin = sessionStorage.getItem("user_admin");
    if (storedAdmin) {
        setUserAdmin(parseInt(storedAdmin));
    } else {
        setUserAdmin(0);
    }
  }, []);

  useEffect(() => {
    const storedId = sessionStorage.getItem("user_id");
    if (storedId) {
      setUserId(storedId);
    } else {
      setUserId("");
    }
  }, []);
  
  useEffect(() => {
    setSearchTerm("");
    setLoading(true);
    setExpandedRows(new Set());
    const handler = setTimeout(() => {
      setDebouncedComponentType(componentType);
    }, bounce_interval);
    return () => clearTimeout(handler);
  }, [componentType]);

  const fetchDataFromGallery = async () => {
    setLoading(true);
    setColumns([]);
    setData([]);
    setError(null);
    setNoResults(false);

    try {
      const response = await fetch(`${BACKEND_URL}/api/data/gallery?component=${componentType}`);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const res = await response.json();
  
      if (res.success) {
        // const fetched_data = res.data;
        const fetched_data = res.data.map((item: ComponentData) => ({
          ...item,
          Price: `$${item.Price}`, 
        }));
        const fetched_columns = Object.keys(fetched_data[0]).map((key, index, array) => ({
          Header: key.replace(/_/g, " "),
          accessor: key,
          show: index === 0 || index === array.length - 1, 
        }));
        setColumns(fetched_columns);
        setData(fetched_data);
      } else {
        setError(res.message);
      }
    } catch (err) {
      if (err instanceof Error) { setError(err.message); }
    } finally {
      setLoading(false);
    }
  };

  const fetchDataFromSearch = async () => {
    setLoading(true);
    setColumns([]);
    setData([]);
    setError(null);
    setNoResults(false);

    try {
      const response = await fetch(`${BACKEND_URL}/api/user/search?componentType=${componentType}&keyword=${searchQuery}&fullFeatureMode=1`);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const res = await response.json();

      if (res.success) {
        // const fetched_data = res.data[0];
        const fetched_data = res.data[0].map((item: ComponentData) => ({
          ...item,
          Price: `$${item.Price}`, 
        }));
        if (fetched_data.length === 0) {
          setNoResults(true);
        } 
        else {
          const fetched_columns = Object.keys(fetched_data[0]).map((key, index, array) => ({
            Header: key.replace(/_/g, " "),
            accessor: key,
            show: index === 0 || index === array.length - 1, 
          }));
          setColumns(fetched_columns);
          setData(fetched_data);
        }
      } else {
        setError(res.message);
      }
    } catch (err) {
      if (err instanceof Error) {setError(err.message);}
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!debouncedComponentType) return;
    setColumns([]); 
    setData([]); 
    if (searchQuery) {
      fetchDataFromSearch();
    } else {
      fetchDataFromGallery();
    }
  }, [debouncedComponentType, searchQuery]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, allColumns } = useTable({ columns, data });

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchQuery(searchTerm);
  };

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => {
      const updatedRows = new Set(prev);
      if (updatedRows.has(index)) {
        updatedRows.delete(index);
      } else {
        updatedRows.add(index);
        allColumns.forEach(column => column.toggleHidden(false));
      }
      return updatedRows;
    });
  };

  const ModifyPrice = (itemName: string, currentPrice: number) => {
    if (userAdmin !== 1) {
      alert("No authorization!");
      return;
    }
    const newPrice = prompt("Enter new price:", currentPrice.toString());
    if (newPrice === null || newPrice === "") return;
    const url = `${BACKEND_URL}/api/admin/price/?componentType=${componentType}&itemName=${encodeURIComponent(itemName)}&price=${newPrice}&userId=${userId}`;
    console.log(url);
    fetch(url, { 
      method: 'PUT',
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return res.json();
      } else {
        throw new Error("Unexpected response format");
      }
    })
    .then(data => {
      if (data.success) {
        alert("Price updated successfully.");
        fetchDataFromGallery();
      } else {
        alert(`Error updating price: ${data.message}`);
      }
    })
    .catch(error => {
      alert(`Error updating price: ${error.message}`);
    });
  };

  return (
    <div className="component-content">
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <>
          <div className="search-bar-container">
            <i className='bx bx-search'></i>
            <span className="choose-text"> Choose a {debouncedComponentType}</span>
            <form onSubmit={handleSearch} className="search-bar">
              <input
                type="text"
                placeholder="..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          {error ? (
            <p>{error}</p>
          ) : noResults ? (
            <p>No related components found</p>
          ) : 
            <div>
              <table {...getTableProps()} className="component-table">
                <thead>
                  {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={`header-${index}`}>
                      {headerGroup.headers.map((col, colIndex) => (
                        (col as any).show && (
                          <th {...col.getHeaderProps()} key={`col-${colIndex}`} style={{ width: '150px' }}>
                            {col.render("Header")}
                          </th>
                        )
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, rowIndex) => {
                    prepareRow(row);
                    return (
                      <React.Fragment key={`row-${rowIndex}`}>
                        <tr
                          {...row.getRowProps()}
                          onClick={() => toggleRow(rowIndex)}
                          style={{ cursor: "pointer" }}
                        >
                          {row.cells.map((cell, cellIndex) => (
                            (cell.column as any).show && (
                              <td {...cell.getCellProps()} key={`cell-${cellIndex}`} style={{ width: '150px' }}>
                                {cell.render("Cell")}
                              </td>
                            )
                          ))}
                        </tr>
                        {expandedRows.has(rowIndex) && (
                          <tr className="expanded-row" key={`expanded-${rowIndex}`}>
                            <td colSpan={columns.length} style={{ backgroundColor: "#f8f9fa", padding: "10px" }}>
                              <div
                                style={{
                                  maxWidth: "100%",
                                  wordWrap: "break-word", 
                                  whiteSpace: "normal",
                                  overflow: "hidden",
                                }}
                              >
                                {Object.entries(row.original).map(([key, value]) => (
                                  <div key={key}>
                                    {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
                                    {key.toLowerCase() === 'price' && (
                                      <button onClick={() => ModifyPrice(row.original[`${debouncedComponentType}_Name`], value)}>
                                        Modify
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          }
        </>
      )}
    </div>
  );
};

export default Components;