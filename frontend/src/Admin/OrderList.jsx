import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-container">
      <h2 className="order-title">All Saved Orders</h2>

      {loading ? (
        <p className="message">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="message">No orders found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Total Amount</th>
                <th>Products</th>
                <th>Order ID</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>
                    {order.address}, {order.city}, {order.state} -{" "}
                    {order.pincode}
                  </td>
                  <td className="amount">₹{order.totalamount}</td>
                  <td>
                    <ul>
                      {order.Product.map((item, i) => (
                        <li key={i}>
                          {item.name} × {item.quantity} ({item.price})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="order-id">{order.OrderId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList;
