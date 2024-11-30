import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import './CPU.css';

interface ComponentData {
  [key: string]: any;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

const CPU: React.FC = () => {
    const [columns, setColumns] = useState<any[]>([]);
    const [data, setData] = useState<ComponentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data from the backend
    useEffect(() => {
        // delay 1s before displaying table
        const delay = setTimeout(() => {
            fetch(`${BACKEND_URL}/api/data/gallery?component=CPU`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();
            })
            .then((res) => {
                if (res.success) {
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
            .catch((err) => {
                console.error(`Error: ${err}`);
                setError(err.message);
            })
            .finally(() => setLoading(false));
        }, 1000);

        return () => clearTimeout(delay);
    }, []);

    // @TODO: make some user-friendly info instead of pure err msg
    if (error) {
        return <div>Error: {error}</div>;
    }

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
                <h2>CPU Details</h2>
                <p>This is the CPU page content.</p>
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

export default CPU;