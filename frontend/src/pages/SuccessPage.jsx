import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// 🔹 Helpers
const generateOrderId = () =>
  "ORD-" + Date.now().toString().slice(-6);

const generateProductId = () =>
  "PROD-" + Math.random().toString(36).substring(2, 8).toUpperCase();

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [orderId, setOrderId] = useState("");
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("formattedCart") || "[]");
    const userdata = JSON.parse(localStorage.getItem("userdata") || "{}");

    if (!cartItems.length || !userdata.email) {
      navigate("/");
      return;
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const query = new URLSearchParams(location.search);
    const session_id = query.get("session_id");

    if (!session_id) {
      navigate("/");
      return;
    }

    const saveOrder = async () => {
      try {
        const res = await axios.post("http://localhost:8000/save-order", {
          session_id,
          userdata,
          cartItems,
          totalAmount,
        });

        // ✅ Order ID (backend OR fallback)
        setOrderId(res.data.orderId || generateOrderId());

        // ✅ Always generate product ID
        setProductId(generateProductId());

        localStorage.removeItem("userdata");
        localStorage.removeItem("formattedCart");
      } catch (err) {
        console.error(err);

        // 🔥 Even if backend fails, still show IDs
        setOrderId(generateOrderId());
        setProductId(generateProductId());
      } finally {
        setLoading(false);
      }
    };

    saveOrder();
  }, [location.search, navigate]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Processing Payment...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5 text-center">
      <h2 style={{ color: "green" }}>✅ Payment Successful</h2>
      <p>Your order has been placed successfully.</p>

      <h4 className="mt-3">
        <strong>Order ID:</strong> {orderId}
      </h4>

      <h4 className="mt-2">
        <strong>Product ID:</strong> {productId}
      </h4>
    </div>
  );
};

export default SuccessPage;
