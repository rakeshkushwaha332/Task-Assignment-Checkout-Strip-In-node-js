import React from "react";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";
// import "./Cart.css"; // Optional: for custom styles

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalBill = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleBack = () => navigate("/");

  return (
    <div className="cart-container" style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      {/* Header */}
      <div className="cart-header" style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <span
          onClick={handleBack}
          className="back-btn"
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            color: "#131921",
            fontWeight: "500",
            marginRight: "20px",
          }}
        >
          <FaArrowLeft style={{ marginRight: "5px" }} /> Back
        </span>
        <h2 style={{ margin: 0 }}>Your Cart Items</h2>
      </div>

      {/* Empty Cart */}
      {cartItems.length === 0 ? (
        <h4 className="empty-cart" style={{ textAlign: "center", color: "#555" }}>
          🛒 Your Cart is empty!
        </h4>
      ) : (
        <>
          {/* Cart Table */}
          <div className="cart-table-wrapper" style={{ overflowX: "auto" }}>
            <table
              className="cart-table"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "30px",
              }}
            >
              <thead style={{ backgroundColor: "#f3f3f3" }}>
                <tr>
                  <th style={{ padding: "10px" }}>#</th>
                  <th style={{ padding: "10px" }}>Image</th>
                  <th style={{ padding: "10px" }}>Name</th>
                  <th style={{ padding: "10px" }}>Price</th>
                  <th style={{ padding: "10px" }}>Description</th>
                  <th style={{ padding: "10px" }}>Quantity</th>
                  <th style={{ padding: "10px" }}>Total</th>
                  <th style={{ padding: "10px" }}>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr
                    key={item._id}
                    style={{
                      borderBottom: "1px solid #ddd",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.image ? `http://localhost:8000${item.image}` : ""}
                        alt={item.name}
                        style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "5px" }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>₹{item.price.toLocaleString()}</td>
                    <td style={{ maxWidth: "200px", textAlign: "left", padding: "5px" }}>{item.description}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                        <FaPlus
                          style={{ cursor: "pointer", color: "#131921" }}
                          onClick={() => dispatch(increaseQuantity(item._id))}
                        />
                        <span style={{ minWidth: "25px", display: "inline-block", textAlign: "center" }}>
                          {item.quantity}
                        </span>
                        <TiMinus
                          style={{ cursor: "pointer", color: "#131921" }}
                          onClick={() => dispatch(decreaseQuantity(item._id))}
                        />
                      </div>
                    </td>
                    <td>₹{(item.price * item.quantity).toLocaleString()}</td>
                    <td>
                      <MdDelete
                        style={{ cursor: "pointer", color: "red", fontSize: "1.2rem" }}
                        onClick={() => dispatch(removeFromCart(item._id))}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div
            className="cart-summary"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px",
              backgroundColor: "#f7f7f7",
              borderRadius: "5px",
            }}
          >
            <h3>Total: ₹{totalBill.toLocaleString()}</h3>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#FF9900",
                border: "none",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "600",
              }}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
