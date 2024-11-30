import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
// import './Components.css';

interface ComponentData {
  [key: string]: any;
}
interface ComponentType {
    componentType: "CPU" | "GPU" | "CPU_Cooler" | "Motherboard" | "PowerSupply" | "RAM" | "Storage";
}
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';
const bounce_interval = 2000; // 2s window to boune

const Components: React.FC<ComponentType> = ({ componentType }) => {

    // rapid request handler
    const [debouncedComponentType, setDebouncedComponentType] = useState(componentType);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedComponentType(componentType);
        }, bounce_interval);
        return () => clearTimeout(handler);
    }, [componentType]);

    const [columns, setColumns] = useState<any[]>([]);
    const [data, setData] = useState<ComponentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data from the backend
    useEffect(() => {
        if (!debouncedComponentType) return;
        // reset
        let isMounted = true
        setLoading(true);
        setColumns([]);
        setData([]);
        setError(null);

        // delay 1s before displaying table
        const delay = setTimeout(() => {
            fetch(`${BACKEND_URL}/api/data/gallery?component=${componentType}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();
            })
            .then((res) => {
                if (isMounted && res.success) {
                    const fetched_data = res.data;
                    const fetched_columns = Object.keys(fetched_data[0]).map((key) => ({
                        Header: key.replace(/_/g, " "),
                        accessor: key,
                    }));
                    setColumns(fetched_columns);
                    setData(fetched_data);
                } else {
                    setError(res.message);
                }
            })
            .catch((err) => isMounted && setError(err.message))
            .finally(() => isMounted && setLoading(false));
        }, 1000);

        return () => {
            clearTimeout(delay);
            isMounted = false;
        };
    }, [componentType]); // add dependency for re-click

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <div>
            {
                loading ?
            (
                <p> Loading... </p>
            )
            :
            (
                <div>
                <h2>${componentType} Details</h2>
                <p>This is the ${componentType} page content.</p>
                <table {...getTableProps()} className="component-table">
                    <thead>
                    {headerGroups.map((headerGroup, index) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={`header-${index}`}>
                        {headerGroup.headers.map((col, colIndex) => (
                            <th {...col.getHeaderProps()} key={`col-${colIndex}`}>
                            {col.render("Header")}
                            </th>
                        ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row, rowIndex) => {
                        prepareRow(row);
                        return (
                        <tr {...row.getRowProps()} key={`row-${rowIndex}`}>
                            {row.cells.map((cell, cellIndex) => (
                            <td {...cell.getCellProps()} key={`cell-${cellIndex}`}>
                                {cell.render("Cell")}
                            </td>
                            ))}
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
                </div>
            )
            }
        </div>
    );
};

export default Components;