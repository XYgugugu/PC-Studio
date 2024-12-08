import React, { useEffect, useState } from "react";
import "./PClist.css"; 
import { config } from "../config";

interface PCOrder {
  id: number;
  components: { component: string; name: string }[];
  totalPrice: number; 
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || config.BACKEND_URL; 

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<PCOrder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // const userId = sessionStorage.getItem('user_id');
        const userId = sessionStorage.getItem('user_id');
        if (!userId) {
          console.error("User ID not found in sessionStorage.");
          return;
        }

        const response = await fetch(`${BACKEND_URL}/api/user/pcs?userId=${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        
        const transformedOrders = transformData(result.data);
        setOrders(transformedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId: number) => {
    setLoading(true);
    try {
        const userId = sessionStorage.getItem('user_id');
        if (!userId) {
            console.error("User ID not found in sessionStorage.");
            return;
        }
        const response = await fetch(`${BACKEND_URL}/api/user/pcs?userId=${userId}&pcIds=${orderId}`, {
        method: 'DELETE'});
  
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('An error occurred while deleting the order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const transformData = (data: any[]): PCOrder[] => {
    return data.map((pc) => ({
      id: pc.PC_ID,
      totalPrice: Number(pc.Estimated_Cost), 
      components: [
        { component: "CPU", name: pc.CPU_Name },
        { component: "GPU", name: pc.GPU_Name },
        { component: "Cooler", name: pc.Cooler_Name },
        { component: "Motherboard", name: pc.Motherboard_Name },
        { component: "Storage", name: pc.Storage_Name },
        { component: "Memory", name: pc.Memory_Name },
        { component: "PowerSupply", name: pc.PowerSupply_Name },
      ],
    }));
  };

  return (
    <div className="orders-page">
      <h2>PC Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-container">
            <h2>PC_Build</h2>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {order.components.map((component, index) => (
                  <tr key={index}>
                    <td>{component.component}</td>
                    <td>{component.name}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} style={{ fontWeight: 'bold', textAlign: 'right' }}>
                    Total: ${order.totalPrice}
                  </td>
                </tr>
              </tbody>
            </table>
            <button 
              className="delete-button" 
              onClick={() => handleDeleteOrder(order.id)} 
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
